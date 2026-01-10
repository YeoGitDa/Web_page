from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# 프론트엔드와 통신 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/rag-chat")
def chat(request: ChatRequest):
    # TODO: 실제 RAG 로직 구현 필요
    # 현재는 테스트용 응답 반환
    user_message = request.message
    return {"reply": f"백엔드 연결 성공! 받은 메시지: {user_message}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)