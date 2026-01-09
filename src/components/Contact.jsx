function Contact() {
  return (
    <div id="contact" className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
          Contact Yeobaek team
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="flex justify-center items-center">
            <img
              src="/backend/image/map.png"
              alt="Location Map"
              className="w-80 h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                관련 정보
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-700">위치</p>
                    <p className="text-gray-600">인천대학교 사회과학대학(13호관) 2층 문헌정보학과</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-700">전화</p>
                    <p className="text-gray-600">+82) 032-832-8750</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-700">이메일</p>
                    <p className="text-gray-600">lisyeobaek@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/team_yeobeak?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                aria-label="Instagram"
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://velog.io/@yeobaek/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                aria-label="Velog"
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.967-.21-.255-.608-.383-1.193-.383h-.562v-1.48h4.937v1.48h-.398c-.66 0-1.223.255-1.688.765-.45.495-.878 1.155-1.283 1.98-.39.81-.818 1.77-1.283 2.88-.48 1.11-.945 2.355-1.395 3.735h-2.025L9.18 8.122H7.305v-1.35c0-.3-.135-.45-.405-.45H6.413V4.838h3.472v1.412zM16.058 8.122h1.597v8.156h-1.597V8.122z"/>
                </svg>
              </a>
              <a
                href="https://github.com/YeoGitDa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
                aria-label="GitHub"
              >
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2024 YEOBAEK. All Rights Reserved.</p>
          <div className="flex gap-6">
            
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.967-.21-.255-.608-.383-1.193-.383h-.562v-1.48h4.937v1.48h-.398c-.66 0-1.223.255-1.688.765-.45.495-.878 1.155-1.283 1.98-.39.81-.818 1.77-1.283 2.88-.48 1.11-.945 2.355-1.395 3.735h-2.025L9.18 8.122H7.305v-1.35c0-.3-.135-.45-.405-.45H6.413V4.838h3.472v1.412zM16.058 8.122h1.597v8.156h-1.597V8.122z"/>
              </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
