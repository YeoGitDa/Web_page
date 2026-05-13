import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  getOpportunities,
  getTalentProfiles,
  removeOpportunity,
  removeTalentProfile,
  DOMAIN_OPTIONS,
  ROLE_OPTIONS,
} from './submitRecruitment.js';
import { matchOpportunity, getMatchGrade } from './matchEngine.js';

/* ── 통계 카드 ── */
function StatCard({ label, value, sub, color = 'slate' }) {
  const bg = {
    emerald: 'bg-emerald-50 text-emerald-800',
    sky: 'bg-sky-50 text-sky-800',
    amber: 'bg-amber-50 text-amber-800',
    violet: 'bg-violet-50 text-violet-800',
    slate: 'bg-slate-50 text-slate-800',
  };
  return (
    <div className={`rounded-xl p-5 ${bg[color] || bg.slate}`}>
      <p className="text-xs font-semibold uppercase tracking-widest opacity-60">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs opacity-60">{sub}</p>}
    </div>
  );
}

/* ── 탭 버튼 ── */
function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-slate-900 text-white shadow-sm'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      {children}
    </button>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview'); // overview | talents | opportunities
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [, forceUpdate] = useState(0);

  const opportunities = getOpportunities();
  const profiles = getTalentProfiles();

  /* 통계 계산 */
  const stats = useMemo(() => {
    const openOpps = opportunities.filter((o) => o.status === '모집중' || o.status === '모집예정').length;
    const totalSkills = new Set();
    profiles.forEach((p) => {
      [...(p.skills?.languages || []), ...(p.skills?.tools || []), ...(p.skills?.domain || [])].forEach((s) => totalSkills.add(s));
    });
    return {
      totalProfiles: profiles.length,
      totalOpps: opportunities.length,
      openOpps,
      uniqueSkills: totalSkills.size,
    };
  }, [opportunities, profiles]);

  /* 인력풀 필터링 */
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const nameMatch = p.name?.toLowerCase().includes(q);
        const deptMatch = p.department?.toLowerCase().includes(q);
        const skillMatch = [
          ...(p.skills?.languages || []),
          ...(p.skills?.tools || []),
          ...(p.skills?.domain || []),
        ].some((s) => s.toLowerCase().includes(q));
        if (!nameMatch && !deptMatch && !skillMatch) return false;
      }
      if (filterDomain && !p.skills?.domain?.includes(filterDomain)) return false;
      if (filterRole && !p.preferences?.preferred_role?.includes(filterRole)) return false;
      return true;
    });
  }, [profiles, search, filterDomain, filterRole]);

  /* 기회별 매칭 요약 */
  const oppSummaries = useMemo(() => {
    return opportunities.map((opp) => {
      const matches = matchOpportunity(opp);
      const good = matches.filter((m) => m.score >= 60).length;
      const top = matches[0] || null;
      return { opp, matchCount: matches.length, goodCount: good, topMatch: top };
    });
  }, [opportunities, profiles]);

  const handleDeleteProfile = (id) => {
    removeTalentProfile(id);
    forceUpdate((n) => n + 1);
  };

  const handleDeleteOpp = (id) => {
    removeOpportunity(id);
    forceUpdate((n) => n + 1);
  };

  const selectClass =
    'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none';

  return (
    <div className="mx-auto max-w-5xl">
      {/* 헤더 */}
      <div className="mb-8">
        <Link to="/recruit" className="text-sm font-medium text-emerald-700 hover:underline">
          &larr; 모집 홈
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">관리자 대시보드</h1>
        <p className="mt-2 text-sm text-slate-500">
          지원 현황, 인력풀, 기회를 한 곳에서 관리합니다.
        </p>
      </div>

      {/* 통계 */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="인력풀" value={stats.totalProfiles} sub="등록된 프로필" color="sky" />
        <StatCard label="기회" value={stats.totalOpps} sub={`${stats.openOpps}건 모집중`} color="emerald" />
        <StatCard label="보유 역량" value={stats.uniqueSkills} sub="고유 스킬 수" color="violet" />
        <StatCard
          label="매칭률"
          value={stats.totalProfiles > 0 && stats.totalOpps > 0 ? `${Math.round((oppSummaries.reduce((s, o) => s + o.goodCount, 0) / Math.max(stats.totalProfiles * stats.totalOpps, 1)) * 100)}%` : '-'}
          sub="적합(60+) 비율"
          color="amber"
        />
      </div>

      {/* 탭 */}
      <div className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-2">
        <TabButton active={tab === 'overview'} onClick={() => setTab('overview')}>전체 현황</TabButton>
        <TabButton active={tab === 'talents'} onClick={() => setTab('talents')}>인력풀 관리</TabButton>
        <TabButton active={tab === 'opportunities'} onClick={() => setTab('opportunities')}>기회 관리</TabButton>
      </div>

      {/* ─── 전체 현황 탭 ─── */}
      {tab === 'overview' && (
        <div className="space-y-6">
          {opportunities.length === 0 && profiles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <p className="text-lg font-semibold text-slate-400">아직 데이터가 없습니다.</p>
              <p className="mt-2 text-sm text-slate-400">기회와 인력풀을 등록하면 여기에 현황이 표시됩니다.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link to="/recruit/opportunities/new" className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">기회 등록</Link>
                <Link to="/recruit/talent-pool" className="rounded-lg bg-sky-800 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700">인력풀 등록</Link>
              </div>
            </div>
          ) : (
            <>
              {/* 기회별 매칭 요약 */}
              <div>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">기회별 매칭 현황</h2>
                {oppSummaries.length === 0 ? (
                  <p className="text-sm text-slate-400">등록된 기회가 없습니다.</p>
                ) : (
                  <div className="space-y-3">
                    {oppSummaries.map(({ opp, matchCount, goodCount, topMatch }) => (
                      <div key={opp.id} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{opp.title}</h3>
                          <p className="text-xs text-slate-500">{opp.type} · 마감 {opp.deadline}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-slate-900">{goodCount}</p>
                          <p className="text-xs text-slate-400">적합 후보</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-slate-900">{matchCount}</p>
                          <p className="text-xs text-slate-400">전체 매칭</p>
                        </div>
                        {topMatch && (
                          <div className="text-right">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                              topMatch.score >= 80 ? 'bg-emerald-100 text-emerald-800'
                              : topMatch.score >= 60 ? 'bg-sky-100 text-sky-800'
                              : 'bg-slate-100 text-slate-500'
                            }`}>
                              최고 {topMatch.score}점
                            </span>
                          </div>
                        )}
                        <Link to="/recruit/match" className="text-xs font-medium text-violet-700 hover:underline">상세</Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 최근 인력풀 등록 */}
              <div>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">최근 인력풀 등록</h2>
                {profiles.length === 0 ? (
                  <p className="text-sm text-slate-400">등록된 프로필이 없습니다.</p>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {profiles.slice(0, 6).map((p) => (
                      <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.department || p.student_id || ''}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.skills?.domain?.slice(0, 2).map((d) => (
                            <span key={d} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">{d}</span>
                          ))}
                          {p.preferences?.preferred_role?.slice(0, 1).map((r) => (
                            <span key={r} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{r}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── 인력풀 관리 탭 ─── */}
      {tab === 'talents' && (
        <div className="space-y-4">
          {/* 검색/필터 */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 학과, 기술 검색..."
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)} className={selectClass}>
              <option value="">전체 도메인</option>
              {DOMAIN_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className={selectClass}>
              <option value="">전체 역할</option>
              {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {(search || filterDomain || filterRole) && (
              <button onClick={() => { setSearch(''); setFilterDomain(''); setFilterRole(''); }} className="text-sm text-slate-400 hover:text-slate-600">
                초기화
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400">{filteredProfiles.length}명 표시 / 전체 {profiles.length}명</p>

          {filteredProfiles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
              <p className="text-slate-400">{profiles.length === 0 ? '등록된 프로필이 없습니다.' : '검색 결과가 없습니다.'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProfiles.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-800">{p.status || 'candidate'}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {p.department || ''}{p.student_id ? ` · ${p.student_id}` : ''}
                        {p.phone ? ` · ${p.phone}` : ''}
                        {p.email ? ` · ${p.email}` : ''}
                      </p>

                      {/* 스킬 태그 */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.skills?.domain?.map((d) => (
                          <span key={d} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">{d}</span>
                        ))}
                        {[...(p.skills?.languages || []), ...(p.skills?.tools || [])].map((s) => (
                          <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{s}</span>
                        ))}
                      </div>

                      {/* 선호 정보 */}
                      <div className="mt-2 text-xs text-slate-400">
                        {p.preferences?.preferred_role?.length > 0 && `역할: ${p.preferences.preferred_role.join(', ')}`}
                        {p.preferences?.availability_hours_per_week && ` · 주 ${p.preferences.availability_hours_per_week}시간`}
                        {p.preferences?.available_period && ` · ${p.preferences.available_period}`}
                      </div>

                      {/* 추가 정보 */}
                      {(p.project_history || p.awards || p.portfolio_url) && (
                        <div className="mt-2 space-y-1 text-xs text-slate-500">
                          {p.project_history && <p>프로젝트: {p.project_history}</p>}
                          {p.awards && <p>수상: {p.awards}</p>}
                          {p.portfolio_url && (
                            <p>포트폴리오: <a href={p.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{p.portfolio_url}</a></p>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteProfile(p.id)}
                      className="ml-4 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── 기회 관리 탭 ─── */}
      {tab === 'opportunities' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">전체 {opportunities.length}건</p>
            <Link
              to="/recruit/opportunities/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            >
              + 기회 등록
            </Link>
          </div>

          {opportunities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
              <p className="text-slate-400">등록된 기회가 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {opportunities.map((opp) => {
                const summary = oppSummaries.find((s) => s.opp.id === opp.id);
                return (
                  <div key={opp.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-900">{opp.title}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            opp.status === '모집중' ? 'bg-emerald-100 text-emerald-800'
                            : opp.status === '모집예정' ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-500'
                          }`}>{opp.status}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                          {opp.type}{opp.organizer ? ` · ${opp.organizer}` : ''} · 마감 {opp.deadline}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {opp.matching_tags?.domains?.map((d) => (
                            <span key={d} className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">{d}</span>
                          ))}
                          {opp.matching_tags?.required_skills?.map((s) => (
                            <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{s}</span>
                          ))}
                          {opp.matching_tags?.required_roles?.map((r) => (
                            <span key={r} className="rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet-700">{r}</span>
                          ))}
                        </div>

                        {summary && (
                          <p className="mt-2 text-xs text-slate-400">
                            매칭: 적합 {summary.goodCount}명 / 전체 {summary.matchCount}명
                            {summary.topMatch && ` · 최고 ${summary.topMatch.score}점`}
                          </p>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        <Link to="/recruit/match" className="rounded-lg border border-violet-200 px-3 py-1.5 text-center text-xs font-medium text-violet-700 hover:bg-violet-50">
                          매칭
                        </Link>
                        <button
                          onClick={() => handleDeleteOpp(opp.id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
