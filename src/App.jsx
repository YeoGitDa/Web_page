import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
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

function HomePage() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

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

  return (
    <div className="w-screen min-h-screen bg-gray-50 m-0 p-0 overflow-x-hidden">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/backend/image/musicchristmas.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero Section with Image Background */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/backend/image/gomdol.jpg)',
            filter: 'brightness(0.95)',
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0" /> 

        {/* Snow Effect */}
        <SnowEffect count={80} />
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-12 md:px-8 md:py-8 bg-emerald-800/40 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-5 text-white text-xl md:text-2xl font-bold">
            <img src="/backend/image/logo.png" alt="Yeobaek Logo" className="h-5" />
            Yeobaek
          </div>
          <div className="flex-1 flex justify-center gap-4 md:gap-8 text-white text-xl md:text-2xl">
            <a href="#home" className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity">Home</a>
            <a href="#service" className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity">Service</a>
            <Link to="/about" className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity">About</Link>
          </div>
          <div className="flex items-center gap-4 text-white text-xl md:text-2xl">
            <button
              onClick={toggleMusic}
              className="text-white opacity-90 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
              aria-label="배경음악 재생/정지"
            >
              <span className="text-2xl">
                {isMusicPlaying ? '🔊' : '🔇'}
              </span>
            </button>
            <Link to="/login" className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity">Login</Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col gap-7 items-center justify-center h-screen text-gray-800 text-center px-4 -mt-16">
          <h1 className="text-12xl md:text-7xl mb-4 font-bold leading-tight max-w-4xl">
            <SplitText text="Yeobaek Web" delay={50} />
          </h1>

          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <button
              onClick={() => document.getElementById('service')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gray-200 w-60 text-black border-none px-8 py-4 md:px-12 md:py-5 rounded-full text-base md:text-lg font-semibold cursor-pointer transition-transform hover:scale-105"
            >
              Service 구경하기
            </button>
            <button
              onClick={() => document.getElementById('service-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent w-60 text-gray-800 border border-gray-700 px-8 py-4 md:px-12 md:py-5 rounded-full text-base md:text-lg font-semibold cursor-pointer backdrop-blur-xl transition-all hover:scale-105 hover:border-gray-600"
            >
              LAB 구경하기
            </button>
          </div>

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={() => document.getElementById('service')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
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
      </Routes>
    </Router>
  );
}

export default App;