/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Barlow', 'sans-serif'],
      },
      colors: {
        primary: '#bef264',
      },
    },
  },
  plugins: [],
}
