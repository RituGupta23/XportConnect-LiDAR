/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#FF9900', 
        darkGrey: '#232F3E', 
        lightGrey: '#F3F3F3',
        yellowHover: '#FF7F00',
        greyHover: '#131A22',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}