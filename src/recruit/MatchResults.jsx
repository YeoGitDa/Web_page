import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getOpportunities, getTalentProfiles } from './submitRecruitment.js';
import { matchOpportunity, matchProfile, getMatchGrade } from './matchEngine.js';

/* 점수 바 컴포넌트 */
function ScoreBar({ value, label, color = 'emerald' }) {
  const colors = {
    emerald: 'bg-emerald-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    slate: 'bg-slate-400',
  };
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 text-xs text-slate-500">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color] || colors.emerald}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs font-semibold text-slate-600">{value}</span>
    </div>
  );
}

/* 매칭 등급 뱃지 */
function GradeBadge({ score }) {
  const { label, color } = getMatchGrade(score);
  const styles = {
    emerald: 'bg-emerald-100 text-emerald-800',
    sky: 'bg-sky-100 text-sky-800',
    amber: 'bg-amber-100 text-amber-800',
    slate: 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[color]}`}>
      {score}점 · {label}
    </span>
  );
}

export default function MatchResults() {
  const [viewMode, setViewMode] = useState('by-opportunity'); // 'by-opportunity' | 'by-profile'
  const [selectedId, setSelectedId] = useState('');
  const [minScore, setMinScore] = useState(0);

  const opportunities = getOpportunities();
  const profiles = getTalentProfiles();

  const results = useMemo(() => {
    if (viewMode === 'by-opportunity') {
      if (!selectedId) return [];
      const opp = opportunities.find((o) => o.id === selectedId);
      if (!opp) return [];
      return matchOpportunity(opp).filter((r) => r.score >= minScore);
    } else {
      if (!selectedId) return [];
      const prof = profiles.find((p) => p.id === selectedId);
      if (!prof) return [];
      return matchProfile(prof).filter((r) => r.score >= minScore);
    }
  }, [viewMode, selectedId, minScore, opportunities, profiles]);

  const noData = opportunities.length === 0 || profiles.length === 0;

  const selectClass =
    'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';

  return (
    <div className="mx-auto max-w-4xl">
      {/* 헤더 */}
      <div className="mb-8">
        <Link to="/recruit" className="text-sm font-medium text-emerald-700 hover:underline">
          &larr; 모집 홈
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">매칭 결과</h1>
        <p className="mt-2 text-sm text-slate-500">
          인력풀 프로필과 기회를 태그 기반으로 매칭합니다. 도메인(40%) + 기술스택(30%) + 역할(15%) + 가용성(15%)
        </p>
      </div>

      {noData ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-slate-400">매칭에 필요한 데이터가 부족합니다.</p>
          <p className="mt-2 text-sm text-slate-400">
            {opportunities.length === 0 && '기회를 먼저 등록해 주세요. '}
            {profiles.length === 0 && '인력풀에 등록된 프로필이 필요합니다.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {opportunities.length === 0 && (
              <Link to="/recruit/opportunities/new" className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
                기회 등록
              </Link>
            )}
            {profiles.length === 0 && (
              <Link to="/recruit/talent-pool" className="rounded-lg bg-sky-800 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700">
                인력풀 등록
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* 컨트롤 바 */}
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            {/* 뷰 모드 토글 */}
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                onClick={() => { setViewMode('by-opportunity'); setSelectedId(''); }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${viewMode === 'by-opportunity' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                기회 → 후보
              </button>
              <button
                onClick={() => { setViewMode('by-profile'); setSelectedId(''); }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${viewMode === 'by-profile' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                프로필 → 기회
              </button>
            </div>

            {/* 대상 선택 */}
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className={selectClass}>
              <option value="">{viewMode === 'by-opportunity' ? '기회 선택...' : '프로필 선택...'}</option>
              {viewMode === 'by-opportunity'
                ? opportunities.map((o) => (
                    <option key={o.id} value={o.id}>{o.title} ({o.type})</option>
                  ))
                : profiles.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {p.skills?.domain?.join(', ') || '도메인 미지정'}</option>
                  ))
              }
            </select>

            {/* 최소 점수 필터 */}
            <label className="flex items-center gap-2 text-sm text-slate-600">
              최소
              <input
                type="number"
                min={0}
                max={100}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-sm focus:border-emerald-500 focus:outline-none"
              />
              점
            </label>
          </div>

          {/* 선택 안내 또는 결과 */}
          {!selectedId ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
              <p className="text-slate-400">
                {viewMode === 'by-opportunity'
                  ? '위에서 기회를 선택하면 적합한 인력풀 후보를 추천합니다.'
                  : '위에서 프로필을 선택하면 적합한 기회를 추천합니다.'}
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
              <p className="text-slate-400">조건에 맞는 매칭 결과가 없습니다.</p>
              <p className="mt-1 text-xs text-slate-400">최소 점수를 낮추거나, 더 많은 데이터를 등록해 보세요.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((r, idx) => {
                const item = viewMode === 'by-opportunity' ? r.profile : r.opportunity;
                const { color } = getMatchGrade(r.score);
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {viewMode === 'by-opportunity' ? (
                          <>
                            <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.department || item.student_id || ''}
                              {item.preferences?.preferred_role?.length > 0 && ` · ${item.preferences.preferred_role.join(', ')}`}
                            </p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.type}{item.organizer && ` · ${item.organizer}`}
                            </p>
                          </>
                        )}

                        {/* 태그 */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {viewMode === 'by-opportunity' ? (
                            <>
                              {item.skills?.domain?.map((d) => (
                                <span key={d} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">{d}</span>
                              ))}
                              {[...(item.skills?.languages || []), ...(item.skills?.tools || [])].slice(0, 4).map((s) => (
                                <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{s}</span>
                              ))}
                            </>
                          ) : (
                            <>
                              {item.matching_tags?.domains?.map((d) => (
                                <span key={d} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">{d}</span>
                              ))}
                              {item.matching_tags?.required_skills?.slice(0, 3).map((s) => (
                                <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{s}</span>
                              ))}
                            </>
                          )}
                        </div>
                      </div>

                      {/* 점수 */}
                      <div className="ml-4 flex flex-col items-end gap-2">
                        <GradeBadge score={r.score} />
                      </div>
                    </div>

                    {/* 점수 상세 */}
                    <div className="mt-4 space-y-1.5 rounded-xl bg-slate-50 p-4">
                      <ScoreBar value={r.breakdown.domain} label="도메인" color={r.breakdown.domain >= 60 ? 'emerald' : 'slate'} />
                      <ScoreBar value={r.breakdown.skills} label="기술" color={r.breakdown.skills >= 60 ? 'sky' : 'slate'} />
                      <ScoreBar value={r.breakdown.role} label="역할" color={r.breakdown.role >= 60 ? 'amber' : 'slate'} />
                      <ScoreBar value={r.breakdown.availability} label="가용성" color={r.breakdown.availability >= 60 ? 'emerald' : 'slate'} />
                    </div>
                  </div>
                );
              })}

              <p className="text-center text-xs text-slate-400">
                총 {results.length}건 매칭됨
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
