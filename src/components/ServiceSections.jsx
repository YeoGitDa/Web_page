import { Link } from 'react-router-dom';
import { SectionHead } from './SiteHeader';

/*
 * 홈 아래 섹션 — 내용은 맨 위 배열들만 고치면 된다 (개발 몰라도 됨)
 * 모양은 v3 시안 기준: 작은 영문 라벨 · 제목 · 설명 + 카드
 */

const SERVICES = [
  {
    image: '/backend/image/chatbot_image.jpg',
    title: "챗봇 · 여불이",
    description: '챗봇을 통해 질문하고, 원하는 정보를 찾을 수 있어요',
    link: '/chatbot',
  },
  {
    image: '/backend/image/digitalA.png',
    title: '디지털 아카이빙',
    description: 'yeobaek 및 전공 동아리들의 활동 산출물과 문서들을 체계적으로 아카이빙하고, 검색 및 활용을 위한 서비스!',
    link: '/archiving',
  },
  {
    image: '/backend/image/digicu.png',
    title: '동아리 산출물 전시',
    description: '개인 맞춤형 정보자료 추천 및 yeobaek 의 산출물 전시 기능!',
    link: '/exhibition',
  },
];

// 소식 — 새 소식은 맨 위에 한 덩어리 추가. links 는 없어도 됨
const NEWS = [
  {
    date: 'Since 2022. 03 ~',
    title: '2026-1학기 신입회원 모집',
    description: '여백에서 신입회원을 모집합니다! DB, Data Science, AI 등 다양한 분야의 프로젝트와 스터디에 참여하세요.',
    links: [
      { label: '자세히 보기', href: 'https://cls.inu.ac.kr/cls/2448/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGY2xzJTJGMzE5JTJGNDE3Mzk5JTJGYXJ0Y2xWaWV3LmRvJTNGcGFnZSUzRDIlMjZzcmNoQ29sdW1uJTNEJTI2c3JjaFdyZCUzRCUyNmJic0NsU2VxJTNEJTI2YmJzT3BlbldyZFNlcSUzRCUyNnJnc0JnbmRlU3RyJTNEJTI2cmdzRW5kZGVTdHIlM0QlMjZpc1ZpZXdNaW5lJTNEZmFsc2UlMjZwYXNzd29yZCUzRCUyNg%3D%3D' },
      { label: '가입 신청', href: 'https://forms.gle/1Jrf5Q6kf3hjoUDy8' },
    ],
  },
];

// LAB — dormant: true 면 「휴면」 표시 · 흐리게 · 눌러도 안 넘어감
const LABS = [
  { name: 'LAB 1', icon: '/backend/image/AI.png', link: '/chatbot', description: 'AI기반 자동화 어시스턴트를 구동하고 챗봇을 통해 자료 검색 기능을 제공하는 서비스입니다.' },
  { name: 'LAB 2', icon: '/backend/image/Archive.png', link: '/lab/2', description: '동아리 내 문서/기획서 등 학술 자료의 체계적인 저장, 공유하는 기능을 제공하는 서비스입니다.' },
  { name: 'LAB 3', icon: '/backend/image/Curation.png', link: '/exhibition', description: '문헌정보학 기반 개인 맞춤형 도서 추천과 동아리 구성원들의 산출물을 큐레이션 하는 서비스입니다.' },
  { name: 'LAB 4', icon: '/backend/image/Infra.png', link: '/lab/4', description: 'Git, CI/CD, Firebase 연동 및 배포 실습을 위한 서비스입니다.' },
  { name: 'LAB 5', icon: '/backend/image/Compition.png', link: '/lab/5', dormant: true, description: '데이활동 기반 앱/웹 프로젝트 고도화하는 서비스입니다.' },
  { name: 'LAB 6', icon: '/backend/image/Idea.png', link: '/lab/6', dormant: true, description: '아이디어 기록, 발굴 및 실화하는 서비스입니다.' },
];

