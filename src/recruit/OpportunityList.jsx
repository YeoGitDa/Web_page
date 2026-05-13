import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getOpportunities,
  OPPORTUNITY_TYPE_OPTIONS,
  DOMAIN_OPTIONS,
} from './submitRecruitment.js';

/* 상태 뱃지 색상 */
const statusColor = {
  '모집중': 'bg-emerald-100 text-emerald-800',
  '모집예정': 'bg-blue-100 text-blue-800',
  '마감': 'bg-slate-100 text-slate-500',
  '진행중': 'bg-amber-100 text-amber-800',
  '종료': 'bg-slate-100 text-slate-400',
};

/* 유형 아이콘 (간단 이모지 매핑) */
const typeIcon = {
  '공모전': '🏆',
  '해커톤': '💻',
  '학술대회': '📄',
  '세미나/컨퍼런스': '🎤',
  '교육/워크숍': '📚',
  '스터디': '✏️',
  '인턴십': '🏢',
  '기타': '📌',
};

export default function OpportunityList() {
  const [filterType, setFilterType] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const opportunities = getOpportunities();

  const filtered = useMemo(() => {
    return opportunities.filter((opp) => {
      if (filterType && opp.type !== filterType) return false;
      if (filterDomain && !opp.matching_tags?.domains?.includes(filterDomain)) return false;
      if (showOnlyOpen && opp.status !== '모집중' && opp.status !== '모집예정') return false;
      return true;
    });
  }, [opportunities, filterType, filterDomain, showOnlyOpen]);

  const selectClass =
    'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';

  return (
    <div className="mx-auto max-w-4xl">
      {/* 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/recruit" className="text-sm font-medium text-emerald-700 hover:underline">
            &larr; 모집 홈
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">기회 목록</h1>
          <p className="mt-2 text-sm text-slate-500">
            등록된 공모전, 학회, 교육 등 외부 기회를 확인하세요.
          </p>
        </div>
        <Link
          to="/recruit/opportunities/new"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          기회 등록
        </Link>
        <Link
          to="/recruit/match"
          className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-800 shadow-sm transition hover:bg-violet-100 hover:shadow-md"
        >
          매칭 보기
        </Link>
      </div>

      {/* 필터 */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
          <option value="">전체 유형</option>
          {OPPORTUNITY_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)} className={selectClass}>
          <option value="">전체 도메인</option>
          {DOMAIN_OPTIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={showOnlyOpen}
            onChange={(e) => setShowOnlyOpen(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          모집중만 보기
        </label>

        {(filterType || filterDomain || showOnlyOpen) && (
          <button
            onClick={() => { setFilterType(''); setFilterDomain(''); setShowOnlyOpen(false); }}
            className="ml-auto text-sm text-slate-400 transition hover:text-slate-600"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 목록 */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-slate-400">
            {opportunities.length === 0 ? '아직 등록된 기회가 없습니다.' : '조건에 맞는 기회가 없습니다.'}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {opportunities.length === 0
              ? '위의 "기회 등록" 버튼으로 첫 번째 기회를 추가해 보세요.'
              : '필터를 조정해 보세요.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
            >
              {/* 상단: 유형 + 상태 */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {typeIcon[opp.type] || '📌'} {opp.type}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[opp.status] || 'bg-slate-100 text-slate-500'}`}>
                  {opp.status}
                </span>
              </div>

              {/* 제목 */}
              <h3 className="text-lg font-bold text-slate-900">{opp.title}</h3>

              {/* 주최 */}
              {opp.organizer && (
                <p className="mt-1 text-sm text-slate-500">{opp.organizer}</p>
              )}

              {/* 설명 */}
              {opp.description && (
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{opp.description}</p>
              )}

              {/* 태그 */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {opp.matching_tags?.domains?.map((d) => (
                  <span key={d} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    {d}
                  </span>
                ))}
                {opp.matching_tags?.required_skills?.slice(0, 3).map((s) => (
                  <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {s}
                  </span>
                ))}
              </div>

              {/* 하단: 마감일 + 링크 */}
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xs text-slate-400">
                  마감 {opp.deadline}
                  {opp.team_size && ` · ${opp.team_size}명`}
                </span>
                {opp.url && (
                  <a
                    href={opp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-emerald-700 transition hover:underline"
                  >
                    상세 보기 &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 통계 */}
      {opportunities.length > 0 && (
        <p className="mt-6 text-center text-xs text-slate-400">
          전체 {opportunities.length}건 중 {filtered.length}건 표시
        </p>
      )}
    </div>
  );
}
