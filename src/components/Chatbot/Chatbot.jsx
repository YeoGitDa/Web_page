// src/components/Chatbot/Chatbot.jsx
import { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";

// 타임아웃을 포함한 fetch 함수
async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// 재시도 로직을 포함한 fetch 함수
async function fetchWithRetry(url, options = {}, maxRetries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // 타임아웃 30초로 설정
      const response = await fetchWithTimeout(url, options, 30000);
      return response;
    } catch (error) {
      lastError = error;

      // AbortError (타임아웃) 또는 네트워크 오류인 경우에만 재시도
      if (error.name === 'AbortError') {
        console.warn(`Request timeout (attempt ${attempt + 1}/${maxRetries + 1})`);
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.warn(`Network error (attempt ${attempt + 1}/${maxRetries + 1}):`, error.message);
      } else {
        // 다른 에러는 즉시 throw
        throw error;
      }

      // 마지막 시도가 아니면 1초 대기 후 재시도
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError;
}

// API URL 설정 (환경 변수 또는 기본값)
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// 백엔드(FastAPI)로 실제 요청 보내는 함수
async function backendGetReply(userText) {
  try {
    const res = await fetchWithRetry(`${API_BASE_URL}/rag-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    }, 2); // 최대 2번 재시도

    if (!res.ok) {
      console.error("API error status:", res.status, res.statusText);

      // 상태 코드에 따른 구체적인 에러 메시지
      if (res.status >= 500) {
        return "⚠️ 서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (res.status === 404) {
        return "⚠️ API 엔드포인트를 찾을 수 없습니다. 관리자에게 문의하세요.";
      } else if (res.status === 400) {
        return "⚠️ 잘못된 요청입니다. 메시지를 확인해주세요.";
      } else if (res.status === 429) {
        return "⚠️ 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
      } else {
        return "⚠️ 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }
    }

    const data = await res.json();

    if (data && typeof data.reply === "string") {
      return data.reply;
    } else {
      console.error("Invalid response format:", data);
      return "⚠️ 서버 응답 형식이 예상과 다릅니다.";
    }
  } catch (err) {
    console.error("API call failed:", err);

    // 에러 타입에 따른 구체적인 메시지
    if (err.name === 'AbortError') {
      return "⚠️ 요청 시간이 초과되었습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.";
    } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      return "⚠️ 서버와 연결할 수 없습니다. 네트워크 연결을 확인해주세요.";
    } else {
      return "⚠️ 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
  }
}

export default function Chatbot({
  title = "여불이",
  subtitle = "여백의 챗봇입니다",
  getReply = backendGetReply,
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text:
        "안녕하세요! 😊\n" +
        "저는 여백의 작은AI 백봇이에요.\n" +
        "여백 및 동아리에 관한 질문을 해 주세요!.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // 새 메시지 올 때마다 맨 아래로 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const replyText = await getReply(text);

      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: replyText,
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* 오른쪽 아래 토글 버튼 */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleToggle}
      >
        💬 Chat-bot
      </button>

      {/* 챗봇 창(1119 신규) */}
      {isOpen && (
        <div className={styles.window}>
          <div className={styles.header}>
            <div>
              <span className={styles.titleMain}>{title}</span>
              <span className={styles.titleSub}>{subtitle}</span>
              {/* 상태 뱃지(1119 신규) */} 
              <span className={styles.statusBadge}>
                {isSending ? "답변 생성 중..." : "RAG · OpenAI"}
              </span>
            </div>
        
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleToggle}
            >
              ×
            </button>
          </div>

          <div className={styles.messages}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageRow} ${
                m.role === "user" ? styles.userRow : styles.botRow
              }`}
            >
              {/* Bot일 때만 아바타 표시 */}
              {m.role === "bot" && (
                <img
                  src="/mascot_chatbot.png"
                  alt="Bot Avatar"
                  className={styles.chatAvatar}
                />
              )}

              <div
                className={`${styles.message} ${
                  m.role === "user" ? styles.user : styles.bot
                }`}
              >
                <div className={styles.bubble}>
                  {m.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
                <div className={styles.meta}>
                  {m.role === "user" ? "You" : "Bot · LIS"}
                </div>
              </div>
            </div>
          ))}


            {/* 로딩 중일 때 봇 말풍선(1119 신규) */}
            {isSending && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.bubble}>
                  <span>생각 중입니다...</span>
                  <br />
                </div>
                <div className={styles.meta}>Bot · generating</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 추천 질문 버튼(1119 신규) */}
          <div className={styles.suggestions}>
            <button
              type="button"
              onClick={() =>
                setInput("여백 프로젝트랑 문헌정보학이 어떻게 연결될 수 있어?")
              }
            >
              여백 × LIS 연결
            </button>
            <button
              type="button"
              onClick={() =>
                setInput("도서관 추천 시스템을 만들 때 기본 구조가 어떻게 돼?")
              }
            >
              추천 시스템 구조
            </button>
            <button
              type="button"
              onClick={() =>
                setInput("시소러스랑 온톨로지 차이를 예시로 설명해줘")
              }
            >
              시소러스 vs 온톨로지
            </button>
          </div>

          <form className={styles.inputArea} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              placeholder={
                isSending ? "응답 생성 중..." : "메시지를 입력하세요..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={isSending}
            >
              {isSending ? "..." : "전송"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}