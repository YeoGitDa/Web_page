import os
import logging
from pathlib import Path
from dotenv import load_dotenv

from pymongo import MongoClient
from openai import OpenAI
from pypdf import PdfReader

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 경로 설정
BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR / "docs"

# .env 로드
load_dotenv(BASE_DIR / ".env")
api_key = os.getenv("OPENAI_API_KEY")
mongo_uri = os.getenv("MONGO_URI")

if not api_key:
    raise RuntimeError("OPENAI_API_KEY가 설정되어 있지 않습니다. api/.env를 확인해주세요.")
if not mongo_uri:
    raise RuntimeError("MONGO_URI가 설정되어 있지 않습니다. api/.env를 확인해주세요.")

# DB 및 모델 설정
DB_NAME = "yeobaek_db"
COLLECTION_NAME = "yeobaek_docs"
EMBED_MODEL = "text-embedding-3-small"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

client = OpenAI(api_key=api_key)

def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP):
    """
    텍스트를 chunk_size 단위로 나누되, overlap만큼 겹치게 분할
    """
    chunks = []
    start = 0
    text_len = len(text)

    while start < text_len:
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():
            chunks.append(chunk.strip())
        start += (chunk_size - overlap)

    return chunks

def extract_text(file_path: Path) -> str:
    """확장자에 맞춰 텍스트를 추출합니다."""
    ext = file_path.suffix.lower()
    if ext == ".pdf":
        try:
            reader = PdfReader(file_path)
            text = [page.extract_text() for page in reader.pages if page.extract_text()]
            return "\n".join(text)
        except Exception as e:
            logger.error(f"PDF 파싱 에러 '{file_path.name}': {e}")
            return ""
    elif ext in [".txt", ".md"]:
        try:
            return file_path.read_text(encoding="utf-8")
        except Exception as e:
            logger.error(f"텍스트 파일 읽기 에러 '{file_path.name}': {e}")
            return ""
    else:
        logger.warning(f"지원하지 않는 파일 형식: {file_path.name}")
        return ""

def get_embedding(text: str) -> list[float]:
    response = client.embeddings.create(
        input=text,
        model=EMBED_MODEL
    )
    return response.data[0].embedding

def build_index():
    logger.info(f"MongoDB 연결 중...")
    mongo_client = MongoClient(mongo_uri)
    db = mongo_client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # 옵션: 문서 삽입 전 기존 컬렉션 비우기 원하시면 주석 해제하세요.
    # collection.delete_many({})
    # logger.info("기존 문서를 모두 삭제했습니다.")

    if not DOCS_DIR.exists():
        logger.error(f"문서 디렉터리가 없습니다: {DOCS_DIR}")
        return

    doc_files = list(DOCS_DIR.glob("*.md")) + list(DOCS_DIR.glob("*.txt")) + list(DOCS_DIR.glob("*.pdf"))
    if not doc_files:
        logger.warning(f"문서 파일이 없습니다: {DOCS_DIR}")
        return

    logger.info(f"발견된 문서 파일: {len(doc_files)}개")

    docs_to_insert = []
    for doc_file in doc_files:
        logger.info(f"처리 중: {doc_file.name}")
        content = extract_text(doc_file)
        if not content.strip():
            continue

        chunks = chunk_text(content)
        logger.info(f"  - {len(chunks)}개 청크 생성 완료. 임베딩 계산 중...")

        for i, chunk in enumerate(chunks):
            embedding = get_embedding(chunk)
            docs_to_insert.append({
                "source": doc_file.name,
                "chunk_index": i,
                "text": chunk,
                "embedding": embedding
            })

    if docs_to_insert:
        logger.info(f"총 {len(docs_to_insert)}개 청크를 MongoDB에 삽입 중...")
        collection.insert_many(docs_to_insert)
        logger.info("인덱싱 완료!")
    else:
        logger.warning("인덱싱할 청크가 없습니다.")

if __name__ == "__main__":
    logger.info("=== RAG MongoDB 인덱스 빌드 시작 ===")
    build_index()
    logger.info("=== RAG MongoDB 인덱스 빌드 완료 ===")
