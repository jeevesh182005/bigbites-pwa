/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: '#ff6a00',
          dark: '#0f0f0f',
          charcoal: '#1a1a1a',
        },
      },
      boxShadow: {
        glow: '0 0 42px rgba(255,106,0,0.25)',
        soft: '0 20px 60px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};
