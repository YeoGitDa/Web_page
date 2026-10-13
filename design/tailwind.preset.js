/**
 * 여백 Tailwind preset — 기준값은 YeoGitDa/Design 의 tokens/tokens.json
 * 값을 바꿀 때는 Design 레포를 먼저 고치고 이 파일에 같은 값을 옮긴다
 *
 * emerald 를 CI 초록 단계로 덮어쓴다 → 기존 emerald-* 클래스가 그대로 CI 색이 된다
 *   50·100·200 = leaf 6·12·24% · 500 = leaf · 700 = forest · 800 = deep · 900 = night
 *   흰 바탕 대비: 500 은 4.05 (작은 글자 금지) · 600 부터 4.5 이상
 * 회색·바탕은 Tailwind 기본 slate 그대로
 */
export default {
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#F3F8F7',
          100: '#E7F1EE',
          200: '#D0E3DE',
          300: '#ACCFC5',
          400: '#75AE9E',
          500: '#3A8C75',
          600: '#367262',
          700: '#31594E',
          800: '#09402C',
          900: '#0A261C',
          950: '#061711',
        },
        yb: {
          leaf: '#3A8C75',
          forest: '#31594E',
          deep: '#09402C',
          night: '#0A261C',
          ink: '#0D0D0D',
          'leaf-6': '#F3F8F7',
          'leaf-12': '#E7F1EE',
          'leaf-24': '#D0E3DE',
          danger: '#DC2626',
        },
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        rest: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        hover: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'system-ui', 'sans-serif'],
        brand: ['Montserrat', '"Pretendard Variable"', 'sans-serif'],
      },
      maxWidth: {
        content: '1024px',
      },
    },
  },
}
