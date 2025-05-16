/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C585D7',
        secondary: '#008080',
        background: '#FFF9F6',
        text: '#2F2F2F'
      }
    },
  },
  plugins: [],
} 