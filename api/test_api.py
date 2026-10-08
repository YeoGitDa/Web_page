"""챗봇 서버 시험 — 실제 AI·DB 를 부르지 않는다 (가짜로 바꿔 끼움).
실행: python -m unittest api/test_api.py
"""
import os
import sys
import unittest
from pathlib import Path

os.environ.setdefault("MONGO_URI", "mongodb://test-only")
os.environ.setdefault("GOOGLE_CLOUD_PROJECT", "test-only")
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient  # noqa: E402
import api.main as m  # noqa: E402
from api.ai import AIError  # noqa: E402
from api.reindex_from_atlas import unique_chunks  # noqa: E402


class FakeCollection:
    def __init__(self, docs=None, fail=False):
        self.docs, self.fail, self.pipeline = docs or [], fail, None

    def aggregate(self, pipeline):
        if self.fail:
            raise RuntimeError("search down")
        self.pipeline = pipeline
        return iter(self.docs)


class ChatTest(unittest.TestCase):
    def setUp(self):
        self.calls = {}
        m.embed = lambda text, task="RETRIEVAL_QUERY": self.calls.setdefault("embed", (text, task)) and [0.1] * 768
        def gen(system, user):
            self.calls["gen"] = (system, user)
            return "답변"
        m.generate = gen
        self.col = FakeCollection([{"text": "여백은 문헌정보학과 동아리", "source": "about.md", "chunk_index": 0}])
        m.get_collection = lambda: self.col
        self.c = TestClient(m.app)

    def test_answer_uses_retrieved_chunks(self):
        r = self.c.post("/api/rag-chat", json={"message": "여백이 뭐야"})
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json(), {"reply": "답변"})
        self.assertEqual(self.calls["embed"], ("여백이 뭐야", "RETRIEVAL_QUERY"))
        self.assertIn("[출처: about.md | chunk #0]", self.calls["gen"][1])
        self.assertEqual(self.col.pipeline[0]["$vectorSearch"]["index"], m.INDEX_NAME)

    def test_search_failure_still_answers_without_context(self):
        self.col.fail = True
        r = self.c.post("/api/rag-chat", json={"message": "안녕"})
        self.assertEqual(r.status_code, 200)
        self.assertEqual(self.calls["gen"][1], "안녕")

    def test_empty_and_too_long(self):
        self.assertEqual(self.c.post("/api/rag-chat", json={"message": "  "}).status_code, 400)
        self.assertEqual(self.c.post("/api/rag-chat", json={"message": "가" * 1001}).status_code, 400)

    def test_ai_error_maps_status(self):
        def boom(system, user):
            raise AIError(429, "요청 한도를 초과했습니다.")
        m.generate = boom
        r = self.c.post("/api/rag-chat", json={"message": "질문"})
        self.assertEqual(r.status_code, 429)

    def test_cors_only_allowed_origins(self):
        ok = self.c.options("/api/rag-chat", headers={"Origin": "https://lis-yeobaek-web.vercel.app", "Access-Control-Request-Method": "POST"})
        bad = self.c.options("/api/rag-chat", headers={"Origin": "https://evil.example", "Access-Control-Request-Method": "POST"})
        self.assertEqual(ok.headers.get("access-control-allow-origin"), "https://lis-yeobaek-web.vercel.app")
        self.assertIsNone(bad.headers.get("access-control-allow-origin"))

    def test_healthz(self):
        self.assertEqual(self.c.get("/healthz").json(), {"ok": True})


class ReindexTest(unittest.TestCase):
    def test_unique_chunks_drops_duplicates_and_blanks(self):
        rows = [{"source": "a.md", "chunk_index": 0, "text": "가"}, {"source": "a.md", "chunk_index": 0, "text": " 가 "},
                {"source": "a.md", "chunk_index": 1, "text": ""}, {"source": "b.md", "chunk_index": 0, "text": "가"}]
        self.assertEqual(len(unique_chunks(rows)), 2)


if __name__ == "__main__":
    unittest.main()
