/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spaceBg: '#080808',       // Void black
        spaceCard: '#2D2E32',     // Console grey
        spaceBorder: '#2D2E32',   // Console border grey
        spaceAccent: '#FFB300',   // Astrophage amber
        spaceSafe: '#00E5FF',     // Neon Tokyo cyan
        spaceWarning: '#FFB300',  // Astrophage amber warning
        spaceDanger: '#E63946',   // Crimson sun blackout
        sakuraPink: '#FDA4AF',    // Cherry blossom pink
      },
      fontFamily: {
        sans: ['Rajdhani', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
