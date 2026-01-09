import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 추가 가능
    console.log('Login attempt:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <Link to="/" className="hover:text-emerald-1000 transition-colors">Home</Link>
      
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
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Login
            </h2>

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
                  className="w-full px-5 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all"
                  placeholder="Enter your ID"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-4  rounded-md text-lg font-semibold hover:bg-emerald-800 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
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

export default Login;
