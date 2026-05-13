# 여백 프로젝트 회의록  
2025년 11월 15일  
참석: 양승빈, LAB1, LAB3 담당자

---

## 1. RAG 적용 범위 논의
- 1차 범위: 여백 문서(소개, 회의록, 시스템 설계, 연구 계획)
- 2차 범위: 인천대 규정, 학사정보, 도서관 이용규정
- 3차 범위: KDC/DDC/주제어 기반 온톨로지

합의: **현재는 1차 범위만으로 인덱스를 구축하고 프론트 UI 연동**

---

## 2. MCP 기반 자동화 시스템 논의
- 여백 메인 챗봇(Yeobaek-bot)은 MCP 방식으로 확장
- 외부 API(시간표, 도서관 좌석, 날씨, 학사일정)도 플러그인처럼 연결 가능
- 향후 OpenAI Function Calling 또는 Firebase Functions를 활용 예정

---

## 3. 챗봇 UI 디자인 논의
- Chamfer corner 스타일 사용
- Yeobaek 마스코트(고깔모자 곰돌이) 대화 말풍선 옆 배치
- 상태 뱃지(“Online · OpenAI”) 표시
- 추천 질문 버튼 3개 배치 (LIS 기반 질문)

---

## 4. 기술 스택 정리
- Frontend: React + Vite + Tailwind
- Backend: FastAPI + Uvicorn
- Embedding: text-embedding-3-small
- Vector DB: ChromaDB 로컬
- 모델: GPT-4o-mini (데모 단계)

---

## 5. 차주 목표 (11/20 ~ 11/30)
1) RAG 인덱스 1차 구축  
2) `/api/rag-chat` 엔드포인트 생성  
3) 챗봇에서 defaultGetReply 제거 → 백엔드 완전 연동  
4) Yeobaek HUB 초기 배포(Cloudflare Pages 고려)  

---

마지막 업데이트: 2025-11-17