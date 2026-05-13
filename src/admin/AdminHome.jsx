import { Link } from 'react-router-dom';

export default function AdminHome() {
  return (
    <div className="space-y-12">
      <section className="text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">Yeobaek Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          운영 콘솔
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 sm:mx-0">
          공개 메인 사이트와 모집·인력 데이터를 운영진 관점에서 다룹니다. 지원·등록 폼은{' '}
          <strong className="font-medium text-slate-800">모집</strong> 메뉴에서 진행합니다.
        </p>
      </section>

      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          to="/admin/dashboard"
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-slate-400 hover:shadow-md"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Dashboard</span>
          <h2 className="mt-2 text-xl font-bold text-slate-900">관리자 대시보드</h2>
          <p className="mt-2 flex-1 text-sm text-slate-600">
            인력풀·기회·통계·매칭 요약을 확인합니다.
          </p>
          <span className="mt-4 text-sm font-semibold text-slate-800 group-hover:underline">열기 →</span>
        </Link>

        <Link
          to="/recruit"
          className="group flex flex-col rounded-2xl border border-emerald-100 bg-emerald-50/40 p-7 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">Recruit</span>
          <h2 className="mt-2 text-xl font-bold text-slate-900">모집 · 공개 페이지</h2>
          <p className="mt-2 flex-1 text-sm text-slate-600">
            부원 지원, 인력풀, 기회 탐색, 매칭 화면으로 이동합니다.
          </p>
          <span className="mt-4 text-sm font-semibold text-emerald-800 group-hover:underline">모집 홈으로 →</span>
        </Link>

        <Link
          to="/recruit/opportunities"
          className="group flex flex-col rounded-2xl border border-amber-100 bg-amber-50/30 p-7 shadow-sm transition hover:border-amber-300 hover:shadow-md"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-amber-800">Opportunities</span>
          <h2 className="mt-2 text-xl font-bold text-slate-900">기회 탐색 (공개)</h2>
          <p className="mt-2 flex-1 text-sm text-slate-600">등록된 대외 기회 목록입니다.</p>
          <span className="mt-4 text-sm font-semibold text-amber-900 group-hover:underline">이동 →</span>
        </Link>

        <Link
          to="/recruit/match"
          className="group flex flex-col rounded-2xl border border-violet-100 bg-violet-50/30 p-7 shadow-sm transition hover:border-violet-300 hover:shadow-md"
        >
          <span className="text-xs font-bold uppercase tracking-wide text-violet-800">Matching</span>
          <h2 className="mt-2 text-xl font-bold text-slate-900">매칭 (공개)</h2>
          <p className="mt-2 flex-1 text-sm text-slate-600">태그 기반 매칭 결과 화면입니다.</p>
          <span className="mt-4 text-sm font-semibold text-violet-900 group-hover:underline">이동 →</span>
        </Link>
      </div>
    </div>
  );
}
