# 여백 웹 디자인 가이드

**기준은 v3 시안** (`public/ui-mockup-main-v3.html`). 새 페이지·섹션은 아래 부품을 가져다 쓰고, 색·크기를 손으로 정하지 않는다.

> 한 줄 요약 — 헤더는 `SiteHeader`, 페이지 맨 위는 `PageHead`, 구역 제목은 `SectionHead`, 나머지는 흰 카드.

---

## 1. 부품 (먼저 이것부터)

모두 `src/components/SiteHeader.jsx` 에 있다.

| 부품 | 언제 | 쓰는 법 |
|---|---|---|
| `SiteHeader` | **모든 페이지 맨 위** | `<SiteHeader suffix="About" />` → 로고 옆 「YEOBAEK \| About」 |
| `PageHead` | 하위 페이지 제목부 | `<PageHead eyebrow="ABOUT" title="동아리 여백을 소개합니다" desc="한 줄 설명" />` |
| `SectionHead` | 페이지 안 구역 제목 | `<SectionHead eyebrow="LAB" title="LAB Info" desc="한 줄 설명" />` |

- 헤더 메뉴(홈 · 서비스 · 소개 · 모집 · 로그인)는 `SiteHeader.jsx` 의 `NAV` 한 곳만 고친다
- 헤더 오른쪽에 버튼을 더 붙일 때는 `right` 로 넘긴다 (예: 홈 배경음 버튼 — `src/App.jsx`)
- 모집(`/recruit`)·운영(`/admin`) 은 자체 헤더가 있지만 모양은 같다

## 2. 색

Tailwind 기본 색 이름만 쓴다. `#74A874` 같은 색 코드를 직접 쓰지 않는다.

| 용도 | 클래스 |
|---|---|
| 강조 (버튼 · 라벨 · 링크) | `emerald-700` · 누르면 `emerald-800` |
| 강조 배경 (선택된 메뉴 · 아이콘 칸) | `emerald-50` · 글자는 `emerald-900` |
| 제목 글자 | `slate-900` |
| 본문 글자 | `slate-600` |
| 보조 글자 (설명 · 날짜 외) | `slate-500` · 더 흐리게 `slate-400` |
| 선 · 카드 테두리 | `slate-200` |
| 페이지 바탕 | `slate-50` (구역을 번갈아 `white`) |
| 비활성 · 휴면 | 바탕 `slate-50` · 글자 `slate-400` · 배지 `slate-100`/`slate-500` |

## 3. 글자

| 단계 | 클래스 | 예 |
|---|---|---|
| 라벨 (영문 소문자 → 자동 대문자) | `text-xs font-bold uppercase tracking-[0.14em] text-emerald-700` | ABOUT · NEWS |
| 페이지·구역 제목 | `text-3xl sm:text-4xl font-bold tracking-tight text-slate-900` | 동아리 여백을 소개합니다 |
| 카드 제목 | `text-lg font-bold text-slate-900` | LAB 1 |
| 본문 | `text-sm leading-relaxed text-slate-600` (긴 글은 `text-base`) | 카드 설명 |

- `text-5xl` 이상은 쓰지 않는다 (예전 「About Yeobaek」 · 「여백의 역사」 크기 — v3 에서 뺌)
- `font-light` · `whitespace-nowrap` 은 쓰지 않는다 (휴대폰에서 글이 화면 밖으로 나감)

## 4. 배치

| 항목 | 값 |
|---|---|
| 내용 폭 | `mx-auto max-w-5xl` |
| 좌우 여백 | `px-5 sm:px-6` |
| 구역 위아래 | `py-20` · 구역 사이 `border-t border-slate-200` |
| 카드 묶음 | `grid gap-5` — 3열 `md:grid-cols-3` · 2열 `md:grid-cols-2` |

## 5. 카드 · 버튼

```
카드        rounded-2xl border border-slate-200 bg-white shadow-sm p-6
누르는 카드  + transition hover:-translate-y-1 hover:shadow-md
주 버튼     rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800
보조 버튼    rounded-full border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50
```

