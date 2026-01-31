import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "김미승",
      role: [ "LAB 2"],
      email: "yeobaek1@example.com",
      image: "/backend/image/duzzonku.png"
    },
    {
      name: "김서희",
      role: ["LAB 2"],
      email: "yeobaek2@example.com",
      image: "/backend/image/duzzonku.png"
    },
    {
      name: "김명주",
      role: ["운영 지원" , "기획 지원"],
      email: "yeobaek3@example.com",
      image: "/backend/image/mj_logo.png"

    },
    {
      name: "김찬슬",
      role: ["디자인"],
      email: "yeobaek3@example.com",
      image: "/backend/image/duzzonku.png"

    },
    {
      name: "박다정",
      role: ["운영", "LAB 2"],
      email: "yeobaek3@example.com",
      image: "/backend/image/duzzonku.png"

    },{
      name: "방규리",
      role: ["운영" ,"기획", "LAB 1" , "LAB 3" , "Frontend"],
      email: "yeobaek3@example.com",
      image: "/backend/image/yuja.png"

    },{
      name: "양승빈",
      role: ["회장" ,"Backend", "운영"],
      email: "yeobaek3@example.com",
      image: "/backend/image/duzzonku.png"

    },
    
    {
      name: "Coming Soon",
      role: ["여백의 신입부원 당신을 기다립니다"],
      email: "많관부 많사부",
      image: "/backend/image/duzzonku.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 bg-emerald-800/40 backdrop-blur-xl border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 text-white text-xl md:text-2xl font-bold no-underline">
          <img src="/backend/image/logo.png" alt="Yeobaek Logo" className="h-5" />
          Yeobaek
        </Link>
        <div className="flex gap-6 text-white text-lg md:text-xl">
          <Link to="/" className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity">Home</Link>
          <a href="/#service" className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity">Service</a>
          <Link to="/about" className="text-white no-underline opacity-100 font-semibold">About</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-5 md:px-10 text-center relative">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-800 tracking-tight">About Yeobaek</h1>
        <p className="text-2xl md:text-3xl text-gray-600 font-light max-w-6xl mx-auto whitespace-nowrap">
          문헌정보학을 기반으로 학과의 소통과 정보 공유를 위해 만들어진 동아리입니다
        </p>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 tracking-tight">Team Yeobaek</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">여백 의 기획, 운영, 개발을 담당하는 구성원들</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="p-8 md:p-10 rounded-[2rem] relative bg-gray-100 backdrop-blur-3xl border-2 border-emerald-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center transition-all duration-500 hover:bg-emerald-50/30 hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] hover:-translate-y-3 hover:border-emerald-500/50 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#345441] to-emerald-500 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>

                {/* Member Image */}
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 bg-white flex items-center justify-center relative z-10 ring-4 ring-[#587650] transition-all duration-500 group-hover:ring-emerald-500/40 group-hover:scale-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Member Info */}
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 tracking-tight relative z-10">{member.name}</h3>

                <div className="mb-4 relative z-10">
                  {member.role.map((r, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-emerald-500/15 text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium mx-1 mb-2"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-base relative z-10 no-underline flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-white relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 text-gray-800 tracking-tight">Our Story</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 font-light mb-8 whitespace-nowrap">
            여백은 2022년 "0과 1사이의 여백을 채우다"라는 의미로 시작된 DB 프로그래밍 소모임입니다.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 font-light mb-8 whitespace-nowrap">
            문헌정보학을 기반으로 데이터베이스 설계부터 웹 서비스 개발까지, 학과의 소통과 정보 공유를 위한 다양한 프로젝트를 진행하고 있습니다.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 font-light whitespace-nowrap">
            AI 기반 챗봇, 디지털 아카이빙, 큐레이션 서비스 등을 통해 문헌정보학과 학생들의 학습과 성장을 돕고 있습니다.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-40 px-5 md:px-10 bg-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">Join Us</h2>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-12 whitespace-nowrap">
            여백과 함께 성장 해 보세요!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-emerald-600 border-none px-10 py-5 rounded-full text-lg font-semibold cursor-pointer transition-transform hover:scale-105 no-underline inline-block"
            >
              홈으로 돌아가기
            </Link>
            <a
              href="mailto:lisyeobaek@egmail.com"
              className="bg-transparent text-white border-2 border-white px-10 py-5 rounded-full text-lg font-semibold cursor-pointer transition-all hover:scale-105 hover:bg-white hover:text-emerald-600 no-underline inline-block"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
