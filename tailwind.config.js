/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'sans-serif',
        ],
      },
      colors: {
        apple: {
          bg: '#FBFBFB',
          card: '#FFFFFF',
          label: '#1d1d1f',
          secondary: '#6e6e73',
          tertiary: '#8a8a8e',
          separator: 'rgba(0,0,0,0.08)',
          fill: 'rgba(0,0,0,0.05)',
        },
      },
      borderRadius: {
        bento: '2rem',
        card: '1rem',
      },
      letterSpacing: {
        tighter: '-0.04em',
      },
    },
  },
  plugins: [],
};
