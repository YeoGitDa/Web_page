import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    image: '/backend/image/chatbot_image.jpg',
    imageAlt: '백봇이 Chat Bot',
    title: "Chat Bot : '여불이'",
    description: '챗봇을 통해 질문하고, 원하는 정보를 찾을 수 있어요',
    link: '/chatbot',
  },
  {
    image: '/backend/image/digitalA.png',
    imageAlt: '디지털 아카이빙',
    title: '디지털 아카이빙',
    description: 'yeobaek 및 전공 동아리들의 활동 산출물과 문서들을 체계적으로 아카이빙하고, 검색 및 활용을 위한 서비스!',
    link: '/archiving',
  },
  {
    image: '/backend/image/exhibition_image.jpg',
    imageAlt: '동아리 산출물 전시',
    title: '동아리 산출물 전시',
    description: '개인 맞춤형 정보자료 추천 및 yeobaek 의 산출물 전시 기능!',
    link: '/exhibition',
  },
];

const ServiceSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index) => setCurrentIndex(index);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % services.length);

  return (
    <section className="py-24 md:py-32 px-5 md:px-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex items-center gap-12 md:gap-20 flex-wrap">
          {/* Image - horizontal slide */}
          <div className="flex-1 min-w-[320px] rounded-[2rem] overflow-hidden h-[450px] relative bg-white border-2 border-emerald-700/40 shadow-lg">
            {services.map((service, i) => (
              <img
                key={i}
                src={service.image}
                alt={service.imageAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${(i - currentIndex) * 100}%)`,
                }}
              />
            ))}
          </div>

          {/* Text - slide with fade */}
          <div className="flex-1 min-w-[320px] rounded-[2rem] bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-lg relative h-[450px] overflow-hidden">
            {services.map((service, i) => (
              <div
                key={i}
                className="absolute inset-0 p-10 md:p-14 flex flex-col justify-center transition-all duration-700 ease-in-out"
                style={{
                  opacity: currentIndex === i ? 1 : 0,
                  transform: `translateX(${(i - currentIndex) * 100}%)`,
                  pointerEvents: currentIndex === i ? 'auto' : 'none',
                }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">{service.title}</h2>
                <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-8 font-light">{service.description}</p>
                <button
                  onClick={() => navigate(service.link)}
                  className="inline-flex items-center gap-2 text-emerald-700 text-lg font-medium hover:gap-3 transition-all bg-transparent border-none cursor-pointer"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white border-2 border-emerald-700/40 shadow-lg flex items-center justify-center cursor-pointer hover:bg-emerald-50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white border-2 border-emerald-700/40 shadow-lg flex items-center justify-center cursor-pointer hover:bg-emerald-50 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer border-none p-0 ${
                currentIndex === i ? 'bg-emerald-700 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceSections = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white relative">
    <div className="bg-white">




      {/* Our Mission Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 text-gray-800 tracking-tight relative z-10">Yeobaek Web은요..</h2>
          <p className="text-[28px] md:text-[30px] leading-relaxed text-gray-600 max-w-4xl mx-auto font-light relative z-20 whitespace-nowrap"> {/*줄바꿈 제거*/}
              문헌정보학을 기반으로 학과의 소통과 정보 공유, 전공 동아리 활성화를 위해 만들어졌어요          </p>
        </div>
      </section>

      <ServiceSection />

      {/* 동아리 소식 & 공지 Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-white" id="club-news">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 tracking-tight">동아리 소식 & 공지</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">여백의 최신 소식과 공지사항을 확인하세요</p>
          </div>


          {/* Club Card */}
          <div className="rounded-[1.5rem] border-2 border-emerald-600 overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            {/* Green top border */}
            <div className="h-1.5 bg-gradient-to-r from-green-200 to-emerald-500"></div>

            <div className="flex flex-col lg:flex-row">
              {/* Left Info Panel */}
              <div className="lg:w-[480px] bg-white px-8 md:px-10 py-10 md:py-14 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-emerald-200/50">
                <img src="/backend/image/YB_logo.png" alt="여백" className="w-60 h-60 object-contain mb-6" />
                <h4 className="text-xl font-bold text-gray-800 mb-4">문헌정보학과 전공동아리 여백</h4>
                <p className="text-gray-600 mb-6">여백은 박종도 교수님 산하의 정보학 기반 동아리 입니다. <br/> 정보학을 바탕으로 실제 서비스와 시스템을 기획, 설계, 개발해 이용자에게 적합한 정보서비스를 제공합니다.</p>
                <p className="text-gray-900 text-sm">DB, Data Science, AI</p>
              </div>

              {/* Right Content */}
              <div className="flex-1 p-8 md:p-10">
              {/* Club Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-800">여백 (Yeobaek)</h4>
                    <span className="inline-flex items-center px-3 py-1 bg-[#74A874] text-white text-xs font-bold rounded-full">DB,DS,AI</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">문헌정보학과 대표 전공동아리</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <span className="font-medium">7명</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-300">&lt;&gt;</span>
                  <span className="font-medium">문헌정보학과, 소셜데이터사이언스 연계전공</span>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Since 2022. 03 ~</span>
                </div>
                <h5 className="text-xl font-bold text-gray-800 mb-2">2026-1학기 신입회원 모집</h5>
                <p className="text-gray-500 text-base leading-relaxed">
                  여백에서 신입회원을 모집합니다! DB, Data Science, AI 등 다양한 분야의 프로젝트와 스터디에 참여하세요.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
  <button
    onClick={() => window.open('https://cls.inu.ac.kr/cls/2448/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGY2xzJTJGMzE5JTJGNDE3Mzk5JTJGYXJ0Y2xWaWV3LmRvJTNGcGFnZSUzRDIlMjZzcmNoQ29sdW1uJTNEJTI2c3JjaFdyZCUzRCUyNmJic0NsU2VxJTNEJTI2YmJzT3BlbldyZFNlcSUzRCUyNnJnc0JnbmRlU3RyJTNEJTI2cmdzRW5kZGVTdHIlM0QlMjZpc1ZpZXdNaW5lJTNEZmFsc2UlMjZwYXNzd29yZCUzRCUyNg%3D%3D', '_blank')}
    className="flex-1 py-3.5 bg-[#74A874] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors cursor-pointer border-none text-base"
  >
    자세히 보기
  </button>
  <button
    onClick={() => window.open('https://forms.gle/1Jrf5Q6kf3hjoUDy8', '_blank')} // 이동할 경로 입력
    className="flex-1 py-3.5 border-2 border-[#74A874] text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors cursor-pointer bg-transparent text-base"
  >
    가입 신청
  </button>
</div>
              </div>
            </div>
            </div>
          </div>
      </section>

      {/* Service Info Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-gray-50/50 relative" id="service-info">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 tracking-tight">LAB Info</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">yeobaek 의 LAB에 대한 정보</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
            {/* Service 1 Card */}
            <div onClick={() => navigate('/lab/1')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-800 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

              <div className="w-24 h-24 flex items-center justify-center mb-8 bg-emerald-800/30 rounded-3xl text-emerald-800 transition-all duration-500 group-hover:bg-emerald-800/40 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                <img src="/backend/image/AI.png" alt="LAB 1" className="w-12 h-12 object-contain" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">LAB 1</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light relative z-10">
                AI기반 자동화 어시스턴트를 구동하고 챗봇을 통해 자료 검색 기능을 제공하는 서비스입니다.
              </p>
            </div>

            {/* Service 2 Card */}
            <div onClick={() => navigate('/lab/2')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-800 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

              <div className="w-24 h-24 flex items-center justify-center mb-8 bg-emerald-800/30 rounded-3xl text-emerald-800 transition-all duration-500 group-hover:bg-emerald-800/40 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                <img src="/backend/image/Archive.png" alt="LAB 2" className="w-12 h-12 object-contain" />
              </div>


              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">LAB 2</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light relative z-10">
                동아리 내 문서/기획서 등 학술 자료의 체계적인 저장, 공유하는 기능을 제공하는 서비스입니다.
              </p>
            </div>

            {/* Service 3 Card */}
            <div onClick={() => navigate('/lab/3')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-800 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
              
              <div className="w-24 h-24 flex items-center justify-center mb-8 bg-emerald-800/30 rounded-3xl text-emerald-800 transition-all duration-500 group-hover:bg-emerald-800/40 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                <img src="/backend/image/Curation.png" alt="LAB 3" className="w-12 h-12 object-contain" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">LAB 3</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light relative z-10">
                문헌정보학 기반 개인 맞춤형 도서 추천과 동아리 구성원들의 산출물을 큐레이션 하는 서비스입니다.
              </p>
            </div>

            {/* Service 4 Card */}
            <div onClick={() => navigate('/lab/4')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-800 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

              <div className="w-24 h-24 flex items-center justify-center mb-8 bg-emerald-800/30 rounded-3xl text-emerald-800 transition-all duration-500 group-hover:bg-emerald-800/40 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                <img src="/backend/image/Infra.png" alt="LAB 4" className="w-12 h-12 object-contain" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">LAB 4</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light relative z-10">
                Git, CI/CD, Firebase 연동 및 배포 실습을 위한 서비스입니다.
              </p>
            </div>

            {/* Service 5 Card */}
            <div onClick={() => navigate('/lab/5')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-800 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

              <div className="w-24 h-24 flex items-center justify-center mb-8 bg-emerald-800/30 rounded-3xl text-emerald-800 transition-all duration-500 group-hover:bg-emerald-800/40 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                <img src="/backend/image/Compition.png" alt="LAB 5" className="w-12 h-12 object-contain" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">LAB  5</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light relative z-10">
                데이활동 기반 앱/웹 프로젝트 고도화하는 서비스입니다.
              </p>
            </div>

            {/* Service 6 Card */}
            <div onClick={() => navigate('/lab/6')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 to-emerald-800 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

              <div className="w-24 h-24 flex items-center justify-center mb-8 bg-emerald-800/30 rounded-3xl text-emerald-800 transition-all duration-500 group-hover:bg-emerald-800/40 group-hover:scale-110 group-hover:rotate-3 relative z-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <path d="M12 7v6m0 4h.01"/>
                </svg>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">LAB 6</h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light relative z-10">
                아이디어 기록, 발굴 및 실화하는 서비스입니다.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Our Core Values Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-white">
        <div className="z-[9999]">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 tracking-tight"> 여백의 가치 </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">여백은 이런 가치를 지향하고 있어요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Precision */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">밤티 NO!</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                데이터 기반으로 사용자의 불편함을 정확하게 파악하고, 이를 해결할 수 있는 서비스를 기획합니다.
              </p>
            </div>
            

            {/* Innovation */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
             
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">내손내만 서비스</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                내가 원하는 서비스는 직접 기획, 개발, 배포하며 활용하고 고도화 시킵니다. <br/> 언제든지 사용 가능하게 공개하여 사용자 피드백을 통해 서비스를 개선합니다.
              </p>
            </div>

            {/* Collaboration */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
                
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">팀 프로젝트 경험</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                문헌정보학과 내 여러 동아리와 협업해 기술과 경험를 공유하고, 협업 경험을 쌓아갑니다.
              </p>
            </div>

            {/* Integrity */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">통합 개발 경험</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                기획부터 개발, 큐레이션과 고도화 기능까지 제공하며 all in one 의 완전한 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </div>
  );
};

export default ServiceSections;