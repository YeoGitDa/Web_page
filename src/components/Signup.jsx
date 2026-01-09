import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    id: '',
    confirmId: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{8,}$/;
    return idRegex.test(id);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[*@#])[a-zA-Z\d*@#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // 이메일 검증
    if (!formData.email.includes('@')) {
      newErrors.email = '올바른 이메일 주소를 입력해주세요.';
    }

    // ID 검증
    if (!validateId(formData.id)) {
      newErrors.id = '최소 8자 이상, 영문과 숫자만 사용 가능합니다.';
    }

    // ID 확인 검증
    if (formData.id !== formData.confirmId) {
      newErrors.confirmId = 'ID가 일치하지 않습니다.';
    }

    // 비밀번호 검증
    if (!validatePassword(formData.password)) {
      newErrors.password = '최소 8자 이상, 영문, 숫자, 특수문자(*, @, #) 중 하나를 포함해야 합니다.';
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 개인정보 동의 검증
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = '개인정보 사용에 동의해주세요.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('회원가입 시도:', formData);
      // 회원가입 로직 추가
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // 실시간 에러 제거
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <nav className="w-full bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-700">
            <img src="/backend/image/logo.png" alt="YB Logo" className="h-6" />
            Yeobaek
          </Link>
          <div className="flex gap-8 text-gray-700">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <Link to="/#service" className="hover:text-emerald-700 transition-colors">Services</Link>
            <Link to="/#about" className="hover:text-emerald-700 transition-colors">About</Link>
          </div>
          <Link to="/login" className="bg-emerald-700 text-white px-6 py-2 rounded-md hover:bg-emerald-800 transition-colors">
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-12 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
              계정 만들기
            </h2>
            <p className="text-center text-gray-600 mb-8">
              아래 정보를 입력하여 가입하세요.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-3">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 text-base border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all`}
                  placeholder="이메일을 입력하세요"
                  required
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* ID */}
              <div>
                <label htmlFor="id" className="block text-base font-medium text-gray-700 mb-3">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 text-base border ${errors.id ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all`}
                  placeholder="ID를 입력하세요"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">최소 8자 이상, 영문과 숫자만 사용 가능합니다.</p>
                {errors.id && <p className="mt-2 text-sm text-red-600">{errors.id}</p>}
              </div>

              {/* ID 확인 */}
              <div>
                <label htmlFor="confirmId" className="block text-base font-medium text-gray-700 mb-3">
                  ID 확인
                </label>
                <input
                  type="text"
                  id="confirmId"
                  name="confirmId"
                  value={formData.confirmId}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 text-base border ${errors.confirmId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all`}
                  placeholder="ID를 다시 입력하세요"
                  required
                />
                {errors.confirmId && <p className="mt-2 text-sm text-red-600">{errors.confirmId}</p>}
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-3">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 text-base border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all`}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">최소 8자 이상, 영문, 숫자, 특수문자(*, @, #) 중 하나를 포함해야 합니다.</p>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-3">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 text-base border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all`}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* 개인정보 동의 */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 text-emerald-700 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="agreeToTerms" className="ml-3 text-base text-gray-700">
                  개인정보 사용에 동의합니다
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

              <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-4 rounded-md text-lg font-semibold hover:bg-emerald-800 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
              >
                가입하기
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors">
                로그인
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4"></h3>
          <ul className="space-y-2 text-sm">

          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4"></h3>
          <ul className="space-y-2 text-sm">

          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4"></h3>
          <ul className="space-y-2 text-sm">

          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>&copy; 2025 YeoBaek. All rights reserved.
          {'&nbsp;'}
          <br/>
        </p>
      </div>
    </div>
  );
}

export default Signup;
