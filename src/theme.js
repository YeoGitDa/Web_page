import savedConfig from './theme.json';

// 운영 「홈 꾸미기」 화면이 고친 내용을 이 브라우저에만 임시 저장하는 곳 (미리보기용)
export const DRAFT_KEY = 'yeobaek_theme_draft';

// 떨어지는 효과 이름 — SnowEffect.jsx 의 EFFECT_IMAGES 와 같게 유지
export const EFFECTS = ['없음', 'snow', 'sun'];

export { savedConfig };

/** ?draft=1 일 때만 임시 저장본을 쓴다 (방문자에게는 영향 없음) */
function loadConfig(search) {
  if (new URLSearchParams(search).get('draft') !== '1') return savedConfig;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : savedConfig;
  } catch {
    return savedConfig;
  }
}

const SEASON_BY_MONTH = ['겨울', '겨울', '봄', '봄', '봄', '여름', '여름', '여름', '가을', '가을', '가을', '겨울'];

// 'YYYY-MM-DD' 로 비교 — 시간대 영향 없이 날짜만
const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * 오늘 쓸 테마를 고른다.
 * 1. 주소에 ?theme=이름 → 그 테마 (운영진이 미리 보기용) · ?draft=1 이면 「홈 꾸미기」 임시 저장본 기준
 * 2. 「지정」 에 오늘이 들어가는 줄 → 그 테마
 * 3. 「계절」 에서 이번 달 계절의 테마
 * 이름이 틀렸으면 여름 → 첫 번째 테마 순으로 대신 쓴다
 */
export function pickTheme(now = new Date(), search = window.location.search) {
  const config = loadConfig(search);
  const themes = config['테마'] || {};
  const preview = new URLSearchParams(search).get('theme');
  const today = ymd(now);
  const special = (config['지정'] || []).find((s) => s['시작'] <= today && today <= s['끝']);
  const seasonal = (config['계절'] || {})[SEASON_BY_MONTH[now.getMonth()]];

  const name = [preview, special?.['테마'], seasonal, 'summer'].find((n) => n && themes[n]) || Object.keys(themes)[0];
  const t = themes[name] || {};
  const reason = name === preview ? '미리보기' : name === special?.['테마'] ? `기간 지정 (${special['시작']} ~ ${special['끝']})` : name === seasonal ? `계절 (${SEASON_BY_MONTH[now.getMonth()]})` : '기본';
  return {
    name,
    reason,
    background: t['배경'],
    effect: t['효과'] && t['효과'] !== '없음' ? t['효과'] : null,
    music: t['음악'] || null,
    showText: t['글자'] !== '숨김',
    light: t['글자색'] === '밝게',
  };
}
