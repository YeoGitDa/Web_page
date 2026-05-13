import { Link, useNavigate } from 'react-router-dom';
import { clearUserSession } from '../auth/session';

export default function MeHome() {
  const navigate = useNavigate();

  const onLogout = () => {
    clearUserSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">내 계정</h1>
      <p className="mt-2 text-sm text-slate-600">
        일반 회원 영역입니다. 프로필·알림 등은 추후 연결됩니다.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          메인으로
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
