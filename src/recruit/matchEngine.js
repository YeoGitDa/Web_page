/**
 * Yeobaek Match Engine v1.0
 *
 * 인력풀 프로필과 기회(Opportunity)를 태그 기반으로 매칭한다.
 * 향후 AI 임베딩으로 교체 시 matchScore() 내부만 바꾸면 된다.
 *
 * 매칭 축 (가중치):
 *   - 도메인 일치 (40%) : opportunity.matching_tags.domains ↔ profile.skills.domain
 *   - 기술스택 일치 (30%) : opportunity.matching_tags.required_skills ↔ profile.skills (all)
 *   - 역할 일치 (15%) : opportunity.matching_tags.required_roles ↔ profile.preferences.preferred_role
 *   - 가용성 보너스 (15%) : 주당 시간, 활동 유형 매칭
 */

import { getOpportunities, getTalentProfiles } from './submitRecruitment.js';

/* ── 유틸 ── */

/** 두 배열의 교집합 크기 / 합집합 크기 (Jaccard) */
function jaccard(a, b) {
  if (!a?.length || !b?.length) return 0;
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  let inter = 0;
  for (const v of setA) if (setB.has(v)) inter++;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}

/** 두 배열의 교집합 크기 / 기준 배열 크기 (recall 관점) */
function recall(required, available) {
  if (!required?.length) return 1; // 요구 없으면 만점
  if (!available?.length) return 0;
  const setR = new Set(required.map((s) => s.toLowerCase()));
  const setA = new Set(available.map((s) => s.toLowerCase()));
  let hit = 0;
  for (const v of setR) if (setA.has(v)) hit++;
  return hit / setR.size;
}

/* ── 가중치 설정 ── */

const WEIGHTS = {
  domain: 0.40,
  skills: 0.30,
  role: 0.15,
  availability: 0.15,
};

/* ── 핵심: 프로필 ↔ 기회 매칭 점수 ── */

/**
 * @param {object} profile - 인력풀 프로필 (TalentPoolApplication payload 구조)
 * @param {object} opportunity - 기회 (OpportunityForm payload 구조)
 * @returns {{ score: number, breakdown: object }}
 */
export function matchScore(profile, opportunity) {
  const tags = opportunity.matching_tags || {};

  // 1) 도메인 매칭
  const domainScore = recall(tags.domains, profile.skills?.domain);

  // 2) 기술스택 매칭 — 프로필의 languages + tools + other 전체를 합쳐서 비교
  const profileSkills = [
    ...(profile.skills?.languages || []),
    ...(profile.skills?.tools || []),
    ...(profile.skills?.other || []),
  ];
  const skillsScore = recall(tags.required_skills, profileSkills);

  // 3) 역할 매칭
  const roleScore = recall(tags.required_roles, profile.preferences?.preferred_role);

  // 4) 가용성 보너스
  let availScore = 0.5; // 기본값
  // 활동 유형 매칭
  const oppType = opportunity.type || '';
  const prefActs = profile.preferences?.preferred_activities || [];
  const actMatch = prefActs.some(
    (a) => a.toLowerCase().includes(oppType.toLowerCase()) || oppType.toLowerCase().includes(a.toLowerCase())
  );
  if (actMatch) availScore += 0.3;
  // 주당 가용시간이 충분하면 보너스
  const hours = profile.preferences?.availability_hours_per_week;
  if (hours && hours >= 5) availScore += 0.2;
  availScore = Math.min(availScore, 1);

  // 가중 합산
  const total =
    WEIGHTS.domain * domainScore +
    WEIGHTS.skills * skillsScore +
    WEIGHTS.role * roleScore +
    WEIGHTS.availability * availScore;

  return {
    score: Math.round(total * 100),
    breakdown: {
      domain: Math.round(domainScore * 100),
      skills: Math.round(skillsScore * 100),
      role: Math.round(roleScore * 100),
      availability: Math.round(availScore * 100),
    },
  };
}

/* ── 배치 매칭 ── */

/**
 * 특정 기회에 대해 모든 인력풀 프로필을 매칭하고 점수순으로 정렬
 * @param {object} opportunity
 * @returns {Array<{ profile: object, score: number, breakdown: object }>}
 */
export function matchOpportunity(opportunity) {
  const profiles = getTalentProfiles();
  return profiles
    .map((profile) => {
      const { score, breakdown } = matchScore(profile, opportunity);
      return { profile, score, breakdown };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * 특정 프로필에 대해 모든 기회를 매칭하고 점수순으로 정렬
 * @param {object} profile
 * @returns {Array<{ opportunity: object, score: number, breakdown: object }>}
 */
export function matchProfile(profile) {
  const opportunities = getOpportunities();
  return opportunities
    .filter((o) => o.status === '모집중' || o.status === '모집예정')
    .map((opportunity) => {
      const { score, breakdown } = matchScore(profile, opportunity);
      return { opportunity, score, breakdown };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * 매칭 등급 라벨
 */
export function getMatchGrade(score) {
  if (score >= 80) return { label: '최적', color: 'emerald' };
  if (score >= 60) return { label: '적합', color: 'sky' };
  if (score >= 40) return { label: '보통', color: 'amber' };
  return { label: '낮음', color: 'slate' };
}
