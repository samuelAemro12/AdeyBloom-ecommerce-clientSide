/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#C585D7',
        'secondary-accent': '#FFDDE2',
        'background': '#FFF9F6',
        'cloud-gray': '#D6D6D6',
        'ash-gray': '#6A6A6A',
        'error': '#F47C7C',
        'error-light': '#FEE2E2',
        'error-dark': '#B91C1C',
      }
    },
  },
  plugins: [],
} 