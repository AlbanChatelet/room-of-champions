/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'] // Ajout de la police Nunito
      }
    }
  },
  plugins: []
}
