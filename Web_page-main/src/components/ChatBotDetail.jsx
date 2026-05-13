import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBotDetail = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: '안녕하세요! 😎\n저는 여백의 작은AI 백봇이에요.\n여백, LIS 관련 질문을 해주세요!',
    },
  ]);

  const quickReplies = ['여백 x LIS 연결', '추천 시스템 구조', '시소러스 vs 온톨로지'];

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setMessages((prev) => [...prev, { role: 'bot', text: '생각 중입니다...' }]);
    try {
      const res = await fetch('https://web-page-1-wjne.onrender.com/api/rag-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'bot', text: data.reply || '답변을 가져오지 못했어요.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'bot', text: '서버 연결에 실패했어요. 잠시 후 다시 시도해주세요.' },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 md:px-16 bg-emerald-900/90 backdrop-blur-xl border-b border-white/10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-white text-xl md:text-2xl font-semibold cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/backend/image/logo.png" alt="Yeobaek Logo" className="h-8" />
          Yeobaek
        </button>
        <button
          onClick={() => navigate('/')}
          className="text-white opacity-80 hover:opacity-100 transition-opacity text-sm"
        >
          ← Back to Home
        </button>
      </nav>

      {/* ── Section 1: Hero (챗봇 데모) ── */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left – mascot */}
          <div className="relative flex-shrink-0 flex flex-col items-center">
            {/* speech bubble */}
            <div className="relative mb-4">
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm font-medium text-gray-700 shadow-sm">
                무엇이든 물어보살
              </div>
              {/* bubble tail */}
              <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />
            </div>
            {/* oval background */}
            <div className="bg-emerald-50 rounded-full p-4 w-56 h-56 flex items-center justify-center">
              <img
                src="/backend/image/mascot_chatbot.png"
                alt="Yeobaek mascot"
                className="w-44 h-44 object-contain"
              />
            </div>
          </div>

          {/* Right – chat UI */}
          <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              {/* header */}
              <div className="bg-emerald-700 px-4 py-3 flex items-center justify-between">
                <span className="text-white font-bold text-sm">Yeobaek Chat-bot</span>
                <span className="text-emerald-200 text-xs">온라인 · OpenAI</span>
              </div>

              {/* messages */}
              <div className="bg-rose-50 px-4 py-4 h-64 overflow-y-auto flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'bot' && (
                      <span className="text-xl mr-2 self-end mb-1">😎</span>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] whitespace-pre-line leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* quick replies */}
              <div className="bg-gray-50 px-4 py-2 flex gap-2 overflow-x-auto">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="flex-shrink-0 text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* input */}
              <div className="bg-gray-50 px-4 pb-3 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-emerald-400"
                />
                <button
                  onClick={() => sendMessage()}
                  className="bg-emerald-600 text-white text-sm font-semibold rounded-full px-4 py-2 hover:bg-emerald-700 transition-colors"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: 챗봇은 이렇게 만들어졌어요 ── */}
      <section className="px-6 md:px-16 py-16 bg-gray-50">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-14">챗봇은 이렇게 만들어졌어요</h2>

        <div className="max-w-4xl mx-auto flex flex-col gap-0">

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="md:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">STEP 1</span>
                <h3 className="font-bold text-gray-800">전체 시스템 아키텍처</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">사용자 질문이 처리되는 전체 흐름</p>

              <div className="flex items-center gap-2 text-xs">
                {/* user */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-lg">🧑‍💻</div>
                  <span className="text-gray-500 font-medium">사용자</span>
                </div>
                <div className="text-gray-300 text-lg">→</div>
                {/* vercel */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 76 65" fill="none"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/></svg>
                  </div>
                  <span className="text-gray-500 font-medium">Vercel</span>
                  <span className="text-gray-400">React App</span>
                </div>
                <div className="flex flex-col items-center text-gray-400">
                  <span className="text-xs">HTTPS</span>
                  <div className="text-gray-300 text-lg">→</div>
                </div>
                {/* render */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">R</div>
                  <span className="text-gray-500 font-medium">Render</span>
                  <span className="text-gray-400">FastAPI</span>
                </div>
                <div className="text-gray-300 text-lg">→</div>
                {/* openai */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
                  </div>
                  <span className="text-gray-500 font-medium">OpenAI</span>
                  <span className="text-gray-400">GPT-4o</span>
                </div>
                <div className="text-gray-300 text-lg">↕</div>
                {/* chromadb */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">DB</div>
                  <span className="text-gray-500 font-medium">Chroma</span>
                  <span className="text-gray-400">Vector DB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="flex md:pl-24 py-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 10 L30 30" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 30 L30 30 L30 20" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row justify-center">
            <div className="md:ml-20 md:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">STEP 2</span>
                <h3 className="font-bold text-gray-800">RAG 백엔드 처리 흐름</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">질문을 받아 답변을 생성하는 4단계 내부 로직</p>

              <div className="flex flex-col gap-3">
                {[
                  { step: '1', title: '벡터 검색 (Vector Search)', desc: 'ChromaDB에서 질문과 의미적으로 가장 유사한 문서 4개를 검색', color: 'bg-purple-50 border-purple-100', tag: 'bg-purple-100 text-purple-700' },
                  { step: '2', title: '컨텍스트 구성 (Context Composition)', desc: '검색된 문서들을 GPT에 전달할 컨텍스트 문자열로 결합', color: 'bg-blue-50 border-blue-100', tag: 'bg-blue-100 text-blue-700' },
                  { step: '3', title: 'GPT 호출 (LLM Invocation)', desc: '구성된 컨텍스트와 질문을 GPT-4o-mini에 전달하여 답변 생성', color: 'bg-emerald-50 border-emerald-100', tag: 'bg-emerald-100 text-emerald-700' },
                  { step: '4', title: '응답 반환 (Response Return)', desc: '생성된 답변을 JSON 형태로 프론트엔드에 반환', color: 'bg-orange-50 border-orange-100', tag: 'bg-orange-100 text-orange-700' },
                ].map((item) => (
                  <div key={item.step} className={`flex items-start gap-3 rounded-xl border p-3 ${item.color}`}>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${item.tag}`}>{item.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="flex md:pl-48 py-1">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 10 L30 30" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 30 L30 30 L30 20" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row justify-end">
            <div className="md:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">STEP 3</span>
                <h3 className="font-bold text-gray-800">ChromaDB 핵심 엔진</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">벡터 데이터베이스 ChromaDB의 세 가지 역할</p>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: '🗄️', title: '문서 저장', desc: "텍스트의 '의미'를 수학적 표현인 벡터(Vector)로 변환하여 저장", color: 'bg-blue-50' },
                  { icon: '🔍', title: '유사도 검색', desc: '키워드 일치가 아닌, 의미의 유사성을 기반으로 관련 문서 탐색', color: 'bg-emerald-50' },
                  { icon: '🧠', title: '컨텍스트 제공', desc: "검색된 정보를 GPT에 '참고 자료'로 제공하여 환각을 줄임", color: 'bg-purple-50' },
                ].map((item) => (
                  <div key={item.title} className={`rounded-xl p-4 ${item.color}`}>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="text-xs font-bold text-gray-700 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* RAG summary */}
              <div className="mt-4 bg-gray-50 rounded-xl p-4 text-xs text-gray-600 leading-relaxed border border-gray-100">
                <span className="font-bold text-gray-800">RAG</span>는 LLM이 모르는 지식을 외부 데이터베이스에서{' '}
                <span className="text-blue-600 font-semibold">검색(Retrieve)</span>하여 답변을{' '}
                <span className="text-emerald-600 font-semibold">보강(Augment)</span>함으로써, 정확하고 신뢰도 높은 답변을{' '}
                <span className="text-purple-600 font-semibold">생성(Generate)</span>하는 기술입니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: CTA ── */}
      <section className="px-6 md:px-16 py-16 bg-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg font-bold text-gray-800 mb-8">
            챗봇과 자동화시스템, DB에 관심 있다면, 연락 주세요 !
          </p>
          <a
            href="mailto:lisyeobaek@gmail.com"
            className="inline-block bg-emerald-700 text-white font-semibold px-10 py-3 rounded-full hover:bg-emerald-800 transition-colors shadow-md"
          >
        메일로 문의하기 
          </a> 
        </div>
      </section>
    </div>
  );
};

export default ChatBotDetail;
