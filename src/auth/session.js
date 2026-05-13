const ADMIN_KEY = 'yeobaek_admin_auth';
const USER_KEY = 'yeobaek_user_auth';

/** @param {string} path */
export function safeInternalPath(path, fallback) {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
    return fallback;
  }
  return path;
}

/**
 * 로그인 직후 이동 경로 (오픈 리다이렉트·루프 방지).
 * @param {'admin' | 'user'} role
 * @param {string} rawNext URL 디코드된 next (없으면 '')
 */
export function resolvePostLoginPath(role, rawNext) {
  const pathOnly = String(rawNext || '').split('?')[0].split('#')[0];
  const next = safeInternalPath(pathOnly, '');

  const isAuthPage = /^\/(login|signup)(\/|$)/.test(next);
  if (!next || isAuthPage) {
    return role === 'admin' ? '/admin' : '/me';
  }

  if (role === 'admin') {
    if (next.startsWith('/admin') && !next.startsWith('/admin/login')) {
      return next;
    }
    return '/admin';
  }

  if (role === 'user') {
    if (next.startsWith('/admin')) {
      return '/me';
    }
    return next;
  }

  return '/';
}

export function isAdminSession() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data?.role === 'admin';
  } catch {
    return false;
  }
}

export function isUserSession() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data?.role === 'user';
  } catch {
    return false;
  }
}

export function setAdminSession() {
  localStorage.setItem(
    ADMIN_KEY,
    JSON.stringify({ role: 'admin', at: new Date().toISOString() }),
  );
}

/** @param {string} userId */
export function setUserSession(userId) {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({ role: 'user', id: userId, at: new Date().toISOString() }),
  );
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_KEY);
}

export function clearUserSession() {
  localStorage.removeItem(USER_KEY);
}

export function clearAllSessions() {
  clearAdminSession();
  clearUserSession();
}

/**
 * 공용 로그인: 관리자 또는 일반 사용자(환경 변수 설정 시).
 * @param {string} id
 * @param {string} password
 * @returns {'admin' | 'user' | null}
 */
export function loginUnified(id, password) {
  const idTrim = String(id || '').trim();
  const pass = String(password || '');

  const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;
  const adminId = import.meta.env.VITE_ADMIN_ID;

  if (adminPass != null && String(adminPass).length > 0 && pass === String(adminPass)) {
    if (adminId != null && String(adminId).length > 0 && idTrim !== String(adminId)) {
      // 비밀번호는 맞지만 운영자 ID 불일치
    } else {
      clearUserSession();
      setAdminSession();
      return 'admin';
    }
  }

  const userId = import.meta.env.VITE_USER_ID;
  const userPass = import.meta.env.VITE_USER_PASSWORD;
  if (
    userId != null &&
    String(userId).length > 0 &&
    userPass != null &&
    String(userPass).length > 0 &&
    idTrim === String(userId) &&
    pass === String(userPass)
  ) {
    clearAdminSession();
    setUserSession(idTrim);
    return 'user';
  }

  return null;
}

/**
 * 비밀번호만 넘기는 레거시 호출용. 신규는 `loginUnified` 사용.
 * @param {string} password
 */
export function tryAdminLogin(password) {
  const adminId = import.meta.env.VITE_ADMIN_ID;
  if (adminId != null && String(adminId).length > 0) {
    return loginUnified(String(adminId), password) === 'admin';
  }
  return loginUnified('legacy', password) === 'admin';
}
