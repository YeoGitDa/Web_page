"""기존 컬렉션(OpenAI 임베딩)의 조각 글을 꺼내 Vertex 임베딩으로 새 컬렉션에 다시 넣는다. 1회용.

원본 자료(api/docs/)가 저장소에 없어서, Atlas 에 저장돼 있는 조각 text 를 원본 대신 쓴다.
기존 컬렉션은 건드리지 않는다 (되돌리기용).

실행:
  python api/reindex_from_atlas.py --dry-run      # 몇 개 옮길지만 센다 (과금 없음)
  python api/reindex_from_atlas.py                # 새 컬렉션을 비우고 다시 채운 뒤 벡터 인덱스를 만든다

환경변수: MONGO_URI · GOOGLE_CLOUD_PROJECT (+ ai.py 의 모델 설정)
  SOURCE_COLLECTION  기본 yeobaek_docs      (읽기만)
  COLLECTION_NAME    기본 yeobaek_docs_v2   (씀)
  INDEX_NAME         기본 vector_index_v2
"""
import argparse
import os
import logging
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
load_dotenv(Path(__file__).resolve().parent / ".env")

try:
    from .ai import embed, EMBED_DIM, EMBED_MODEL
except ImportError:
    from ai import embed, EMBED_DIM, EMBED_MODEL

DB_NAME = "yeobaek_db"
SOURCE = os.getenv("SOURCE_COLLECTION", "yeobaek_docs")
TARGET = os.getenv("COLLECTION_NAME", "yeobaek_docs_v2")
INDEX_NAME = os.getenv("INDEX_NAME", "vector_index_v2")


def unique_chunks(rows):
    """같은 (출처, 조각 번호, 글) 은 하나만 — 예전 build_index 를 여러 번 돌려 중복이 쌓였을 수 있다"""
    seen, out = set(), []
    for r in rows:
        key = (r.get("source"), r.get("chunk_index"), (r.get("text") or "").strip())
        if not key[2] or key in seen:
            continue
        seen.add(key)
        out.append({"source": key[0], "chunk_index": key[1], "text": key[2]})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    uri = os.getenv("MONGO_URI")
    if not uri:
        raise RuntimeError("MONGO_URI가 설정되어 있지 않습니다.")
    db = MongoClient(uri)[DB_NAME]
    rows = list(db[SOURCE].find({}, {"_id": 0, "source": 1, "chunk_index": 1, "text": 1}))
    chunks = unique_chunks(rows)
    logger.info(f"{SOURCE}: {len(rows)}개 → 중복 제거 {len(chunks)}개 · 출처 {len({c['source'] for c in chunks})}개")
    if args.dry_run:
        return

    target = db[TARGET]
    target.delete_many({})
    for i, c in enumerate(chunks, 1):
        target.insert_one({**c, "embedding": embed(c["text"], "RETRIEVAL_DOCUMENT")})
        if i % 20 == 0:
            logger.info(f"  {i}/{len(chunks)}")
    logger.info(f"{TARGET}: {target.count_documents({})}개 저장 ({EMBED_MODEL}, {EMBED_DIM}차원)")

    if INDEX_NAME in {ix["name"] for ix in target.list_search_indexes()}:
        logger.info(f"벡터 인덱스 {INDEX_NAME} 이미 있음")
        return
    try:
        target.create_search_index(SearchIndexModel(
            name=INDEX_NAME, type="vectorSearch",
            definition={"fields": [{"type": "vector", "path": "embedding", "numDimensions": EMBED_DIM, "similarity": "cosine"}]},
        ))
        logger.info(f"벡터 인덱스 {INDEX_NAME} 생성 요청 — Atlas 에서 READY 가 될 때까지 1~2분")
    except Exception as e:
        logger.error(f"벡터 인덱스 자동 생성 실패: {e}")
        logger.error(f"→ Atlas 화면 Search 탭에서 직접 만든다: 이름 {INDEX_NAME} · path embedding · numDimensions {EMBED_DIM} · cosine")


if __name__ == "__main__":
    main()
