import { Link } from 'react-router-dom';
import { SectionHead } from './SiteHeader';

/*
 * 홈 아래 섹션 — 내용은 맨 위 배열들만 고치면 된다 (개발 몰라도 됨)
 * 모양은 v3 시안 기준: 작은 영문 라벨 · 제목 · 설명 + 카드
 */

// 숫자 칸 — 확인된 숫자만. 바뀌면 여기만 고친다
const NUMBERS = [
  { value: '4', label: '활동 LAB' },
  { value: '3', label: '서비스' },
  { value: '2022', label: '창립' },
  { value: '8', label: '부원', note: '2025-09 운영계획서 기준' },
];

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

const card = 'rounded-2xl border border-slate-200 bg-white shadow-sm';

const ServiceSections = () => (
  <div className="bg-slate-50">
    {/* 숫자 */}
    <section className="px-5 pt-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHead eyebrow="Numbers" title="여백 한눈에 보기" desc="동아리 핵심 수치를 한눈에 확인하세요." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.label} className={`${card} p-6 text-center`} title={n.note}>
              <p className="text-3xl font-bold tracking-tight text-emerald-800">{n.value}</p>
              <p className="mt-1 text-sm text-slate-500">{n.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 서비스 */}
    <section className="px-5 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          eyebrow="Services"
          title="서비스"
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

  </div>
);

export default ServiceSections;
