import { Link } from 'react-router-dom';

export default function RecruitHome() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Always Open
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Fill the Margin with{' '}
          <span className="text-emerald-700">Intelligence.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
          정보의 여백을 기술로 채우는 곳.
          <br />
          문헌정보학의 체계와 데이터 공학의 효율이 만나는 지점을 탐구합니다.
        </p>
      </section>

      {/* About 요약 */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { title: 'LIS + AI', desc: '문헌정보학 기반 융합 실험 동아리' },
          { title: 'HUB-LAB 구조', desc: '독립 실험실에서 결과물을 통합 플랫폼으로' },
          { title: '상시 모집', desc: '부원과 인력풀을 분리하여 언제든 지원 가능' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 모집 카드 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 부원 지원 */}
        <Link
          to="/recruit/member"
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
        >
          <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Club Member
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">동아리 부원 지원</h2>
          <p className="mt-3 flex-1 text-slate-600">
            정규 부원으로 LAB 활동, 정기 모임, 온보딩에 참여합니다.
            지원 동기와 학습 방향을 중심으로 검토합니다.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-800 transition group-hover:gap-3">
            지원서 작성
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </div>
        </Link>

        {/* 인력풀 */}
        <Link
          to="/recruit/talent-pool"
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-sky-300 hover:shadow-lg"
        >
          <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
            Talent Pool
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">인력풀 등록</h2>
          <p className="mt-3 flex-1 text-slate-600">
            공모전, 해커톤, 학술대회 등에 필요할 때 연락드릴 수 있도록
            역량과 가용 시간을 남겨 주세요. 부원 지원과는 별개입니다.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-sky-800 transition group-hover:gap-3">
            등록 폼 작성
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </div>
        </Link>
      </div>

      {/* 기회 탐색 */}
      <Link
        to="/recruit/opportunities"
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-amber-50/40 p-8 shadow-sm transition hover:border-amber-300 hover:shadow-lg"
      >
        <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition group-hover:bg-amber-600 group-hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Opportunities
        </span>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">기회 탐색</h2>
        <p className="mt-3 flex-1 text-slate-600">
          공모전, 해커톤, 학술대회, 교육 등 외부 기회를 확인하세요.
          인력풀 프로필에 맞는 기회를 매칭해 드립니다.
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-800 transition group-hover:gap-3">
          기회 둘러보기
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </div>
      </Link>


      {/* AI 매칭 */}
      <Link
        to="/recruit/match"
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-violet-50/40 p-8 shadow-sm transition hover:border-violet-300 hover:shadow-lg"
      >
        <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-violet-700">
          Matching
        </span>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">매칭 결과</h2>
        <p className="mt-3 flex-1 text-slate-600">
          인력풀 프로필과 등록된 기회를 태그 기반으로 매칭합니다.
          도메인, 기술스택, 역할, 가용성을 종합 평가합니다.
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-800 transition group-hover:gap-3">
          매칭 확인하기
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </div>
      </Link>

      {/* 활동 키워드 */}
      <section className="text-center">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
          What We Do
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            'Web/Server', 'Chat-Bot', 'RAG', 'Archive',
            'AI Curator', 'Kaggle/Dacon', 'Prompt Engineering',
            'CI/CD', 'Metadata', 'Recommender System',
          ].map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* 관리자 */}
      <div className="text-center">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          관리자 대시보드
        </Link>
      </div>

      {/* 제출 안내 */}
      <section className="rounded-2xl border border-slate-200 bg-slate-100/60 p-6 text-sm text-slate-600">
        <h3 className="mb-2 font-semibold text-slate-800">제출 안내</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>수집 서버가 연결되어 있으면 제출 즉시 자동 전송됩니다.</li>
          <li>연결 전이라면 JSON 파일이 다운로드되며, 운영진에게 전달해 주시면 됩니다.</li>
          <li>수집된 데이터는 향후 AI 기반 팀 매칭/프로젝트 추천에 활용될 수 있습니다.</li>
        </ul>
      </section>
    </div>
  );
}
