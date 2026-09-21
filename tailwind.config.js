/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gnu: {
          navy: '#002855',       // GNU Official Primary Deep Navy
          blue: '#0062BD',       // Pioneer Royal Blue
          light: '#E6F0FA',      // Soft Blue Background
          accent: '#00A3E0',     // Bright Cyan Accent
          gold: '#C59B27',       // GNU Milestone/Emblem Gold
          dark: '#0B192C',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
