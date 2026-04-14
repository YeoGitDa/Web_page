from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import os
import logging

from dotenv import load_dotenv
from openai import OpenAI, RateLimitError, APITimeoutError, APIConnectionError, APIError

from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# api 디렉토리에서 .env 사용
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

api_key = os.getenv("OPENAI_API_KEY")
mongo_uri = os.getenv("MONGO_URI")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY가 설정되어 있지 않습니다.")
if not mongo_uri:
    raise RuntimeError("MONGO_URI가 설정되어 있지 않습니다.")

client = OpenAI(api_key=api_key)

DB_NAME = "yeobaek_db"
COLLECTION_NAME = "yeobaek_docs"
EMBED_MODEL = "text-embedding-3-small"
INDEX_NAME = "vector_index"  # Atlas UI에서 생성해야 하는 인덱스 이름

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

def get_collection():
    mongo_client = MongoClient(mongo_uri)
    db = mongo_client[DB_NAME]
    return db[COLLECTION_NAME]

def make_context(docs):
    blocks = []
    for doc in docs:
        source = doc.get("source", "unknown")
        idx = doc.get("chunk_index", 0)
        text = doc.get("text", "").strip()
        blocks.append(f"[출처: {source} | chunk #{idx}]\n{text}")
    return "\n\n---\n\n".join(blocks)

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(input=text, model=EMBED_MODEL)
    return response.data[0].embedding

@app.post("/api/rag-chat")
def rag_chat(req: ChatRequest):
    query = req.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="메시지가 비어 있습니다.")

    docs = []
    try:
        query_embedding = get_embedding(query)
        collection = get_collection()
        
        # MongoDB Atlas Vector Search Pipeline
        pipeline = [
            {
                "$vectorSearch": {
                    "index": INDEX_NAME,
                    "path": "embedding",
                    "queryVector": query_embedding,
                    "numCandidates": 50,
                    "limit": 4
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "text": 1,
                    "source": 1,
                    "chunk_index": 1,
                    "score": { "$meta": "vectorSearchScore" }
                }
            }
        ]
        
        docs = list(collection.aggregate(pipeline))
        
    except Exception as e:
        logger.error(f"MongoDB Vector Search 실패: {e}")
        docs = []

    system_prompt = (
        "너는 인천대학교 문헌정보학과 동아리 '여백(Yeobaek)'의 "
        "전문 도서관·정보학(LIS) 어시스턴트야.\n"
        "- 주요 도메인: 문헌정보학, 정보검색(IR), 메타데이터/목록, 분류(KDC/DDC), "
        "디지털 아카이빙, 추천 시스템, 시소러스/온톨로지, 동아리 운영.\n"
        "- 아래 제공된 '여백 프로젝트 문서' 내용을 우선적으로 참고해서 답변해.\n"
        "- 문서에 없는 내용은 아는 척하지 말고, 확실히 모른다고 말해.\n"
        "- 답변은 한국어, 3~6문장 정도로 간결하게."
    )

    if docs:
        user_content = (
            "다음은 여백 프로젝트 관련 문서 일부입니다:\n\n"
            f"{make_context(docs)}\n\n"
            f"위 내용을 참고해서 답변해주세요.\n\n질문: {query}"
        )
    else:
        user_content = query

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content},
            ],
            timeout=30.0,
        )
        return {"reply": completion.choices[0].message.content}

    except RateLimitError:
        raise HTTPException(status_code=429, detail="요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.")
    except APITimeoutError:
        raise HTTPException(status_code=504, detail="요청 시간이 초과되었습니다.")
    except APIConnectionError:
        raise HTTPException(status_code=503, detail="AI 서비스에 연결할 수 없습니다.")
    except APIError as e:
        logger.error(f"OpenAI API 에러: {e}")
        raise HTTPException(status_code=502, detail="AI 서비스에서 오류가 발생했습니다.")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
