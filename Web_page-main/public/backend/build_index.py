#!/usr/bin/env python3
# build_index.py - RAG 문서를 ChromaDB에 인덱싱하는 스크립트

import os
import logging
from pathlib import Path
from dotenv import load_dotenv

import chromadb
from chromadb.utils import embedding_functions

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# .env 로드
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY가 설정되어 있지 않습니다. .env를 확인해주세요.")

# 설정
BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR / "rag" / "docs"
DB_DIR = BASE_DIR / "rag" / "db"
COLLECTION_NAME = "yeobaek_docs"
EMBED_MODEL = "text-embedding-3-small"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100


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
        if chunk.strip():  # 빈 청크는 제외
            chunks.append(chunk.strip())
        start += (chunk_size - overlap)

    return chunks


def build_index():
    """
    docs 폴더의 모든 텍스트 파일을 읽어서 ChromaDB에 저장
    """
    # ChromaDB 클라이언트 생성
    logger.info(f"ChromaDB 초기화: {DB_DIR}")
    chroma_client = chromadb.PersistentClient(path=str(DB_DIR))

    # OpenAI 임베딩 함수 생성
    logger.info(f"OpenAI 임베딩 함수 초기화: {EMBED_MODEL}")
    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=api_key,
        model_name=EMBED_MODEL,
    )

    # 기존 컬렉션 삭제 후 재생성 (선택적)
    try:
        chroma_client.delete_collection(name=COLLECTION_NAME)
        logger.info(f"기존 컬렉션 '{COLLECTION_NAME}' 삭제 완료")
    except Exception as e:
        logger.info(f"기존 컬렉션이 없거나 삭제 실패 (무시): {e}")

    # 새 컬렉션 생성
    collection = chroma_client.create_collection(
        name=COLLECTION_NAME,
        embedding_function=openai_ef,
    )
    logger.info(f"컬렉션 '{COLLECTION_NAME}' 생성 완료")

    # 문서 파일 읽기
    if not DOCS_DIR.exists():
        logger.error(f"문서 디렉터리가 없습니다: {DOCS_DIR}")
        return

    doc_files = list(DOCS_DIR.glob("*.md")) + list(DOCS_DIR.glob("*.txt"))
    if not doc_files:
        logger.warning(f"문서 파일이 없습니다: {DOCS_DIR}")
        return

    logger.info(f"발견된 문서 파일: {len(doc_files)}개")

    # 각 파일을 청크로 나눠서 인덱싱
    all_chunks = []
    all_metadatas = []
    all_ids = []

    for doc_file in doc_files:
        logger.info(f"처리 중: {doc_file.name}")

        try:
            content = doc_file.read_text(encoding="utf-8")
        except Exception as e:
            logger.error(f"파일 읽기 실패 {doc_file.name}: {e}")
            continue

        # 텍스트를 청크로 분할
        chunks = chunk_text(content)
        logger.info(f"  - {len(chunks)}개 청크 생성")

        # 메타데이터와 ID 생성
        for i, chunk in enumerate(chunks):
            all_chunks.append(chunk)
            all_metadatas.append({
                "source": doc_file.name,
                "chunk_index": i,
            })
            all_ids.append(f"{doc_file.stem}_chunk_{i}")

    # ChromaDB에 일괄 추가
    if all_chunks:
        logger.info(f"총 {len(all_chunks)}개 청크를 ChromaDB에 추가 중...")
        collection.add(
            documents=all_chunks,
            metadatas=all_metadatas,
            ids=all_ids,
        )
        logger.info("인덱싱 완료!")
        logger.info(f"최종 문서 수: {collection.count()}")
    else:
        logger.warning("인덱싱할 청크가 없습니다.")

    # 샘플 검색 테스트
    logger.info("\n=== 샘플 검색 테스트 ===")
    test_query = "여백이 뭐야?"
    results = collection.query(
        query_texts=[test_query],
        n_results=2,
    )
    logger.info(f"테스트 쿼리: {test_query}")
    if results.get("documents") and results["documents"][0]:
        for i, doc in enumerate(results["documents"][0]):
            logger.info(f"\n[결과 {i+1}]")
            logger.info(f"문서: {doc[:200]}...")
            logger.info(f"메타데이터: {results['metadatas'][0][i]}")
    else:
        logger.warning("검색 결과 없음")


if __name__ == "__main__":
    logger.info("=== RAG 인덱스 빌드 시작 ===")
    build_index()
    logger.info("=== RAG 인덱스 빌드 완료 ===")
