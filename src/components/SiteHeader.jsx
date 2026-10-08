import { Link, useLocation } from 'react-router-dom';
import { isUserSession } from '../auth/session';

/**
 * 사이트 공용 헤더 — v3 시안(.v3-head)과 모집(RecruitLayout) 헤더와 같은 모양
 * suffix: 로고 옆 「YEOBAEK | {suffix}」
 * right: 헤더 오른쪽 끝에 붙일 것 (예: 홈의 배경음 버튼)
 */
const NAV = [
  { to: '/', label: '홈', match: (p) => p === '/' },
  { to: '/#service', label: '서비스', match: (p) => ['/chatbot', '/archiving', '/exhibition'].includes(p) || p.startsWith('/lab/') },
  { to: '/about', label: '소개', match: (p) => p === '/about' },
  { to: '/recruit', label: '모집', match: (p) => p.startsWith('/recruit') },
];

export function SiteHeader({ suffix = 'Web', right = null }) {
  const { pathname } = useLocation();
  const loggedIn = isUserSession();
  const account = loggedIn
    ? { to: '/me', label: '내 계정', match: (p) => p === '/me' }
    : { to: '/login', label: '로그인', match: (p) => p === '/login' || p === '/signup' };

  const pill = ({ to, label, match }) => {
    const active = match(pathname);
    const cls = `rounded-md px-3 py-1.5 text-sm font-medium no-underline transition ${
      active ? 'bg-emerald-50 text-emerald-900' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`;
    // 「/#service」 는 홈 안의 위치라 a 로 이동한다 (Link 는 해시 스크롤을 안 함)
    return to.includes('#') ? (
      <a key={to} href={to} className={cls}>{label}</a>
    ) : (
      <Link key={to} to={to} className={cls}>{label}</Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          {/* logo.png 는 흰색(어두운 헤더용) → 흰 헤더에서는 뒤집어 검게 */}
          <img src="/backend/image/logo.png" alt="" className="h-7 w-auto invert" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            YEOBAEK<span className="ml-1.5 text-sm font-normal text-slate-400">| {suffix}</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {NAV.map(pill)}
          {pill(account)}
          {right}
        </nav>
      </div>
    </header>
  );
}

/** 하위 페이지 머리 — 작은 영문 라벨 · 한글 제목 · 한 줄 설명 (v3 .v3-pagehead) */
export function PageHead({ eyebrow, title, desc }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        {desc && <p className="mt-3 text-base text-slate-500">{desc}</p>}
      </div>
    </section>
  );
}

/** 섹션 머리 — 페이지 안의 각 구역 제목 (v3 .v3-section-head) */
export function SectionHead({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-base text-slate-500">{desc}</p>}
    </div>
  );
}
