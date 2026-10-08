import { SiteHeader, PageHead, SectionHead } from './SiteHeader';

// 연혁 — 새 해는 아래에 추가
const HISTORY = [
  { year: '2022', text: 'DB 프로그래밍 소모임 창설 "0과 1사이의 여백을 채우다"라는 의미' },
  { year: '2023', text: 'Python 기반 시각화, 데이터 분석 심화' },
  { year: '2025', text: '데이터 기반 서비스 기획, LLM활용 마이크로 서비스 개발' },
];

// 운영진 — v3 시안대로 이름 · 역할만 보인다 (메일은 화면에 안 냄)
const TEAM = [
  { name: '김미승', role: ['LAB 2'], image: '/backend/image/duzzonku.png' },
  { name: '김서희', role: ['LAB 2'], image: '/backend/image/duzzonku.png' },
  { name: '김명주', role: ['운영 지원', '기획 지원'], image: '/backend/image/mj_logo.png' },
  { name: '김찬슬', role: ['디자인'], image: '/backend/image/duzzonku.png' },
  { name: '박다정', role: ['운영', 'LAB 2'], image: '/backend/image/duzzonku.png' },
  { name: '방규리', role: ['운영', '기획', 'LAB 1', 'LAB 3', 'Frontend'], image: '/backend/image/yuja.png' },
  { name: '양승빈', role: ['회장', 'Backend', '운영'], image: '/backend/image/duzzonku.png' },
  { name: 'Coming Soon', role: ['여백의 신입부원 당신을 기다립니다'], image: '/backend/image/duzzonku.png' },
];

const card = 'rounded-2xl border border-slate-200 bg-white shadow-sm';

const About = () => (
  <div className="min-h-screen bg-slate-50">
    <SiteHeader suffix="About" />
    <PageHead eyebrow="ABOUT" title="동아리 여백을 소개합니다" desc="문헌정보학을 기반으로 학과의 소통과 정보 공유를 위해 만들어진 동아리입니다." />

    {/* 연혁 — 가운데 선 + 좌우 번갈아 카드 */}
    <section className="px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow="History" title="연혁" desc="여백의 시작부터 현재까지" />
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-emerald-300 md:block" aria-hidden="true" />
          <ol className="relative m-0 list-none space-y-6 p-0 md:space-y-0">
          {HISTORY.map((h, i) => (
            <li key={h.year} className={`md:flex ${i % 2 ? 'md:justify-end' : 'md:justify-start'} md:py-4`}>
              <div className={`${card} p-5 md:w-[calc(50%-1.5rem)]`}>
                <p className="text-xl font-bold text-emerald-800">{h.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{h.text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>

    {/* 운영진 */}
    <section className="border-t border-slate-200 bg-white px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Team" title="운영진" desc="여백의 기획, 운영, 개발을 담당하는 구성원들" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className={`${card} flex flex-col items-center p-5 text-center`}>
              <img src={m.image} alt="" className="h-20 w-20 rounded-full object-cover ring-4 ring-emerald-50" />
              <h3 className="mt-3 text-base font-bold text-slate-900">{m.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.role.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 이야기 */}
    <section className="border-t border-slate-200 px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Story" title="Our Story" />
        <div className={`${card} space-y-4 p-6 text-base leading-relaxed text-slate-600`}>
          <p className="m-0">여백은 2022년 "0과 1사이의 여백을 채우다"라는 의미로 시작된 DB 프로그래밍 소모임입니다.</p>
          <p className="m-0">문헌정보학을 기반으로 데이터베이스 설계부터 웹 서비스 개발까지, 학과의 소통과 정보 공유를 위한 다양한 프로젝트를 진행하고 있습니다.</p>
          <p className="m-0">AI 기반 챗봇, 디지털 아카이빙, 큐레이션 서비스 등을 통해 문헌정보학과 학생들의 학습과 성장을 돕고 있습니다.</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-700 px-6 py-5 text-white">
          <p className="m-0 font-semibold">여백과 함께 성장해 보세요!</p>
          <div className="flex gap-2">
            <a href="/recruit" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800 no-underline hover:bg-emerald-50">모집 보기</a>
            <a href="mailto:lisyeobaek@gmail.com" className="rounded-full border border-white px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-white/10">문의하기</a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
