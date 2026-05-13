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
    const base = titles[pathname] ?? titles['/recruit'];
    document.title = base;
    return () => {
      document.title = 'main-page';
    };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/recruit" className="flex items-center gap-2 font-semibold text-emerald-800">
            <img src="/backend/image/logo.png" alt="" className="h-7 w-auto" />
            <span className="tracking-tight">Yeobaek 채용·협력</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm font-medium text-slate-600 sm:gap-3">
            <Link to="/" className="rounded-md px-2 py-1 hover:bg-slate-100 hover:text-slate-900">
              메인 사이트
            </Link>
            <Link
              to="/recruit"
              className={`rounded-md px-2 py-1 hover:bg-slate-100 ${pathname === '/recruit' ? 'bg-emerald-50 text-emerald-900' : ''}`}
            >
              모집 홈
            </Link>
            <Link
              to="/recruit/member"
              className={`rounded-md px-2 py-1 hover:bg-slate-100 ${pathname === '/recruit/member' ? 'bg-emerald-50 text-emerald-900' : ''}`}
            >
              부원 지원
            </Link>
            <Link
              to="/recruit/talent-pool"
              className={`rounded-md px-2 py-1 hover:bg-slate-100 ${pathname === '/recruit/talent-pool' ? 'bg-emerald-50 text-emerald-900' : ''}`}
            >
              인력풀
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p className="mx-auto max-w-lg px-4">
          제출 정보는 모집·연락 목적으로만 사용됩니다. 문의는 운영진 채널(카카오톡·이메일 등)을 이용해 주세요.
        </p>
      </footer>
    </div>
  );
}
