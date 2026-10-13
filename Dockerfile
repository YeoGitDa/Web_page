# 여백 챗봇 서버 — Cloud Run
# 빌드·배포 (저장소 루트에서):
#   gcloud run deploy yeobaek-chatbot --source . --region asia-northeast3 ...  (자세한 명령은 HANDOFF.md)
FROM python:3.12-slim
WORKDIR /app
COPY api/requirements.txt api/requirements.txt
RUN pip install --no-cache-dir -r api/requirements.txt
COPY api/ api/
ENV PORT=8080
CMD exec uvicorn api.main:app --host 0.0.0.0 --port ${PORT}
