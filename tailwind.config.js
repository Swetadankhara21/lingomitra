/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Gujarati"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: { DEFAULT: '#0F766E', dark: '#115E59' },
        mint: { DEFAULT: '#A7F3D0', light: '#ECFDF5' },
        bg: '#F0FDFA',
        ink: { DEFAULT: '#134E4A', soft: '#64748B' },
        good: '#16A34A',
        bad: '#EF4444',
      },
      boxShadow: {
        card: '0 6px 24px -10px rgba(17, 94, 89, 0.25)',
        lift: '0 14px 34px -14px rgba(15, 118, 110, 0.45)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pop: { '0%': { transform: 'scale(0.96)' }, '60%': { transform: 'scale(1.03)' }, '100%': { transform: 'scale(1)' } },
        shake: { '0%, 100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-6px)' }, '75%': { transform: 'translateX(6px)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.45s ease-out both',
        pop: 'pop 0.35s ease-out',
        shake: 'shake 0.3s ease-in-out',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
