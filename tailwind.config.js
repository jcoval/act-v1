/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1a1a2e',
        surface: '#16213e',
        accent: '#e94560',
        success: '#0f9b58',
        primaryText: '#eaeaea',
        secondaryText: '#8892b0',
        punctuation: '#4fc3f7',
        structure: '#81c784',
        agreement: '#ffb74d',
        wordChoice: '#ce93d8',
        rhetoric: '#f06292',
      }
    },
  },
  plugins: [],
}