- 눌러서 넘어가는 건 `Link`(사이트 안) 또는 `a target="_blank"`(밖). `div onClick` 으로 만들지 않는다
- 「휴면」 등 못 누르는 카드는 링크를 빼고 위 2절 비활성 색으로

## 6. 홈 내용 고치기

`src/components/ServiceSections.jsx` 맨 위 배열만 고치면 된다.

| 배열 | 내용 |
|---|---|
| `NUMBERS` | 숫자 칸 4개 — **확인된 숫자만** |
| `SERVICES` | 서비스 카드 3개 (그림 · 제목 · 설명 · 링크) |
| `NEWS` | 소식 — **새 소식은 맨 위에 한 덩어리 추가**. `links` 는 없어도 됨 |

문의 밴드(메일 주소 · SNS 링크)는 `src/components/Contact.jsx` 맨 위 `CONTACT_EMAIL` · `LINKS`.
홈 순서는 v3 시안 그대로: 첫 화면 → 숫자 → 서비스 → 소식 → 문의.

## 7. 하지 말 것

- 페이지마다 다른 헤더 만들기 → `SiteHeader` 를 쓴다
- 「← Back to Home」 버튼 → 헤더 로고·「홈」 메뉴로 충분
- 그림에 글자를 넣고 그 위에 또 글자 얹기 (홈 배경은 그림 안에 배너가 있음)
- 확인 안 된 숫자 넣기 (예: 「부원 30+」) — 쓰려면 실제 수
- 동작하지 않는 폼 (보낼 곳 없는 문의 폼 등)

## 8. 계절·상황별 배경

홈 첫 화면의 배경 · 효과 · 음악 · 글자를 **`src/theme.json` 한 파일**로 바꾼다. GitHub 웹에서 연필 아이콘 → 고치고 → Commit 하면 1~2분 뒤 사이트에 반영된다.

### 어떤 테마가 나오나

1. 주소 끝에 `?theme=이름` → 그 테마 (**미리 보기용** — 예: `https://lis-yeobaek-web.vercel.app/?theme=halloween`)
2. `지정` 목록에 오늘 날짜가 들어가는 줄 → 그 테마
3. 없으면 `계절` 표 — 봄 3~5월 · 여름 6~8월 · 가을 9~11월 · 겨울 12~2월

### 축제·시험기간 등 기간 지정

`지정` 에 한 줄 추가. 날짜는 `YYYY-MM-DD`, 시작·끝 날 포함.

```json
"지정": [
  { "테마": "halloween", "시작": "2026-10-24", "끝": "2026-10-31" },
  { "테마": "festival",  "시작": "2026-05-20", "끝": "2026-05-22" }
]
```

### 새 테마 만들기

1. 그림을 `public/backend/image/` 에 올린다 (곰은 **왼쪽 아래**에 — PC 는 글자가 오른쪽 절반, 휴대폰은 위쪽에 얹힘)
2. `테마` 에 한 덩어리 추가

| 항목 | 값 |
|---|---|
| `배경` | 그림 주소 `/backend/image/파일이름.png` |
| `효과` | `sun`(햇빛) · `snow`(눈) · `없음` |
| `음악` | 파일 주소, 없으면 `""` — 비우면 헤더의 음악 버튼도 안 보임 |
| `글자` | `보임` · `숨김` (그림에 글자가 이미 있으면 숨김 — 예: 여름 Stay Cool) |
| `글자색` | `어둡게`(밝은 그림) · `밝게`(어두운 그림 — 예: 할로윈) |

- 없는 테마 이름을 적으면 그 줄은 건너뛰고 다음 순서(지정 → 계절 → 여름)로 간다 (사이트가 깨지지는 않음)
- 쉼표 하나 빠져도 빌드가 실패해 **반영이 안 된다** (운영 사이트는 이전 상태 유지). Vercel 에서 실패 메일이 오면 쉼표·따옴표부터 본다
