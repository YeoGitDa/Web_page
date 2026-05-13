# 여백 리크루팅 페이지 기술명세 (MVP)

**버전:** 0.1  
**범위:** 기존 Vite + React 배포 사이트에 `/recruit` 이하 별도 UX로 부착  
**전제:** 부원 모집과 인력풀은 도메인·폼·저장 단위가 분리된다.

## 1. 목표

- 기관/기업 채용 페이지와 유사한 정돈된 랜딩 + 지원 폼으로 상시 모집 공고에 대응한다.
- 백엔드 없이도 즉시 신청을 받을 수 있게 한다.
- 이후 FastAPI·DB·어드민 연동 시 동일 JSON envelope를 그대로 수용할 수 있게 한다.

## 2. URL 구조

- `/recruit`: 랜딩(부원 지원/인력풀 분기)
- `/recruit/member`: 동아리 부원 지원서
- `/recruit/talent-pool`: 대외·프로젝트 인력풀 등록

## 3. 제출 방식

### 3.1 환경 변수

- `VITE_RECRUIT_SUBMIT_URL`
  - 설정 시: `POST`로 JSON envelope 전송
  - 미설정 시: 브라우저에서 JSON 다운로드 + 클립보드 복사로 수동 적재

### 3.2 Envelope 스키마

```json
{
  "submittedAt": "ISO-8601",
  "applicationType": "member" | "talent_pool",
  "source": "yeobaek-web-recruit",
  "payload": {}
}
```

## 4. 필드 명세

### 4.1 부원 (`member`)

- 필수: `name`, `studentId`, `major`, `phone`, `motivation`, `privacyAgree`
- 선택: `email`, `interestDomains`, `techStack`, `projectHistory`, `expectations`

### 4.2 인력풀 (`talent_pool`)

- 필수: `name`, `affiliation`, `phone`, `preferredActivities`, `privacyAgree`
- 선택: `email`, `weeklyAvailability`, `skillsSummary`, `notes`

## 5. 비기능

- 접근성: 라벨/필수 표기, 중복 제출 방지
- 보안: 민감정보 콘솔 출력 금지
- 네트워크: 외부 수집 URL CORS 허용 필요
