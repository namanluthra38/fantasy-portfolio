export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fantasy: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'fantasy-dark': '#1a1612',
        'fantasy-paper': '#f4ecd8',
        'fantasy-accent': '#c0392b',
        'fantasy-gold': '#d4af37',
        'fantasy-visited': '#a3c936',
      },
      backgroundImage: {
        'parchment-texture': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
      }
    },
  },
  plugins: [],
}