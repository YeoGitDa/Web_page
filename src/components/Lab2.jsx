import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SiteHeader, PageHead } from './SiteHeader';

// 왼쪽 목록 — dormant: true 면 「휴면」 (홈·전시와 같은 기준)
const LABS = [
  { no: '1', name: 'AI 어시스턴트 & 챗봇' },
  { no: '2', name: '디지털 아카이빙' },
  { no: '3', name: '큐레이션 & 추천' },
  { no: '4', name: '인프라 & DevOps' },
  { no: '5', name: '프로젝트 고도화', dormant: true },
  { no: '6', name: '아이디어 랩', dormant: true },
];

// 상세 내용이 있는 LAB — 내용이 생기면 같은 모양으로 추가
const labData = {
  2: {
    title: 'LAB 2 — 디지털 아카이빙',
    subtitle: 'yeobaek 및 전공 동아리들의 활동 산출물과 문서들을 체계적으로 아카이빙',
    info: {
      이름: 'yeobaek 디지털 아카이빙 시스템',
      기간: '2025/03/01 ~ 진행중',
      주체: '문헌정보학과 동아리 여백',
      성격: '학술 아카이브',
      기술스택: 'SQL',
      서비스: 'DB, Data, 기록관리',
    },
    description: `yeobaek 동아리의 프로젝트 결과물, 활동 기록을 보존하고 여러 사람과 공유하기 위한 디지털 아카이빙 시스템입니다.
문서, 기획서, 프로젝트 결과물 등 다양한 형태의 자료를 수집하고 정리하여, 동아리 구성원들이 쉽게 검색하고 활용할 수 있도록 합니다.`,
    features: ['체계적인 메타데이터 관리', '정확한 검색 및 필터링 기능', '카테고리별 분류 및 태깅', '시간순 타임라인 뷰'],
    goals: ['동아리 활동 기록의 체계적 보존', '지식과 경험의 세대 간 전승', '학술 자료의 효율적 공유', '협업 문화 활성화'],
  },
};

const card = 'rounded-2xl border border-slate-200 bg-white shadow-sm';

const LabDetail = () => {
  const { labNumber } = useParams();
  const lab = labData[labNumber];
  const meta = LABS.find((l) => l.no === labNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [labNumber]);

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader suffix={labNumber ? `Lab ${labNumber}` : 'Lab'} />
      <PageHead eyebrow="LAB" title="LAB 상세" desc="여백 LAB 별 목표와 진행 상황입니다." />

      <main className="mx-auto grid max-w-5xl gap-6 px-5 py-12 sm:px-6 md:grid-cols-[13rem_1fr]">
        {/* 왼쪽 목록 */}
        <nav className={`${card} h-fit p-3`} aria-label="LAB 목록">
          <p className="px-2 pb-2 pt-1 text-xs font-semibold text-slate-400">탐색</p>
          {LABS.map((l) => {
            const active = l.no === labNumber;
            return (
              <Link
                key={l.no}
                to={`/lab/${l.no}`}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm no-underline transition ${
                  active ? 'bg-emerald-50 font-semibold text-emerald-900' : l.dormant ? 'text-slate-400 hover:bg-slate-50' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                LAB {l.no}
                {l.dormant && <span className="text-[11px] text-slate-400">휴면</span>}
              </Link>
            );
          })}
        </nav>

        {/* 오른쪽 상세 */}
        {lab ? (
          <article className={`${card} p-6 sm:p-8`}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{lab.title}</h2>
            <p className="mt-2 text-base text-slate-500">{lab.subtitle}</p>

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {Object.entries(lab.info).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold text-slate-500">{k}</dt>
                  <dd className="m-0 mt-1 text-sm text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-8 text-lg font-bold text-slate-900">프로젝트 소개</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{lab.description}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">기능</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
                  {lab.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">목표</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
                  {lab.goals.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
              이 LAB 에 관심 있으신가요? →{' '}
              <a href="mailto:lisyeobaek@gmail.com" className="font-semibold text-emerald-800">lisyeobaek@gmail.com</a>
            </div>
          </article>
        ) : (
          <article className={`${card} flex flex-col items-center justify-center border-dashed p-10 text-center`}>
            <p className="text-xs font-bold tracking-[0.14em] text-emerald-700">LAB {labNumber}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{meta ? meta.name : '없는 LAB 입니다'}</h2>
            <p className="mt-3 text-sm text-slate-500">
              {meta?.dormant ? '지금은 쉬고 있는 LAB 입니다.' : meta ? '상세 내용을 준비하고 있어요.' : '왼쪽 목록에서 LAB 을 골라 주세요.'}
            </p>
          </article>
        )}
      </main>
    </div>
  );
};

export default LabDetail;
