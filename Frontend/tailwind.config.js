// tailwind.config.mjs
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake3856 0.3s 1 ease',
      },
      keyframes: {
        shake3856: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 0px)' },
          '40%': { transform: 'translate(3px, 0px)' },
          '60%': { transform: 'translate(-3px, 0px)' },
          '80%': { transform: 'translate(3px, 0px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
    },
  },
  plugins: [scrollbarHide],
};
