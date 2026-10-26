/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          900: '#881337',
        },
        cinema: {
          bg: '#0b0f19',
          surface: '#121826',
          card: '#1a2234',
          border: '#2a3449',
          accent: '#e50914'
        }
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(229, 9, 20, 0.4)',
        'screen-glow': '0 15px 40px -10px rgba(56, 189, 248, 0.35)',
      }
    },
  },
  plugins: [],
}
