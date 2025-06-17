/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        'primary-accent': '#C585D7',      // Soft Lilac
        'secondary-accent': '#FFDDE2',    // Petal Blush Pink
        'brand-highlight': '#008080',     // Deep Teal
        'background': '#FFF9F6',          // Ivory White
        'card-bg': '#FAF3EC',            // Mist Beige
        
        // Text Colors
        'primary-text': '#2F2F2F',       // Graphite Gray
        'secondary-text': '#6A6A6A',     // Ash Gray
        
        // UI Colors
        'cloud-gray': '#D6D6D6',         // Borders/Dividers
        'sage-green': '#B9D9A2',         // Success Message
        'coral-rose': '#F47C7C',         // Error/Alert Message
        
        // Legacy colors for backward compatibility
        'error': '#F47C7C',
        'error-light': '#FEE2E2',
        'error-dark': '#B91C1C',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 