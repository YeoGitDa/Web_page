import React from 'react';
import { useNavigate } from 'react-router-dom';

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

      
      {/* Service 1 Section */}
      <section className="py-24 md:py-32 px-5 md:px-10 relative overflow-hidden" id="service1">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-12 md:gap-20 flex-wrap">
            <div className="flex-1 min-w-[320px] rounded-[2rem] overflow-hidden min-h-[450px] flex items-center justify-center relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-1 hover:border-emerald-800/50 hover:bg-emerald-900/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/10 to-transparent"></div>
              <img src="/backend/image/chatbot_image.jpg" alt="백봇이 Chat Bot" className="w-full h-full object-cover relative z-10" />
            </div>
            <div className="flex-1 min-w-[320px] p-10 md:p-14 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-1 hover:border-emerald-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent rounded-[2rem]"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight relative z-10">Chat Bot : '여불이'
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-8 font-light relative z-10">
               챗봇을 통해 질문하고, 원하는 정보를 찾을 수 있어요
              </p>
              <button onClick={() => navigate('/chatbot')} className="inline-flex items-center gap-2 text-emerald-700 text-lg font-medium no-underline transition-all hover:gap-3 hover:text-emerald-800 relative z-10 bg-transparent border-none cursor-pointer">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2 Section - Reverse */}
      <section className="py-24 md:py-32 px-5 md:px-10 relative overflow-hidden bg-gray-50/50" id="service2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-12 md:gap-20 flex-wrap md:flex-row-reverse">
            <div className="flex-1 min-w-[320px] rounded-[2rem] overflow-hidden min-h-[450px] flex items-center justify-center relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-1 hover:border-emerald-800/50 hover:bg-emerald-900/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/10 to-transparent"></div>
              <img src="/Ar.png" alt="디지털 아카이빙" className="w-full h-full object-cover relative z-10" />
            </div>
            <div className="flex-1 min-w-[320px] p-10 md:p-14 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-1 hover:border-emerald-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent rounded-[2rem]"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight relative z-10">디지털 아카이빙</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-8 font-light relative z-10">
                yeobaek 및 전공 동아리들의 활동 산출물과 문서들을 체계적으로 아카이빙하고, 검색 및 활용을 위한 서비스!
              </p>
              <button onClick={() => navigate('/archiving')} className="inline-flex items-center gap-2 text-emerald-700 text-lg font-medium no-underline transition-all hover:gap-3 hover:text-emerald-800 relative z-10 bg-transparent border-none cursor-pointer">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3 Section */}
      <section className="py-24 md:py-32 px-5 md:px-10 relative overflow-hidden" id="service3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-12 md:gap-20 flex-wrap">
            <div className="flex-1 min-w-[320px] rounded-[2rem] overflow-hidden min-h-[450px] flex items-center justify-center relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-1 hover:border-emerald-800/50 hover:bg-emerald-900/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/10 to-transparent"></div>
              <img src="/digicu.png" alt="동아리 산출물 전시" className="w-full h-full object-cover relative z-10" />
            </div>
            <div className="flex-1 min-w-[320px] p-10 md:p-14 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-1 hover:border-emerald-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent rounded-[2rem]"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight relative z-10">동아리 산출물 전시</h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-8 font-light relative z-10">
                개인 맞춤형 정보자료 추천 및 yeobaek 의 산출물 전시 기능!
              </p>
              <button onClick={() => navigate('/exhibition')} className="inline-flex items-center gap-2 text-emerald-700 text-lg font-medium no-underline transition-all hover:gap-3 hover:text-emerald-800 relative z-10 bg-transparent border-none cursor-pointer">
                Learn More →
              </button>
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
            <div onClick={() => navigate('AI.png')} className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden group">
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


      {/* Our History Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-gray-50/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 tracking-tight ">여백의 역사</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">여백의 시작부터 현재까지의 발전</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-800/50 via-emerald-800 to-emerald-800/50 -translate-x-1/2 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-20 md:space-y-28">
              {/* 2022 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-right pr-0 md:pr-16 p-8 rounded-3xl bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-emerald-900/5 hover:border-emerald-800/50 relative overflow-hidden z-[5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
                  <h3 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-5 tracking-tight relative z-10">2022</h3>
                  <p className="text-gray-600 text-lg md:text-xl font-light relative z-10">
                    DB 프로그래밍 소모임 창설 "0과 1사이의 여백을 채우다"라는 의미
                  </p>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-800/50 ring-4 ring-white relative z-20 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="flex-1 pl-0 md:pl-16"></div>
              </div>

              {/* 2023 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-left md:text-right pr-0 md:pr-16 order-2 md:order-1"></div>
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-800/50 ring-4 ring-white relative z-20 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="flex-1 text-left pl-0 md:pl-16 order-3 p-8 rounded-3xl bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-emerald-900/5 hover:border-emerald-800/50 relative overflow-hidden z-[5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
                  <h3 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-5 tracking-tight relative z-10">2023</h3>
                  <p className="text-gray-600 text-lg md:text-xl font-light relative z-10">
                    Python 기반 시각화, 데이터 분석 심화
                  </p>
                </div>
              </div>

              {/* 2025 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-right pr-0 md:pr-16 p-8 rounded-3xl bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-emerald-900/5 hover:border-emerald-800/50 relative overflow-hidden z-[5]">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
                  <h3 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-5 tracking-tight relative z-10">2025</h3>
                  <p className="text-gray-600 text-lg md:text-xl font-light relative z-10">
                    데이터 기반 서비스 기획, LLM활용 마이크로 서비스 개발
                  </p>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-800/50 ring-4 ring-white relative z-20 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className="flex-1 pl-0 md:pl-16"></div>
              </div>
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
              <div className="w-24 h-24 rounded-3xl bg-emerald-800/30 flex items-center justify-center mx-auto mb-8 text-emerald-800 relative z-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">정확</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                데이터 기반으로 사용자의 불편함을 정확하게 파악하고, 이를 해결할 수 있는 서비스를 기획합니다.
              </p>
            </div>

            {/* Innovation */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="w-24 h-24 rounded-3xl bg-emerald-800/30 flex items-center justify-center mx-auto mb-8 text-emerald-800 relative z-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">현실</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                서비스를 개발, 배포하며 실제 이용자의 요구를 만족시킵니다. 언제든지 사용 가능하며 피드백을 통해 서비스를 개선합니다.
              </p>
            </div>

            {/* Collaboration */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="w-24 h-24 rounded-3xl bg-emerald-800/30 flex items-center justify-center mx-auto mb-8 text-emerald-800 relative z-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">협업</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light relative z-10">
                문헌정보학과 내 여러 동아리와 협업해 정보를 공유하고, 함께 성장합니다.
              </p>
            </div>

            {/* Integrity */}
            <div className="p-10 md:p-12 rounded-[2rem] relative bg-white/80 backdrop-blur-3xl border-2 border-emerald-700/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] text-center transition-all duration-500 hover:bg-emerald-900/5 hover:shadow-[0_8px_32px_rgba(6,95,70,0.2)] hover:-translate-y-2 hover:border-emerald-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/15 to-transparent"></div>
              <div className="w-24 h-24 rounded-3xl bg-emerald-800/30 flex items-center justify-center mx-auto mb-8 text-emerald-800 relative z-10">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="8" width="18" height="13" rx="2"/>
                  <path d="M12 8V4H8L4 8"/>
                  <path d="M16 8V4h4l-4 4"/>
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 tracking-tight relative z-10">완전</h3>
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