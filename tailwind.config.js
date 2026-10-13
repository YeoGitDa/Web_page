/** @type {import('tailwindcss').Config} */
import yb from './design/tailwind.preset.js'

export default {
  presets: [yb],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '15xl': '12rem',
        '16xl': '14rem',
      },
    },
  },
  plugins: [],
}
