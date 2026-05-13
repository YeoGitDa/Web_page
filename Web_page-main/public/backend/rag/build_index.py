# backend/rag/build_index.py(1119 신규)

import os
from pathlib import Path
from typing import List

from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions

# ============ 기본 설정 ============

BASE_DIR = Path(__file__).resolve().parent

#.md / .txt 파일
DOCS_DIR = BASE_DIR / "docs"

# ChromaDB 저장 위치
DB_DIR = BASE_DIR / "db"

# 컬렉션 이름
COLLECTION_NAME = "yeobaek_docs"

# OpenAI 임베딩 모델
EMBED_MODEL = "text-embedding-3-small"

# 청크 설정
CHUNK_SIZE = 500     
CHUNK_OVERLAP = 100     


# ============ 유틸 함수 ============

def load_api_key() -> str:
    """환경변수에서 OPENAI_API_KEY 읽기 (.env 포함)"""
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY 가 설정되어 있지 않습니다. .env 또는 환경변수를 확인하세요.")
    return api_key


def read_text_files(doc_dir: Path) -> List[tuple[str, str]]:
    """docs 폴더에서 .txt, .md 파일 읽어서 (상대경로, 내용) 리스트로 반환"""
    doc_dir.mkdir(exist_ok=True)
    results: List[tuple[str, str]] = []

    for path in doc_dir.glob("**/*"):
        if path.is_file() and path.suffix.lower() in {".txt", ".md"}:
            try:
                text = path.read_text(encoding="utf-8", errors="ignore")
            except Exception as e:
                print(f"[WARN] 파일을 읽는 중 오류: {path} ({e})")
                continue

            if text.strip():
                rel = str(path.relative_to(doc_dir))
                results.append((rel, text))
    return results


def chunk_text(text: str, size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> List[str]:
    """아주 단순한 문자 기반 청크 분할 함수"""
    text = text.replace("\r\n", "\n")
    chunks: List[str] = []
    start = 0
    length = len(text)

    while start < length:
        end = start + size
        chunk = text[start:end]
        chunks.append(chunk)
        # 다음 시작 위치: (size - overlap) 만큼 전진
        start += max(size - overlap, 1)

    return chunks


# ============ 인덱스 생성 메인 로직 ============

def build_index():
    print("=====================================")
    print("  Yeobaek RAG 인덱스 생성 스크립트")
    print("=====================================")
    print(f"[PATH] DOCS_DIR = {DOCS_DIR}")
    print(f"[PATH] DB_DIR   = {DB_DIR}")

    api_key = load_api_key()
    print("[INFO] OPENAI_API_KEY 확인 완료")

    # 1) 문서 읽기
    docs = read_text_files(DOCS_DIR)
    if not docs:
        print("[WARN] docs/ 폴더에 .txt, .md 문서가 없습니다.")
        print("       예: intro.md, system_design.txt, meeting.md 등을 넣어주세요.")
        return

    print(f"[INFO] 문서 개수: {len(docs)}")

    # 2) ChromaDB 클라이언트 & 컬렉션 생성
    DB_DIR.mkdir(exist_ok=True)
    chroma_client = chromadb.PersistentClient(path=str(DB_DIR))

    openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=api_key,
        model_name=EMBED_MODEL,
    )

    collection = chroma_client.get_or_create_collection(
        name=COLLECTION_NAME,
        embedding_function=openai_ef,
        metadata={"description": "Yeobaek 프로젝트 RAG 인덱스"},
    )

    # 기존 데이터 초기화 (초기 버전은 매번 전체 재생성)
    existing_count = collection.count()
    if existing_count > 0:
        print(f"[INFO] 기존 벡터 {existing_count}개 삭제 후 재생성")
        collection.delete(where={})

    # 3) 청크 생성
    all_ids: List[str] = []
    all_docs: List[str] = []
    all_metadatas: List[dict] = []

    total_chunks = 0

    for file_idx, (rel_path, content) in enumerate(docs):
        chunks = chunk_text(content)
        print(f"  - {rel_path}: {len(chunks)} chunks")
        total_chunks += len(chunks)

        for i, chunk in enumerate(chunks):
            doc_id = f"{rel_path}__{i}"
            all_ids.append(doc_id)
            all_docs.append(chunk)
            all_metadatas.append(
                {
                    "source": rel_path,
                    "chunk_index": i,
                }
            )

    print(f"[INFO] 총 청크 개수: {total_chunks}")
    if total_chunks == 0:
        print("[WARN] 생성된 청크가 없습니다. 문서 내용을 확인하세요.")
        return

    # 4) 컬렉션에 추가 (이때 OpenAI 임베딩 자동 호출)
    print("[INFO] 임베딩 생성 및 ChromaDB 저장 중...")
    collection.add(
        ids=all_ids,
        documents=all_docs,
        metadatas=all_metadatas,
    )

    print(f"[DONE] 인덱스 생성 완료! (collection={COLLECTION_NAME}, count={collection.count()})")
    print("=====================================")


if __name__ == "__main__":
    build_index()
