import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clearAdminSession } from '../auth/session';

const titles = {
  '/admin': '운영 · Yeobaek',
  '/admin/dashboard': '대시보드 · Yeobaek',
};

export default function AdminShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = titles[pathname] || titles['/admin'];
    return () => {
      document.title = 'main-page';
    };
  }, [pathname]);

  const navLink = (to, label) => {
    const active = pathname === to || (to !== '/admin' && pathname.startsWith(to));
    return (
      <Link
        to={to}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
          active
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }`}
      >
        {label}
      </Link>
    );
  };

  const onLogout = () => {
    clearAdminSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6">
          <Link to="/admin" className="flex items-center gap-2.5">
            <img src="/backend/image/logo.png" alt="" className="h-7 w-auto" />
            <span className="text-lg font-bold tracking-tight text-slate-900">
              YEOBAEK<span className="ml-1.5 text-sm font-normal text-slate-500">| 운영</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <Link
              to="/"
              className="mr-1 rounded-md px-3 py-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-700"
            >
              메인 사이트
            </Link>
            {navLink('/admin', '운영 홈')}
            {navLink('/admin/dashboard', '대시보드')}
            <Link
              to="/recruit"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              모집
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              로그아웃
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <p className="text-center text-xs text-slate-400">
          운영자 전용 영역입니다. 세션은 이 브라우저에만 저장됩니다.
          <span className="mt-1 block text-slate-300">&copy; 2026 YEOBAEK Academic Club</span>
        </p>
      </footer>
    </div>
  );
}
