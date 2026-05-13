import { Link } from 'react-router-dom';

export default function RecruitHome() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 text-center sm:text-left">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">상시 모집</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          여백과 함께할 사람을 찾습니다
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:mx-0">
          인천대 문헌정보학과 기반 실험 동아리 <strong className="font-semibold text-slate-800">여백(Yeobaek)</strong>입니다.
          동아리 <strong className="font-semibold text-slate-800">부원</strong>과, 대외활동·프로젝트 연계를 위한{' '}
          <strong className="font-semibold text-slate-800">인력풀</strong>은 별도의 절차입니다. 해당하는 쪽만 지원해 주세요.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          to="/recruit/member"
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Club member</span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">동아리 부원 지원</h2>
          <p className="mt-3 flex-1 text-slate-600">
            정규 부원으로 LAB 활동·정기 모임·온보딩에 참여합니다. 지원 동기와 학습 방향을 중심으로 검토합니다.
          </p>
          <span className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-800 group-hover:underline">
            지원서 작성 →
          </span>
        </Link>

        <Link
          to="/recruit/talent-pool"
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-sky-300 hover:shadow-md"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">Talent pool</span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">인력풀 등록</h2>
          <p className="mt-3 flex-1 text-slate-600">
            공모전·해커톤·동아리 프로젝트 등에 필요할 때 연락드릴 수 있도록 역량과 가능 시간을 남겨 주세요. 부원 지원과는 별개입니다.
          </p>
          <span className="mt-6 inline-flex items-center text-sm font-semibold text-sky-800 group-hover:underline">
            등록 폼 작성 →
          </span>
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-slate-100/60 p-6 text-sm text-slate-600">
        <h3 className="mb-2 font-semibold text-slate-800">제출 안내</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>배포 환경에 수집 URL이 연결되어 있으면 자동 전송됩니다.</li>
          <li>연결 전이라면 제출 후 JSON 파일이 저장되며, 운영진에게 전달해 주시면 됩니다.</li>
        </ul>
      </section>
    </div>
  );
}
