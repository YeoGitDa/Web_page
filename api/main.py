from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import os
import logging
from dotenv import load_dotenv
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# api 디렉토리에서 .env 사용 (로컬 실행용 — Cloud Run 은 서비스 환경변수)
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

try:  # uvicorn api.main:app (Cloud Run) · python api/main.py (로컬) 둘 다 되게
    from .ai import AIError, embed, generate
except ImportError:
    from ai import AIError, embed, generate

mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise RuntimeError("MONGO_URI가 설정되어 있지 않습니다.")

DB_NAME = "yeobaek_db"
# Vertex 임베딩은 OpenAI 것과 차원·공간이 달라 같은 컬렉션에 섞을 수 없다 → 새 컬렉션·새 인덱스
# (기존 yeobaek_docs / vector_index 는 되돌리기용으로 남긴다)
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "yeobaek_docs_v2")
INDEX_NAME = os.getenv("INDEX_NAME", "vector_index_v2")  # Atlas 에 만들어야 하는 인덱스 이름

# 우리 화면에서 온 요청만 받는다 — 아무 사이트나 받으면 우리 비용으로 챗봇을 쓸 수 있다
ALLOWED_ORIGINS = [o.strip() for o in os.getenv(
    "ALLOWED_ORIGINS", "https://lis-yeobaek-web.vercel.app,http://localhost:5173"
).split(",") if o.strip()]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

_mongo = None


class ChatRequest(BaseModel):
    message: str


def get_collection():
    global _mongo
    if _mongo is None:  # 요청마다 새로 연결하지 않는다
        _mongo = MongoClient(mongo_uri)
    return _mongo[DB_NAME][COLLECTION_NAME]


def make_context(docs):
    blocks = []
    for doc in docs:
        source = doc.get("source", "unknown")
        idx = doc.get("chunk_index", 0)
        text = doc.get("text", "").strip()
        blocks.append(f"[출처: {source} | chunk #{idx}]\n{text}")
    return "\n\n---\n\n".join(blocks)


SYSTEM_PROMPT = (
    "너는 인천대학교 문헌정보학과 동아리 '여백(Yeobaek)'의 "
    "전문 도서관·정보학(LIS) 어시스턴트야.\n"
    "- 주요 도메인: 문헌정보학, 정보검색(IR), 메타데이터/목록, 분류(KDC/DDC), "
    "디지털 아카이빙, 추천 시스템, 시소러스/온톨로지, 동아리 운영.\n"
    "- 아래 제공된 '여백 프로젝트 문서' 내용을 우선적으로 참고해서 답변해.\n"
    "- 문서에 없는 내용은 아는 척하지 말고, 확실히 모른다고 말해.\n"
    "- 답변은 한국어, 3~6문장 정도로 간결하게."
)


@app.get("/healthz")
def healthz():
    return {"ok": True}


@app.post("/api/rag-chat")
def rag_chat(req: ChatRequest):
    query = req.message.strip()
    if not query:
        raise HTTPException(status_code=400, detail="메시지가 비어 있습니다.")
    if len(query) > 1000:
        raise HTTPException(status_code=400, detail="질문이 너무 깁니다. 1000자 이내로 줄여 주세요.")

    docs = []
    try:
        query_embedding = embed(query, "RETRIEVAL_QUERY")
        pipeline = [
            {
                "$vectorSearch": {
                    "index": INDEX_NAME,
                    "path": "embedding",
                    "queryVector": query_embedding,
                    "numCandidates": 50,
                    "limit": 4,
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "text": 1,
                    "source": 1,
                    "chunk_index": 1,
                    "score": {"$meta": "vectorSearchScore"},
                }
            },
        ]
        docs = list(get_collection().aggregate(pipeline))
    except Exception as e:  # 검색이 실패해도 답변은 한다 (자료 없이)
        logger.error(f"Vector Search 실패: {e}")
        docs = []

    if docs:
        user_content = (
            "다음은 여백 프로젝트 관련 문서 일부입니다:\n\n"
            f"{make_context(docs)}\n\n"
            f"위 내용을 참고해서 답변해주세요.\n\n질문: {query}"
        )
    else:
        user_content = query

    try:
        return {"reply": generate(SYSTEM_PROMPT, user_content)}
    except AIError as e:
        raise HTTPException(status_code=e.status, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
