import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

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
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
          active
            ? 'bg-emerald-50 text-emerald-900'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-6">
          <Link to="/recruit" className="flex items-center gap-2.5">
            <img src="/backend/image/logo.png" alt="" className="h-7 w-auto" />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              YEOBAEK<span className="ml-1.5 text-sm font-normal text-slate-400">| Recruit</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className="mr-2 rounded-md px-3 py-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-700"
            >
              메인 사이트
            </Link>
            {navLink('/recruit', '모집 홈')}
            {navLink('/recruit/member', '부원 지원')}
            {navLink('/recruit/talent-pool', '인력풀')}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <p className="mx-auto max-w-lg px-4 text-center text-xs text-slate-400">
          제출 정보는 모집/연락 목적으로만 사용됩니다. 문의는 운영진 채널(카카오톡/이메일)을 이용해 주세요.
          <br />
          <span className="mt-1 inline-block text-slate-300">&copy; 2026 YEOBAEK Academic Club</span>
        </p>
      </footer>
    </div>
  );
}
