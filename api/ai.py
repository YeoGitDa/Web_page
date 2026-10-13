"""Vertex AI 호출 — 임베딩·답변 생성. 여기만 바꾸면 모델을 갈아 끼울 수 있다.

Cloud Run 에서는 서비스 계정 권한으로 인증한다 (API 키 없음).
로컬에서 돌릴 때는 `gcloud auth application-default login` 후 실행한다.

환경변수 (전부 기본값 있음, 프로젝트만 필수)
  GOOGLE_CLOUD_PROJECT  GCP 프로젝트 ID
  GEN_MODEL             답변 모델            기본 gemini-2.5-flash
  GEN_LOCATION          답변 모델 위치        기본 global
  EMBED_MODEL           임베딩 모델          기본 gemini-embedding-001
  EMBED_LOCATION        임베딩 모델 위치      기본 us-central1
  EMBED_DIM             임베딩 차원          기본 768 — Atlas 벡터 인덱스 numDimensions 와 같아야 한다
"""
import os
import time
import logging

from google import genai
from google.genai import types, errors

logger = logging.getLogger(__name__)

PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT")
GEN_MODEL = os.getenv("GEN_MODEL", "gemini-2.5-flash")
GEN_LOCATION = os.getenv("GEN_LOCATION", "global")
EMBED_MODEL = os.getenv("EMBED_MODEL", "gemini-embedding-001")
EMBED_LOCATION = os.getenv("EMBED_LOCATION", "us-central1")
EMBED_DIM = int(os.getenv("EMBED_DIM", "768"))
TIMEOUT_MS = 30_000

_clients = {}


class AIError(Exception):
    """AI 호출 실패. status 는 화면에 돌려줄 HTTP 코드."""

    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status = status


def _client(location: str) -> genai.Client:
    if not PROJECT:
        raise AIError(500, "GOOGLE_CLOUD_PROJECT 가 설정되어 있지 않습니다.")
    if location not in _clients:
        _clients[location] = genai.Client(
            vertexai=True, project=PROJECT, location=location,
            http_options=types.HttpOptions(timeout=TIMEOUT_MS),
        )
    return _clients[location]


def _to_ai_error(e: Exception) -> AIError:
    code = getattr(e, "code", None)
    if code == 429:
        return AIError(429, "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.")
    if code in (408, 504) or "timeout" in str(e).lower():
        return AIError(504, "요청 시간이 초과되었습니다.")
    return AIError(502, "AI 서비스에서 오류가 발생했습니다.")


def embed(text: str, task: str = "RETRIEVAL_QUERY", retries: int = 3) -> list[float]:
    """글 하나 → 숫자 묶음. 질문은 RETRIEVAL_QUERY, 자료 조각은 RETRIEVAL_DOCUMENT."""
    for attempt in range(retries):
        try:
            r = _client(EMBED_LOCATION).models.embed_content(
                model=EMBED_MODEL,
                contents=text,
                config=types.EmbedContentConfig(task_type=task, output_dimensionality=EMBED_DIM),
            )
            return list(r.embeddings[0].values)
        except errors.APIError as e:
            if getattr(e, "code", None) == 429 and attempt + 1 < retries:
                time.sleep(2 ** attempt)  # 자료를 많이 넣을 때 한도에 걸리면 잠깐 쉬고 다시
                continue
            logger.error("임베딩 실패: %s", e)
            raise _to_ai_error(e) from e
        except AIError:
            raise
        except Exception as e:  # 네트워크·시간 초과 등 SDK 밖 오류
            logger.error("임베딩 실패: %s", e)
            raise _to_ai_error(e) from e


def generate(system_prompt: str, user_content: str) -> str:
    try:
        r = _client(GEN_LOCATION).models.generate_content(
            model=GEN_MODEL,
            contents=user_content,
            config=types.GenerateContentConfig(system_instruction=system_prompt, temperature=0.3, max_output_tokens=1024),
        )
        return r.text or ""
    except errors.APIError as e:
        logger.error("답변 생성 실패: %s", e)
        raise _to_ai_error(e) from e
    except AIError:
        raise
    except Exception as e:
        logger.error("답변 생성 실패: %s", e)
        raise _to_ai_error(e) from e
