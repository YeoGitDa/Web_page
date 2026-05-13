/**
 * @param {'member' | 'talent_pool'} applicationType
 * @param {Record<string, unknown>} payload
 */
export function buildEnvelope(applicationType, payload) {
  return {
    submittedAt: new Date().toISOString(),
    applicationType,
    source: 'yeobaek-web-recruit',
    payload,
  };
}

/**
 * @param {'member' | 'talent_pool'} applicationType
 * @param {Record<string, unknown>} payload
 */
export async function submitRecruitment(applicationType, payload) {
  const envelope = buildEnvelope(applicationType, payload);
  const url = import.meta.env.VITE_RECRUIT_SUBMIT_URL?.trim();
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
