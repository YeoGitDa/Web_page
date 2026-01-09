import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExhibitionDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 flex justify-between items-center px-4 py-4 md:px-16 bg-emerald-900/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-5 text-white text-xl md:text-2xl font-semibold">
          <img src="/backend/image/logo.png" alt="Yeobaek Logo" className="h-8" />
          Yeobaek
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-white no-underline opacity-90 hover:opacity-100 transition-opacity"
        >
          ← Back to Home
        </button>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-20 px-5">
        <div className="text-center">
          <img
            src="/backend/image/wait.png"
            alt="Coming Soon"
            className="mx-auto max-w-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetail;
