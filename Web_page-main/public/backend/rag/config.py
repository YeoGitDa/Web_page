# backend/rag/config.py (1119 신규)
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

# 여백 문서 위치
DOCS_DIR = BASE_DIR / "docs"

# 벡터 DB 저장 위치 (Chroma)
DB_DIR = BASE_DIR / "db"

# 한 컬렉션 이름
COLLECTION_NAME = "yeobaek_docs"

# OpenAI 임베딩 모델
EMBED_MODEL = "text-embedding-3-small"

# 문자 기반 chunk 기준 (나중에 토큰 단위로 바꿔도 됨)
CHUNK_SIZE = 500        # 한 청크 길이
CHUNK_OVERLAP = 100     # 문맥 겹침