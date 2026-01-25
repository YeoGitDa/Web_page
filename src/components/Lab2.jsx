import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LabDetail = () => {
  const navigate = useNavigate();
  const { labNumber } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('전체보기');
  const [expandedCategories, setExpandedCategories] = useState({
    '웹딩': true,
    '해외여행': true,
    '강아지동반 여행': true
  });

  // 카테고리 데이터
  const categories = [
    {
      name: '전체보기',
      count: 530,
      subcategories: []
    },
    {
      name: '여백',
      count: 0,
      subcategories: ['LAB1', 'LAB2', 'LAB3', 'LAB3' , 'LAB4' , 'LAB5' , 'LAB6']
    },
    
    {
      name: 'PAGE',
      count: 2,
      subcategories: ['봉사' , '교육' , '활동']
    },
    {
      name: 'D.A.A.L',
      count: 0,
      subcategories: ['데이터 분석' , '데이터 시각화' ]
    }
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // LAB2 상세 데이터
  const labData = {
    2: {
      title: 'LAB 2 - 디지털 아카이빙',
      subtitle: 'yeobaek 및 전공 동아리들의 활동 산출물과 문서들을 체계적으로 아카이빙',
      info: {
        사업명: 'yeobaek 디지털 아카이빙 시스템',
        기간: '2025/03/01 → 진행중',
        주체: '문헌정보학과 동아리',
        성격: '학술 아카이브',
        기술스택: 'SQL',
        서비스: 'DB, Data Ar'
      },
      description: `yeobaek과 문헌정보학과 전공 동아리들의 활동 기록과 산출물을 체계적으로 보존하고 공유하기 위한 디지털 아카이빙 시스템입니다.

문서, 기획서, 프로젝트 결과물 등 다양한 형태의 자료를 수집하고 정리하여, 동아리 구성원들이 쉽게 검색하고 활용할 수 있도록 합니다.`,
      features: [
        '체계적인 메타데이터 관리',
        '강력한 검색 및 필터링 기능',
        '카테고리별 분류 및 태깅',
        '시간순 타임라인 뷰',
        '파일 업로드 및 다운로드',
        '권한별 접근 제어'
      ],
      goals: [
        '동아리 활동 기록의 체계적 보존',
        '지식과 경험의 세대 간 전승',
        '학술 자료의 효율적 공유',
        '협업 문화 활성화'
      ]
    }
  };

  const currentLab = labData[labNumber];

  // LAB2가 아닌 경우 기본 화면 표시
  if (labNumber !== '2' || !currentLab) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-20 flex justify-between items-center px-4 py-4 md:px-16 bg-emerald-800/40 backdrop-blur-xl border-b border-white/10">
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
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 flex justify-between items-center px-4 py-4 md:px-16 bg-emerald-800/40 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-5 text-white text-xl md:text-2xl font-semibold">
          <img src="/backend/image/logo.png" alt="Yeobaek Logo" className="h-8" />
          Yeobaek
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-white text-lg no-underline opacity-90 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer"
        >
          ← Back to Home
        </button>
      </nav>

      {/* Main Layout with Sidebar */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex gap-6 md:gap-8">
          {/* Sidebar - Category Menu */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Category Header */}
              <div className="px-5 py-4 bg-emerald-50/60 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                  카테고리
                  <span className="text-sm text-gray-500">▲</span>
                </h2>
              </div>

              {/* Category List */}
              <div className="py-2">
                {categories.map((category, index) => (
                  <div key={index}>
                    {/* Main Category */}
                    <div
                      className={`px-5 py-2.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedCategory === category.name ? 'bg-emerald-50/60 text-emerald-600 font-semibold' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        if (category.subcategories.length > 0) {
                          toggleCategory(category.name);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {category.subcategories.length > 0 && (
                          <span className="text-sm">
                            {expandedCategories[category.name] ? '▾' : '▸'}
                          </span>
                        )}
                        <span className="text-base">{category.name}</span>
                      </div>
                      {category.count > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-red-500 text-white rounded-full">
                          {category.count}
                        </span>
                      )}
                    </div>

                    {/* Subcategories */}
                    {category.subcategories.length > 0 && expandedCategories[category.name] && (
                      <div className="bg-gray-50">
                        {category.subcategories.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="px-5 pl-12 py-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-white cursor-pointer transition-colors"
                          >
                            ├─ {sub}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Divider after certain categories */}
                    {(category.name === '전체보기' || category.name === '뷰티' || category.name === '해외여행') && (
                      <div className="my-2 mx-4 border-t border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 px-0 md:px-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <span className="cursor-pointer hover:text-gray-700" onClick={() => navigate('/')}>Home</span>
          <span>→</span>
          <span className="cursor-pointer hover:text-gray-700">LAB Info</span>
          <span>→</span>
          <span className="text-gray-700">LAB {labNumber}</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[40px] font-bold text-[#37352f] mb-4 leading-tight">
          {currentLab.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          {currentLab.subtitle}
        </p>

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 p-8 bg-gray-50/80 rounded-2xl border border-gray-200">
          {Object.entries(currentLab.info).map(([key, value]) => (
            <div key={key} className="flex gap-4">
              <span className="font-semibold text-gray-700 min-w-[100px]">{key}</span>
              <span className="text-gray-600">{value}</span>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#37352f] mb-6">프로젝트 소개</h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
            {currentLab.description}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#37352f] mb-6">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLab.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50/40 rounded-xl border border-emerald-100/60">
                <span className="text-emerald-600 text-xl">✓</span>
                <span className="text-gray-700 text-base md:text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#37352f] mb-6">프로젝트 목표</h2>
          <div className="space-y-3">
            {currentLab.goals.map((goal, index) => (
              <div key={index} className="flex items-start gap-3 p-5 bg-white rounded-xl border border-gray-200 hover:border-emerald-400/50 transition-colors">
                <span className="text-emerald-600 font-bold text-lg">{index + 1}.</span>
                <span className="text-gray-700 text-base md:text-lg">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-10 bg-gradient-to-br from-emerald-50/70 to-emerald-100/40 rounded-2xl border border-emerald-200/60 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-4">
            LAB 2 프로젝트에 참여하고 싶으신가요?
          </h3>
          <p className="text-gray-700 mb-8 text-lg">
            yeobaek과 함께 디지털 아카이빙의 미래를 만들어갑니다
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold text-lg hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl"
          >
           lisyeobaek@gmail.com
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetail;
