/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spaceBg: '#0B0C10',       // Obsidian Void
        spaceCard: '#1F2833',     // Titanium fuselage steel cards
        spaceBorder: '#2E3A4E',   // Bulkhead joint frame
        spaceAccent: '#66FCF1',   // Xenon Ice Blue (Primary Accent)
        spaceSafe: '#66FCF1',     // Xenon Ice Blue (Nominal)
        spaceWarning: '#F59E0B',  // Astrophage Gold (Solar weather alert)
        spaceDanger: '#EF4444',   // Solar radiation red
        sakuraPink: '#FDA4AF',    // Soft Sakura pink (Cherry blossom highlight)
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
