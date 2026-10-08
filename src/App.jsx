import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useRef, useMemo } from 'react';
import SplitText from './SplitText';
import SnowEffect from './SnowEffect';
import ServiceSections from './components/ServiceSections';
import Contact from './components/Contact';
import ChatBotDetail from './components/ChatBotDetail';
import ArchivingDetail from './components/ArchivingDetail';
import ExhibitionDetail from './components/ExhibitionDetail';
import LabDetail from './components/Lab2';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/Chatbot/Chatbot';
import About from './components/About';
import RecruitLayout from './recruit/RecruitLayout';
import RecruitHome from './recruit/RecruitHome';
import MemberApplication from './recruit/MemberApplication';
import TalentPoolApplication from './recruit/TalentPoolApplication';
import OpportunityList from './recruit/OpportunityList';
import OpportunityForm from './recruit/OpportunityForm';
import MatchResults from './recruit/MatchResults';
import AdminDashboard from './recruit/AdminDashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import UserProtectedRoute from './auth/UserProtectedRoute';
import MeHome from './me/MeHome';
import AdminShell from './admin/AdminShell';
import AdminHome from './admin/AdminHome';
import AdminLogin from './admin/AdminLogin';
import { SiteHeader } from './components/SiteHeader';
import { pickTheme } from './theme';

function HomePage() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const theme = useMemo(() => pickTheme(), []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('음악 재생 실패:', err);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const buttons = (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => scrollTo('service')}
        className="w-52 rounded-full border-none bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-md cursor-pointer transition-transform hover:scale-105"
      >
        Service 구경하기
      </button>
      <button
        onClick={() => scrollTo('club-news')}
        className={`w-52 rounded-full border px-8 py-4 text-base font-semibold cursor-pointer backdrop-blur-xl transition-transform hover:scale-105 ${
          theme.light ? 'border-white/60 bg-white/10 text-white' : 'border-slate-700 bg-white/40 text-slate-800'
        }`}
      >
        소식 보기
      </button>
    </div>
  );

  return (
    <div className="w-screen min-h-screen bg-gray-50 m-0 p-0 overflow-x-hidden">
      {/* Background Music — 테마에 음악이 있을 때만 */}
      {theme.music && (
        <audio ref={audioRef} loop>
          <source src={theme.music} type="audio/mpeg" />
        </audio>
      )}

      <SiteHeader
        suffix="Web"
        right={theme.music && (
          <button
            type="button"
            onClick={toggleMusic}
            className="ml-1 rounded-md bg-transparent px-2 py-1 text-lg text-slate-500 transition hover:bg-slate-100"
            aria-label="배경음악 재생/정지"
          >
            {isMusicPlaying ? '🔊' : '🔇'}
          </button>
        )}
      />

      {/* Hero — 배경·효과·글자는 src/theme.json 의 테마가 정한다 */}
      <div className="relative w-screen h-[calc(100svh-57px)] overflow-hidden" data-theme-name={theme.name}>
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:15%_100%] md:bg-center"
          // 휴대폰에선 곰(그림 왼쪽 아래)이 잘리지 않게 왼쪽 아래 기준
          style={{ backgroundImage: `url(${theme.background})` }}
        />
        {/* 밝은 글자 테마는 오른쪽을 살짝 어둡게 해 글자를 읽히게 */}
        {theme.light && theme.showText && <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />}
        {theme.effect && <SnowEffect count={80} effect={theme.effect} />}

        {theme.showText ? (
          // v3 배치 — 곰이 왼쪽에 있으니 글자는 오른쪽 절반
          <div className="relative z-10 flex h-full items-start px-5 pt-10 md:items-center md:pt-0">
            <div className={`mx-auto max-w-xl text-center md:ml-[48%] md:mr-0 ${theme.light ? 'text-white' : 'text-slate-900'}`}>
              <p className={`text-sm font-semibold tracking-wide ${theme.light ? 'text-white/80' : 'text-emerald-800'}`}>
                문헌정보학 · 데이터 · AI
              </p>
              <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">Yeobaek Web</h1>
              <p className={`mt-5 text-base leading-relaxed md:text-lg ${theme.light ? 'text-white/85' : 'text-slate-600'}`}>
                학과 소통과 전공 동아리 활성화를 위한 웹 공간입니다.
                <br />
                챗봇 · 아카이빙 · 전시 · LAB을 한곳에서 탐색해 보세요.
              </p>
              <div className="mt-8">{buttons}</div>
            </div>
          </div>
        ) : (
          // 배경 그림에 글자(배너)가 들어 있는 테마 — 버튼만 아래에
          <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-32">{buttons}</div>
        )}

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollTo('service')}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={theme.light ? 'white' : '#334155'} strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </div>

      {/* Service Sections */}
      <div id="service">
        <ServiceSections />
      </div>

      {/* Contact Section */}
      <Contact />

      {/* Chatbot */}
      <Chatbot />
    </div>

  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={<ChatBotDetail />} />
        <Route path="/archiving" element={<ArchivingDetail />} />
        <Route path="/exhibition" element={<ExhibitionDetail />} />
        <Route path="/lab/:labNumber" element={<LabDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/me" element={<MeHome />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/hub" element={<Navigate to="/admin" replace />} />
        <Route path="/hub/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminHome />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route path="/recruit" element={<RecruitLayout />}>
          <Route index element={<RecruitHome />} />
          <Route path="member" element={<MemberApplication />} />
          <Route path="talent-pool" element={<TalentPoolApplication />} />
          <Route path="opportunities" element={<OpportunityList />} />
          <Route path="opportunities/new" element={<OpportunityForm />} />
          <Route path="match" element={<MatchResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
