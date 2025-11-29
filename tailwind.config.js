/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fantasy: ['Cinzel', 'serif'], // We'll add this font link later
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'fantasy-dark': '#1a1612',
        'fantasy-paper': '#f4ecd8',
        'fantasy-accent': '#c0392b', // A deep red for highlights
        'fantasy-gold': '#d4af37',
      },
      backgroundImage: {
        'parchment-texture': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
      }
    },
  },
  plugins: [],
}