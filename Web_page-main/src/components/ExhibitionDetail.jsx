import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';

// LAB 데이터
const labPages = [
  { lab: 'LAB 1', title: 'AI 어시스턴트 & 챗봇', description: 'AI 기반 자동화 어시스턴트를 구동하고, 챗봇을 통해 자료 검색 기능을 제공합니다...', keywords: ['NLP', 'RAG', 'LLM'] },
  { lab: 'LAB 2', title: '디지털 아카이빙 시스템', description: '동아리 내 문서, 기획서, 회의록 등 학술 자료를 체계적으로 저장하고 공유합니다...', keywords: ['Metadata', 'Search'] },
  { lab: 'LAB 3', title: '큐레이션 & 추천 서비스', description: '문헌정보학 기반 개인 맞춤형 도서 추천과 동아리 구성원들의 산출물을 큐레이션합니다...', keywords: ['Recommendation'] },
  { lab: 'LAB 4', title: '인프라 & DevOps', description: 'Git, CI/CD, Firebase 연동 및 배포 실습을 위한 서비스입니다...', keywords: ['Git', 'CI/CD'] },
  { lab: 'LAB 5', title: '프로젝트 고도화', description: '데이터 활동 기반 앱/웹 프로젝트를 고도화합니다. 기존 프로젝트의 성능 최적화...', keywords: ['Performance', 'UX/UI'] },
  { lab: 'LAB 6', title: '아이디어 랩', description: '아이디어를 기록하고 발굴하여 실현하는 서비스입니다. 브레인스토밍부터...', keywords: ['Ideation', 'Innovation'] },
];

// 표지: 배경색을 명확히 지정하여 비침 방지
const PageCover = React.forwardRef((props, ref) => (
  <div ref={ref} data-density="hard" className="bg-emerald-900 w-full h-full">
    <div className="page-cover h-full flex flex-col items-center justify-center p-8 text-white shadow-[inset_0_0_50px_rgba(0,0,0,0.2)]">
      {props.children}
    </div>
  </div>
));

// 일반 페이지: bg-white를 넣고 shadow를 추가해 입체감 부여
const Page = React.forwardRef((props, ref) => (
  <div ref={ref} className="bg-white w-full h-full shadow-inner">
    <div className="page h-full overflow-hidden border-l border-gray-100">
      {props.children}
    </div>
  </div>
));

const ExhibitionDetail = () => {
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookKey, setBookKey] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setBookKey((k) => k + 1);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleFlip = (e) => setCurrentPage(e.data);

  const pageWidth = isMobile ? 300 : 550;
  const pageHeight = isMobile ? 420 : 500;

  return (
    <div className="min-h-screen bg-slate-50"> {/* 배경을 약간 어둡게 해서 책이 돋보이게 수정 */}
      <nav className="sticky top-0 z-20 flex items-center px-4 py-4 md:px-16 bg-emerald-900/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-5 text-white text-xl md:text-2xl font-semibold">
          <img src="/backend/image/logo.png" alt="Yeobaek Logo" className="h-8" />
          Yeobaek
        </div>
        <button onClick={() => navigate('/')} className="ml-6 text-white text-sm opacity-90 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none">
          ← Back to Home
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-8 px-4">
        <HTMLFlipBook
          key={bookKey}
          width={pageWidth}
          height={pageHeight}
          size="fixed"
          showCover={true}
          maxShadowOpacity={0.2} // 연한 그림자 유지
          drawShadow={true}
          flippingTime={800}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={true}
          className="exhibition-book shadow-2xl"
          ref={bookRef}
          onFlip={handleFlip}
        >
          {/* Front Cover */}
          <PageCover>
            <img src="/backend/image/logo.png" alt="Yeobaek" className="h-16 mb-6" />
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Yeobaek</h1>
            <p className="text-base opacity-80 font-light">Digital Archive</p>
            <div className="w-16 h-0.5 bg-white/40 mt-6 mb-4"></div>
            <p className="text-sm opacity-60">2025</p>
          </PageCover>

          {/* LAB Pages (6개) - bg-white로 불투명도 확보 */}
          {labPages.map((lab, i) => (
            <Page key={`lab-${i}`}>
              <div className="h-full flex flex-col justify-center p-8 md:p-12">
                <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-3">{lab.lab}</span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">{lab.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-8">{lab.description}</p>
                <div className="flex flex-wrap gap-2">
                  {lab.keywords.map((kw, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-500 border border-gray-200">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </Page>
          ))}

          {/* Back Cover */}
          <PageCover>
            <h2 className="text-2xl font-bold mb-4">Thank You</h2>
            <p className="text-sm opacity-80 mb-6 text-center px-4">yeobaek과 함께 디지털 아카이빙의 미래를 만들어갑니다</p>
            <div className="w-16 h-0.5 bg-white/40 mb-6"></div>
            <p className="text-sm opacity-70">lisyeobaek@gmail.com</p>
          </PageCover>
        </HTMLFlipBook>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={() => bookRef.current?.pageFlip()?.flipPrev()} className="w-10 h-10 rounded-full bg-white border border-emerald-700/20 shadow-sm flex items-center justify-center hover:bg-emerald-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-700"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <span className="text-gray-600 text-sm font-semibold">
            {currentPage + 1} / 6
          </span>
          <button onClick={() => bookRef.current?.pageFlip()?.flipNext()} className="w-10 h-10 rounded-full bg-white border border-emerald-700/20 shadow-sm flex items-center justify-center hover:bg-emerald-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-700"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetail;