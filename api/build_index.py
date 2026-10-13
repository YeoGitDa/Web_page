"""api/docs/ 의 자료(.md · .txt · .pdf)를 조각내 임베딩해서 MongoDB 에 넣는다.

실행: python api/build_index.py
  - 같은 파일을 다시 넣으면 그 파일의 기존 조각을 먼저 지운다 (중복으로 쌓이지 않게)
  - 저장 위치: COLLECTION_NAME (기본 yeobaek_docs_v2)
  - ⚠️ api/docs/ 는 .gitignore 의 `docs` 줄 때문에 저장소에 들어가지 않는다. 원본 자료 보관 위치는 HANDOFF.md 참고
"""
import os
import logging
from pathlib import Path
from dotenv import load_dotenv

from pymongo import MongoClient
from pypdf import PdfReader

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR / "docs"
load_dotenv(BASE_DIR / ".env")

try:
    from .ai import embed
except ImportError:
    from ai import embed

mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise RuntimeError("MONGO_URI가 설정되어 있지 않습니다. api/.env를 확인해주세요.")

DB_NAME = "yeobaek_db"
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "yeobaek_docs_v2")
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100


def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP):
    """텍스트를 chunk_size 단위로 나누되, overlap만큼 겹치게 분할"""
    chunks = []
    start = 0
    while start < len(text):
        chunk = text[start:start + chunk_size]
        if chunk.strip():
            chunks.append(chunk.strip())
        start += (chunk_size - overlap)
    return chunks


def extract_text(file_path: Path) -> str:
    """확장자에 맞춰 텍스트를 추출합니다."""
    ext = file_path.suffix.lower()
    try:
        if ext == ".pdf":
            reader = PdfReader(file_path)
            return "\n".join(t for t in (page.extract_text() for page in reader.pages) if t)
        if ext in (".txt", ".md"):
            return file_path.read_text(encoding="utf-8")
    except Exception as e:
        logger.error(f"읽기 에러 '{file_path.name}': {e}")
        return ""
    logger.warning(f"지원하지 않는 파일 형식: {file_path.name}")
    return ""


def build_index():
    collection = MongoClient(mongo_uri)[DB_NAME][COLLECTION_NAME]

    if not DOCS_DIR.exists():
        logger.error(f"문서 디렉터리가 없습니다: {DOCS_DIR}")
        return

    doc_files = sorted(list(DOCS_DIR.glob("*.md")) + list(DOCS_DIR.glob("*.txt")) + list(DOCS_DIR.glob("*.pdf")))
    if not doc_files:
        logger.warning(f"문서 파일이 없습니다: {DOCS_DIR}")
        return
    logger.info(f"발견된 문서 파일: {len(doc_files)}개 → {COLLECTION_NAME}")

    total = 0
    for doc_file in doc_files:
        content = extract_text(doc_file)
        if not content.strip():
            continue
        chunks = chunk_text(content)
        rows = [{"source": doc_file.name, "chunk_index": i, "text": c, "embedding": embed(c, "RETRIEVAL_DOCUMENT")}
                for i, c in enumerate(chunks)]
        removed = collection.delete_many({"source": doc_file.name}).deleted_count  # 같은 파일 재실행 = 교체
        collection.insert_many(rows)
        total += len(rows)
        logger.info(f"  {doc_file.name}: {len(rows)}개 조각 (기존 {removed}개 교체)")

    logger.info(f"인덱싱 완료 — 이번에 넣은 조각 {total}개")


if __name__ == "__main__":
    build_index()
