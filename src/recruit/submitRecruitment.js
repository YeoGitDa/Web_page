/**
 * Yeobaek Recruit - submission helpers
 *
 * Envelope 구조는 향후 FastAPI / AI Agent 연동 시에도 그대로 수용 가능하도록
 * PDF 기술명세서(v1.1)의 JSON 스키마를 따른다.
 *
 * 제출 URL 우선순위:
 *   1. VITE_RECRUIT_SUBMIT_URL (FastAPI 등 자체 백엔드)
 *   2. VITE_RECRUIT_SHEET_URL (Google Apps Script 웹앱)
 *   3. 둘 다 없으면 -> 브라우저 JSON 다운로드 + 클립보드 복사
 *
 * Google Sheets 연동 가이드 (운영진 참고):
 *   1. Google Sheets 새 시트 생성
 *   2. 확장 프로그램 -> Apps Script 열기
 *   3. 아래 코드 붙여넣기:
 *
 *      function doPost(e) {
 *        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *        const data = JSON.parse(e.postData.contents);
 *        sheet.appendRow([
 *          data.submittedAt,
 *          data.applicationType,
 *          JSON.stringify(data.payload)
 *        ]);
 *        return ContentService.createTextOutput('OK');
 *      }
 *
 *   4. 배포 -> 웹 앱 -> "누구나" 접근 가능으로 설정
 *   5. .env 파일에 VITE_RECRUIT_SHEET_URL=<배포 URL> 추가
 */

/**
 * @param {'member' | 'talent_pool'} applicationType
 * @param {Record<string, unknown>} payload
 */
export function buildEnvelope(applicationType, payload) {
  return {
    submittedAt: new Date().toISOString(),
    applicationType,
    source: 'yeobaek-web-recruit',
    version: '2.0',
    payload,
  };
}

/**
 * @param {'member' | 'talent_pool'} applicationType
 * @param {Record<string, unknown>} payload
 */
export async function submitRecruitment(applicationType, payload) {
  const envelope = buildEnvelope(applicationType, payload);

  // 1순위: 자체 백엔드 (FastAPI 등)
  const primaryUrl = import.meta.env.VITE_RECRUIT_SUBMIT_URL?.trim();
  // 2순위: Google Apps Script 웹앱
  const sheetUrl = import.meta.env.VITE_RECRUIT_SHEET_URL?.trim();

  const url = primaryUrl || sheetUrl;

  if (url) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(envelope),
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `서버 응답 오류 (${res.status})`);
    }
    return { delivered: true, envelope };
  }

  return { delivered: false, envelope };
}

export function persistEnvelopeLocally(envelope) {
  const safeTs = envelope.submittedAt.replace(/[:.]/g, '-');
  const filename = `yeobaek-recruit-${envelope.applicationType}-${safeTs}.json`;
  const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  a.rel = 'noopener';
  a.click();
  URL.revokeObjectURL(href);
}

export async function copyEnvelopeToClipboard(envelope) {
  try {
    await navigator.clipboard.writeText(JSON.stringify(envelope, null, 2));
    return true;
  } catch {
    return false;
  }
}

/* 공통 상수: 태그 선택지 (폼에서 import하여 사용) */

export const TECH_STACK_OPTIONS = [
  'Python', 'SQL', 'JavaScript', 'React', 'HTML/CSS',
  'AWS', 'Firebase', 'MongoDB', 'Git/GitHub',
  'Figma', 'Notion', 'Obsidian',
];

export const DOMAIN_OPTIONS = [
  '데이터 엔지니어링', '정보 조직', 'AI/LLM',
  '웹 개발', 'UI/UX 디자인', '메타데이터',
  '아카이브', '추천 시스템', '자연어 처리',
];

export const ACTIVITY_TYPE_OPTIONS = [
  '공모전/경진대회', '해커톤', '학술대회',
  '스터디', '프로젝트', '데이터 분석',
];

export const ROLE_OPTIONS = [
  'Frontend', 'Backend', 'Design',
  'Data', 'PM/기획', '기타',
];

/* ── 기회(Opportunity) 관련 상수 & 헬퍼 ── */

export const OPPORTUNITY_TYPE_OPTIONS = [
  '공모전', '해커톤', '학술대회', '세미나/컨퍼런스',
  '교육/워크숍', '스터디', '인턴십', '기타',
];

export const OPPORTUNITY_STATUS_OPTIONS = [
  '모집중', '모집예정', '마감', '진행중', '종료',
];

/**
 * @param {Record<string, unknown>} payload
 */
export function buildOpportunityEnvelope(payload) {
  return {
    submittedAt: new Date().toISOString(),
    applicationType: 'opportunity',
    source: 'yeobaek-web-recruit',
    version: '2.0',
    payload,
  };
}

/**
 * @param {Record<string, unknown>} payload
 */
export async function submitOpportunity(payload) {
  const envelope = buildOpportunityEnvelope(payload);

  const primaryUrl = import.meta.env.VITE_RECRUIT_SUBMIT_URL?.trim();
  const sheetUrl = import.meta.env.VITE_RECRUIT_SHEET_URL?.trim();
  const url = primaryUrl || sheetUrl;

  if (url) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(envelope),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(text || `서버 응답 오류 (${res.status})`);
    return { delivered: true, envelope };
  }

  return { delivered: false, envelope };
}

/* ── 로컬 기회 저장소 (브라우저 메모리, 향후 DB 대체) ── */

let _opportunityStore = [];

export function getOpportunities() {
  return [..._opportunityStore];
}

export function addOpportunity(opportunity) {
  const entry = {
    id: `opp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...opportunity,
  };
  _opportunityStore = [entry, ..._opportunityStore];
  return entry;
}

export function removeOpportunity(id) {
  _opportunityStore = _opportunityStore.filter((o) => o.id !== id);
}

/* ── 인력풀 로컬 저장소 (브라우저 메모리, 향후 DB 대체) ── */

let _talentStore = [];

export function getTalentProfiles() {
  return [..._talentStore];
}

export function addTalentProfile(profile) {
  const entry = {
    id: `tp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    registeredAt: new Date().toISOString(),
    ...profile,
  };
  _talentStore = [entry, ..._talentStore];
  return entry;
}

export function removeTalentProfile(id) {
  _talentStore = _talentStore.filter((p) => p.id !== id);
}
