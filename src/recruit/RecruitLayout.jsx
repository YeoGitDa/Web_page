import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SiteHeader, SiteFooter } from '../components/SiteHeader';

const titles = {
  '/recruit': '모집 · 여백 Yeobaek',
  '/recruit/member': '부원 지원 · 여백 Yeobaek',
  '/recruit/talent-pool': '인력풀 등록 · 여백 Yeobaek',
};

export default function RecruitLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] || titles['/recruit'];
    return () => { document.title = 'main-page'; };
  }, [pathname]);

  const navLink = (to, label) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium no-underline transition ${
          active
            ? 'bg-yb-leaf-12 text-yb-forest'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 사이트 공용 헤더 + 모집 안 메뉴 (Design 02-components: 모든 페이지 같은 헤더) */}
      <SiteHeader suffix="Recruit" />
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 py-2 sm:gap-2 sm:px-6">
          {navLink('/recruit', '모집 홈')}
          {navLink('/recruit/member', '부원 지원')}
          {navLink('/recruit/talent-pool', '인력풀')}
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>

      <p className="mx-auto max-w-lg px-4 pb-10 text-center text-xs text-slate-400">
        제출 정보는 모집/연락 목적으로만 사용됩니다. 문의는 운영진 채널(카카오톡/이메일)을 이용해 주세요.
      </p>
      <SiteFooter />
    </div>
  );
}
