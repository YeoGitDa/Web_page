import { SiteHeader, PageHead } from './SiteHeader';

// 아카이빙이 할 일 4단계 (LAB 2 기능 목록 기준)
const STEPS = ['수집', '메타데이터', '검색', '공유'];

const ArchivingDetail = () => (
  <div className="min-h-screen bg-slate-50">
    <SiteHeader suffix="Archiving" />
    <PageHead eyebrow="ARCHIVING" title="디지털 아카이빙" desc="여백과 전공 동아리의 활동 기록을 모으는 곳입니다. 지금은 준비 중이에요." />

    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
      <ol className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s} className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-900">
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <img src="/backend/image/wait.png" alt="Coming Soon — 잠시 수리중" className="mx-auto w-full max-w-sm" />
        <p className="mt-6 text-sm text-slate-500">궁금한 점은 메일로 알려 주세요.</p>
        <a
          href="mailto:lisyeobaek@gmail.com?subject=%5B%EC%97%AC%EB%B0%B1%20%EC%95%84%EC%B9%B4%EC%9D%B4%EB%B9%99%5D%20%EB%AC%B8%EC%9D%98"
          className="mt-3 inline-block rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-emerald-800"
        >
          문의 메일
        </a>
      </section>
    </main>
  </div>
);

export default ArchivingDetail;