const VALUES = [
  { title: '밤티 NO!', description: '데이터 기반으로 사용자의 불편함을 정확하게 파악하고, 이를 해결할 수 있는 서비스를 기획합니다.' },
  { title: '내손내만 서비스', description: '내가 원하는 서비스는 직접 기획, 개발, 배포하며 활용하고 고도화 시킵니다. 언제든지 사용 가능하게 공개하여 사용자 피드백을 통해 서비스를 개선합니다.' },
  { title: '팀 프로젝트 경험', description: '문헌정보학과 내 여러 동아리와 협업해 기술과 경험를 공유하고, 협업 경험을 쌓아갑니다.' },
  { title: '통합 개발 경험', description: '기획부터 개발, 큐레이션과 고도화 기능까지 제공하며 all in one 의 완전한 서비스를 제공합니다.' },
];

const card = 'rounded-2xl border border-slate-200 bg-white shadow-sm';

const ServiceSections = () => (
  <div className="bg-slate-50">
    {/* 서비스 */}
    <section className="px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="Services"
          title="Yeobaek Web은요.."
          desc="문헌정보학을 기반으로 학과의 소통과 정보 공유, 전공 동아리 활성화를 위해 만들어졌어요"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.link} to={s.link} className={`${card} group flex flex-col overflow-hidden no-underline transition hover:-translate-y-1 hover:shadow-md`}>
              <div className="h-44 overflow-hidden border-b border-slate-100 bg-white">
                <img src={s.image} alt="" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <span className="mt-4 text-sm font-semibold text-emerald-700">둘러보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* 소식 & 공지 */}
    <section className="border-t border-slate-200 bg-white px-5 py-20 sm:px-6" id="club-news">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[16rem_1fr]">
        <div>
          <SectionHead eyebrow="News" title="동아리 소식 & 공지" desc="여백의 최신 소식과 공지사항을 확인하세요" />
          <div className="flex items-center gap-3">
            <img src="/backend/image/YB_logo.png" alt="여백" className="h-12 w-auto" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            문헌정보학과 대표 전공동아리 · 박종도 교수님 산하 정보학 기반 동아리 · DB, Data Science, AI
          </p>
        </div>
        <ul className="m-0 list-none divide-y divide-slate-200 border-y border-slate-200 p-0">
          {NEWS.map((n) => (
            <li key={n.title} className="py-6">
              <p className="text-sm font-semibold text-emerald-700">{n.date}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{n.title}</h3>
              {n.description && <p className="mt-2 text-sm leading-relaxed text-slate-600">{n.description}</p>}
              {n.links?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {n.links.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full px-4 py-2 text-sm font-semibold no-underline transition ${
                        i === 0 ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'border border-emerald-700 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* LAB */}
    <section className="border-t border-slate-200 px-5 py-20 sm:px-6" id="service-info">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="LAB" title="LAB Info" desc="yeobaek 의 LAB에 대한 정보" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LABS.map((lab) => {
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${lab.dormant ? 'bg-slate-100' : 'bg-emerald-50'}`}>
                    <img src={lab.icon} alt="" className={`h-7 w-7 object-contain ${lab.dormant ? 'opacity-50 grayscale' : ''}`} />
                  </div>
                  {lab.dormant && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">휴면</span>
                  )}
                </div>
                <h3 className={`mt-4 text-lg font-bold ${lab.dormant ? 'text-slate-400' : 'text-slate-900'}`}>{lab.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${lab.dormant ? 'text-slate-400' : 'text-slate-600'}`}>{lab.description}</p>
              </>
            );
            return lab.dormant ? (
              <div key={lab.name} className={`${card} bg-slate-50 p-6`} aria-disabled="true">{body}</div>
            ) : (
              <Link key={lab.name} to={lab.link} className={`${card} block p-6 no-underline transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md`}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>

    {/* 여백의 가치 */}
    <section className="border-t border-slate-200 bg-white px-5 py-20 sm:px-6" id="core-values">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Values" title="여백의 가치" desc="여백은 이런 가치를 지향하고 있어요" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className={`${card} p-6`}>
              <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ServiceSections;
