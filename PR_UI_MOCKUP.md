# v3 Recruit형 셸 통일 + 브랜드 서브타이틀 + 시안 허브 연결

UI/UX 개선의 **전체 로드맵·원칙**은 [`docs/ui-ux/README.md`](./docs/ui-ux/README.md)를 참고한다.

## 요약

정적 HTML 시안을 v3 Recruit형 헤더·플로팅 문의 등 공통 맥락으로 맞추고, `npm run dev`로 띄운 React 홈에서도 시안 허브로 갈 수 있게 했습니다.
로고 옆 `YEOBAEK | …` 의 뒷부분은 페이지(또는 라우트)에 따라 달라지도록 정적 시안과 주요 React 화면에 반영했습니다.

## 변경 사항

- `public/mockup-shell-v3.css` — sticky 헤더, pill 내비, 히어로·pagehead·통계·서비스 카드·문의 밴드·auth 셸 등 v3 공통 스타일 분리
- 정적 시안 HTML — `ui-mockup-main-v3` 및 about / chatbot / archiving / exhibition / lab / login / signup / me / main-v2-layout / index 등에서 동일 셸 구조·링크 패턴 정리. 메인 v3 푸터에 시안 목록·셸 CSS 링크 유지
- 시안 목록 접근성
  - React `App.jsx` (홈) 상단에 `시안 목록` → `/ui-mockup-index.html`
  - `ui-mockup-main-v3.html` 헤더에 시안 목록 pill 추가
  - `ui-mockup-index.html` 활성 pill 문구를 시안 목록으로 통일
- 브랜드 서브타이틀
  - 정적 시안: `| Web` 고정 대신 페이지별 `About` / `Chatbot` / `Archiving` / `Exhibition` / `Lab` / `Login` / `Signup` / `Me` / `Layout` 등 (메인 v3는 `Web`, 인덱스는 `Mockups`)
  - React: `SiteBrandMark` 컴포넌트로 홈·상세·로그인·가입 등에서 동일 패턴 적용; LAB 라우트는 `Lab {labNumber}` 형태
- 기타 — `ui-mockup-me.html` 레이아웃/CSS 깨짐 수정, `ui-mockup-yeobaek.html` 푸터에 v3·목록 링크 보강

## 테스트 방법

1. `npm run dev` 후 `/` 에서 우측 상단 `시안 목록` 클릭 → `/ui-mockup-index.html` 로딩 확인
2. `/ui-mockup-main-v3.html` 헤더·푸터에서 시안 목록·각 시안 페이지 이동 확인
3. `/about`, `/archiving`, `/chatbot`, `/exhibition`, `/lab/2` 등에서 로고 옆 `YEOBAEK | …` 문구가 페이지에 맞게 바뀌는지 확인
4. `/login`, `/signup` 에서 밝은 헤더 배경에서도 브랜드 가독성 확인

## 참고 / 비범위

- 모집(`RecruitLayout`)·운영(`AdminShell`) 헤더는 기존 `| Recruit`, `| 운영` 유지
- v1 시안(`ui-mockup-yeobaek.html`)은 히어로 내 전면 내비 구조 유지, 푸터 링크 수준만 조정. 전체 v3 헤더 이식은 별도 논의 가능
