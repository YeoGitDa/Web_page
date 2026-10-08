import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader, PageHead } from './SiteHeader';

// LAB 카탈로그 — dormant: true 면 「휴면」 (홈 LAB 표시와 같은 기준)
const labPages = [
  { lab: 'LAB 1', title: 'AI 어시스턴트 & 챗봇', description: 'AI 기반 자동화 어시스턴트를 구동하고, 챗봇을 통해 자료 검색 기능을 제공합니다.', keywords: ['NLP', 'RAG', 'LLM'], link: '/chatbot' },
  { lab: 'LAB 2', title: '디지털 아카이빙 시스템', description: '동아리 내 문서, 기획서, 회의록 등 학술 자료를 체계적으로 저장하고 공유합니다.', keywords: ['Metadata', 'Search'], link: '/lab/2' },
  { lab: 'LAB 3', title: '큐레이션 & 추천 서비스', description: '문헌정보학 기반 개인 맞춤형 도서 추천과 동아리 구성원들의 산출물을 큐레이션합니다.', keywords: ['Recommendation'], link: '/lab/3' },
  { lab: 'LAB 4', title: '인프라 & DevOps', description: 'Git, CI/CD, Firebase 연동 및 배포 실습을 위한 서비스입니다.', keywords: ['Git', 'CI/CD'], link: '/lab/4' },
  { lab: 'LAB 5', title: '프로젝트 고도화', description: '데이터 활동 기반 앱/웹 프로젝트를 고도화합니다.', keywords: ['Performance', 'UX/UI'], dormant: true },
  { lab: 'LAB 6', title: '아이디어 랩', description: '아이디어를 기록하고 발굴하여 실현하는 서비스입니다.', keywords: ['Ideation', 'Innovation'], dormant: true },
];

const card = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';

const ExhibitionDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader suffix="Exhibition" />
      <PageHead eyebrow="EXHIBITION" title="동아리 산출물 전시" desc="여백 LAB 별 활동과 산출물을 모아 둔 카탈로그입니다." />

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
        {/* 표지 */}
        <section className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 px-6 py-12 text-center text-white shadow-md">
          <img src="/backend/image/logo.png" alt="" className="mx-auto h-12 w-auto" />
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Yeobaek Digital Archive</h2>
          <p className="mt-2 text-sm text-white/80">LAB 카탈로그</p>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {labPages.map((l) => {
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-bold tracking-[0.14em] ${l.dormant ? 'text-slate-400' : 'text-emerald-700'}`}>{l.lab}</p>
                  {l.dormant && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">휴면</span>}
                </div>
                <h3 className={`mt-2 text-lg font-bold ${l.dormant ? 'text-slate-400' : 'text-slate-900'}`}>{l.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${l.dormant ? 'text-slate-400' : 'text-slate-600'}`}>{l.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {l.keywords.map((kw) => (
                    <span key={kw} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-500">{kw}</span>
                  ))}
                </div>
              </>
            );
            return l.dormant ? (
              <div key={l.lab} className={`${card} bg-slate-50`} aria-disabled="true">{body}</div>
            ) : (
              <Link key={l.lab} to={l.link} className={`${card} block no-underline transition hover:-translate-y-1 hover:shadow-md`}>{body}</Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ExhibitionDetail;
