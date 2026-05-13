# Yeobaek Web — 운영자(Admin) 영역 및 인증 계획

**버전:** 0.2  
**목표:** 공개 메인 사이트(홈·서비스·모집 등)와 분리된 **운영자 전용 `/admin`** 을 두고, **공용 `/login`** 에서 운영자·일반 사용자(환경 변수 기반 MVP)를 구분해 세션·리다이렉트한다.

---

## 1. 용어

| 용어 | 의미 |
|------|------|
| **메인 사이트** | 공개 웹 전체 (`/`, `/about`, `/recruit`, LAB 등). 방문자는 로그인 없이 이용. |
| **운영자(Admin)** | 동아리 운영진. 인력풀·기회·통계 등 **사이트 전반** 운영 데이터를 다루는 주체. |
| **`/admin`** | 운영자 UI의 URL prefix. “HUB”라는 말과 혼동되지 않도록 문서·UI에서는 **운영 / Admin** 으로 통일. |

---

## 2. 라우팅 구조 (한 Router, 경로 분리)

| 경로 | 접근 | 설명 |
|------|------|------|
| `/` … | 공개 | 기존 메인·모집·LAB 등 |
| `/login` | 공개 | **통합 로그인**(운영자·일반 사용자). `?next=` 로 로그인 후 복귀 경로 전달(검증됨). |
| `/admin/login` | 공개 | **`/login?next=…` 로 리다이렉트**만 수행(북마크 호환). |
| `/me` | **user 세션 필요** | 일반 사용자 영역 MVP(로그아웃·안내). |
| `/admin` | **admin 세션 필요** | 운영 홈(요약·다른 모듈로 이동) |
| `/admin/dashboard` | **admin 세션 필요** | 기존 `AdminDashboard`(인력풀·기회·매칭 등) |

**레거시 URL:** `/hub`, `/hub/admin` → 각각 `/admin`, `/admin/dashboard` 로 **리다이렉트**(북마크 호환).

---

## 3. 인증 (Phase A — 프론트 MVP)

- **저장**
  - 운영자: `localStorage` 키 `yeobaek_admin_auth` → `{ role: 'admin', at }`
  - 일반 사용자: `yeobaek_user_auth` → `{ role: 'user', id, at }`
- **공용 로그인:** `src/auth/session.js` 의 `loginUnified(id, password)`  
  - `VITE_ADMIN_PASSWORD` 일치 시 admin 세션(선택 `VITE_ADMIN_ID` 가 있으면 ID 도 일치해야 함).  
  - `VITE_USER_ID` + `VITE_USER_PASSWORD` 가 모두 설정된 경우에만 해당 쌍이 일치하면 user 세션.  
  - 한 브라우저에서는 역할 전환 시 상대 세션을 지우고 하나만 유지.
- **보호**
  - `/admin` 하위: `ProtectedRoute` — admin 세션 없으면 `/login?next=현재경로`
  - `/me`: `UserProtectedRoute` — user 세션 없으면 `/login?next=현재경로`
- **로그아웃:** 운영 셸은 admin 세션만 삭제 후 `/login`. `/me` 는 user 세션 삭제 후 `/login`.

**주의:** Vite 환경 변수는 **클라이언트에 포함**되므로, 이 방식은 **운영 보안의 최종 형태가 아님**. Phase B에서 백엔드 세션·HTTP-only 쿠키·OAuth 등으로 교체.

### 환경 변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `VITE_ADMIN_PASSWORD` | 운영자 로그인 사용 시 | 관리자 공유 비밀번호(임시). |
| `VITE_ADMIN_ID` | 선택 | 설정 시 해당 ID 와 비밀번호 조합만 운영자로 인정. |
| `VITE_USER_ID` | 일반 로그인 데모 시 | 둘 다 설정해야 user 로그인 활성화. |
| `VITE_USER_PASSWORD` | 일반 로그인 데모 시 | 위와 쌍으로 사용. |

---

## 4. 로그인 후 분기

1. 응답 역할 **`admin` | `user`** 에 따라 `resolvePostLoginPath(role, next)` 로 이동.
2. **리다이렉트:**  
   - `admin` → `next` 가 `/admin` 하위(로그인 제외)면 그 경로, 아니면 `/admin`  
   - `user` → `next` 가 `/admin` 이면 `/me`, 그 외 안전한 내부 경로면 `next`, 없거나 `/login` 등이면 `/me`
3. **라우트 가드:** `ProtectedRoute` / `UserProtectedRoute` 로 URL 직접 입력 방지.

---

## 5. 구현 순서 (체크리스트)

1. [x] 본 문서 추가  
2. [x] `/hub` → `/admin` 라우트 이전 및 리다이렉트  
3. [x] `ProtectedRoute` + `auth/session.js`  
4. [x] `/admin/login` 페이지(현재는 `/login` 통합 진입점)  
5. [x] `.env.example` 에 `VITE_ADMIN_PASSWORD` 안내  
6. [x] 공용 `/login` 과 운영 로그인 통합, `user` 역할·`/me`·리다이렉트  

---

## 6. 참고

- 모집 데이터는 여전히 `/recruit` 에서 수집되며, **대시보드는 `/admin` 에서 조회·관리**하는 그림이 자연스럽다.  
- SPA 배포 시 `/admin`, `/admin/login`, `/login`, `/me` 등 모든 하위 경로가 `index.html` 로 fallback 되는지 호스팅 설정을 확인한다.
