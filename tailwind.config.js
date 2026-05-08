/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0faf4',
          100: '#d4f0e0',
          200: '#a8e1c1',
          300: '#7ace9a',
          400: '#4caf78',
          500: '#3a9664',
          600: '#2d7a50',
          700: '#225f3e',
          800: '#1a4d32',
          900: '#0d2619',
        },
        earth: {
          50:  '#faf7f0',
          100: '#f0e8d0',
          200: '#e0cfa0',
          300: '#d0b670',
          400: '#c4a054',
          500: '#b08a3a',
          600: '#8b6914',
          700: '#6b500f',
          800: '#5c4409',
          900: '#3a2b05',
        },
        cream: '#fdfcf8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'card':  '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12)',
        'nav':   '0 1px 20px rgba(0,0,0,0.06)',
        'dropdown': '0 16px 48px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'xl2': '20px',
        'xl3': '28px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'slide-down': 'slideDown 0.3s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'shimmer': 'shimmer 1.6s infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideDown: { from: { opacity: 0, transform: 'translateY(-10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
        shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        bounceIn:  { from: { opacity: 0, transform: 'scale(0.3)' }, to: { opacity: 1, transform: 'scale(1)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}
