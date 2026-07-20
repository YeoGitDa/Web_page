import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  isAdminSession,
  isUserSession,
  loginUnified,
  resolvePostLoginPath,
} from '../auth/session';
import { SiteBrandMark } from './SiteBrandMark';

function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawNext = searchParams.get('next') || '';

  const [formData, setFormData] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  const decodedNext = useMemo(() => {
    try {
      return decodeURIComponent(rawNext);
    } catch {
      return rawNext;
    }
  }, [rawNext]);

  useEffect(() => {
    if (isAdminSession()) {
      navigate(resolvePostLoginPath('admin', decodedNext), { replace: true });
      return;
    }
    if (isUserSession()) {
      navigate(resolvePostLoginPath('user', decodedNext), { replace: true });
    }
  }, [navigate, decodedNext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const configuredAdmin =
      import.meta.env.VITE_ADMIN_PASSWORD != null &&
      String(import.meta.env.VITE_ADMIN_PASSWORD).length > 0;
    const configuredUser =
      import.meta.env.VITE_USER_ID != null &&
      String(import.meta.env.VITE_USER_ID).length > 0 &&
      import.meta.env.VITE_USER_PASSWORD != null &&
      String(import.meta.env.VITE_USER_PASSWORD).length > 0;

    if (!configuredAdmin && !configuredUser) {
      setError(
        '로그인 환경이 설정되어 있지 않습니다. .env.example 을 참고해 VITE_ADMIN_PASSWORD 또는 일반 사용자용 변수를 설정하세요.',
      );
      return;
    }

    const role = loginUnified(formData.id, formData.password);
    if (!role) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    navigate(resolvePostLoginPath(role, decodedNext), { replace: true });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="w-full bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-700 tracking-tight">
            <img src="/backend/image/logo.png" alt="YB Logo" className="h-6" />
            <span className="leading-none">
              <SiteBrandMark suffix="Login" tone="onLight" />
            </span>
          </Link>
          <div className="flex gap-8 text-gray-700">
            <Link to="/" className="hover:text-emerald-1000 transition-colors">
              Home
            </Link>
            <Link to="/#service" className="hover:text-emerald-700 transition-colors">
              Services
            </Link>
            <Link to="/#about" className="hover:text-emerald-700 transition-colors">
              About
            </Link>
          </div>
          <Link
            to="/login"
            className="bg-emerald-700 text-white px-6 py-2 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">로그인</h2>
            <p className="mb-4 text-center text-sm text-gray-600">
              운영진·일반 회원 모두 이 페이지에서 로그인합니다.
            </p>
            <div className="mb-8 rounded-lg border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-center text-sm text-gray-700">
              <p>
                <strong>운영(관리자)</strong>으로 로그인한 뒤{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs text-slate-800">/admin</code>으로
                갈 때는{' '}
                <Link
                  to="/login?next=/admin"
                  className="font-semibold text-emerald-800 underline decoration-emerald-600 underline-offset-2 hover:text-emerald-900"
                >
                  이 링크
                </Link>
                를 눌러 주세요.
              </p>
              <p className="mt-2 text-xs text-gray-600">
                북마크용 주소 <code className="rounded bg-white px-1 text-[11px]">/admin/login</code>도
                동일하게 이 화면으로 연결됩니다. 주소만 바뀌고 폼은 같아서 체감상 반응이 없을 수 있습니다.
              </p>
            </div>
            {decodedNext && decodedNext.startsWith('/admin') && (
              <p
                className="mb-6 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs text-slate-700"
                role="status"
              >
                로그인 후 운영 화면(<code className="text-[11px]">/admin</code> 이하)으로 이동합니다.
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="id" className="block text-base font-medium text-gray-700 mb-2">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  autoComplete="username"
                  className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all"
                  placeholder="아이디"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all"
                  placeholder="비밀번호"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-4 rounded-md text-lg font-semibold hover:bg-emerald-800 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
              >
                로그인
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <Link to="/signup" className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors">
                가입하기
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>&copy; 2026 YeoBaek. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
