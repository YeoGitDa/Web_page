import { Link, useNavigate } from 'react-router-dom';
import { clearUserSession, getUserId } from '../auth/session';
import { SiteHeader } from '../components/SiteHeader';

const card = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';

export default function MeHome() {
  const navigate = useNavigate();
  const userId = getUserId();

  const onLogout = () => {
    clearUserSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader suffix="Me" />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
              {(userId[0] || 'U').toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">내 계정</h1>
              <p className="mt-1 text-sm text-slate-500">{userId ? `${userId} 으로 로그인됨` : '일반 회원'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 no-underline hover:bg-slate-50">
              메인으로
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border-none bg-slate-900 px-4 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-slate-800"
            >
              로그아웃
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-5xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2">
        <div className={`${card} md:col-span-2`}>
          <h2 className="text-lg font-bold text-slate-900">알림</h2>
          <p className="mt-2 text-sm text-slate-500">프로필·알림 설정은 추후 연결됩니다.</p>
        </div>
        <div className={card}>
          <h2 className="text-lg font-bold text-slate-900">최근 활동</h2>
          <p className="mt-2 text-sm text-slate-500">표시할 항목이 없습니다.</p>
        </div>
        <div className={card}>
          <h2 className="text-lg font-bold text-slate-900">바로가기</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[['/recruit', '모집'], ['/chatbot', '챗봇'], ['/exhibition', '산출물 전시']].map(([to, label]) => (
              <Link key={to} to={to} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 no-underline hover:bg-emerald-100">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
