import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clearAdminSession } from '../auth/session';
import { SiteHeader, SiteFooter } from '../components/SiteHeader';

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

  const onLogout = () => {
    clearAdminSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 사이트 공용 헤더 + 운영 메뉴 줄 (모집 RecruitLayout 과 같은 틀) */}
      <SiteHeader suffix="운영" />
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-5 py-2 sm:gap-2 sm:px-6">
          {navLink('/admin', '운영 홈')}
          {navLink('/admin/dashboard', '대시보드')}
          {navLink('/recruit', '모집')}
          <button
            type="button"
            onClick={onLogout}
            className="ml-auto shrink-0 rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            로그아웃
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      <p className="px-4 pb-10 text-center text-xs text-slate-400">
        운영자 전용 영역입니다. 세션은 이 브라우저에만 저장됩니다.
      </p>
      <SiteFooter />
    </div>
  );
}
