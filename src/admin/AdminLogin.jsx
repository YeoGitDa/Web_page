import { useLayoutEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAdminSession, safeInternalPath } from '../auth/session';

/**
 * `/admin/login` → 공용 `/login?next=…` 로 통합 (북마크·링크 호환).
 * `<Navigate />` 만 쓰면 같은 `/login`으로 돌아올 때 화면 변화가 없어 "반응 없음"처럼 보일 수 있어
 * `navigate` + 짧은 안내 문구를 둡니다.
 */
export default function AdminLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    const qNext = sp.get('next');
    const rawFrom = location.state?.from;
    const candidate =
      typeof qNext === 'string' && qNext.startsWith('/') ? qNext : rawFrom;
    if (
      typeof candidate === 'string' &&
      candidate.startsWith('/') &&
      !candidate.startsWith('/admin/login')
    ) {
      return safeInternalPath(candidate, '/admin');
    }
    return '/admin';
  }, [location.search, location.state?.from]);

  useLayoutEffect(() => {
    if (isAdminSession()) {
      navigate(from, { replace: true });
      return;
    }
    navigate(`/login?next=${encodeURIComponent(from)}`, { replace: true });
  }, [navigate, from]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 bg-slate-50 px-4 text-center text-sm text-slate-600">
      <p className="font-medium text-slate-800">로그인 화면으로 연결 중입니다.</p>
      <p className="max-w-md text-xs text-slate-500">
        잠시만 기다려 주세요. 자동으로 이동하지 않으면{' '}
        <a href={`/login?next=${encodeURIComponent(from)}`} className="text-emerald-700 underline">
          여기
        </a>
        를 눌러 주세요.
      </p>
    </div>
  );
}
