module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBg: '#ffffff',
        brandText: '#0f172a',
        brandAccent: '#0ea5e9',
        brandDarkBg: '#0f172a',
        brandDarkCard: '#1e293b',
        brandDarkText: '#f8fafc',
        brandDarkAccent: '#38bdf8'
      },
      boxShadow: {
        card: "0 20px 40px -8px rgba(0,0,0,0.12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    },
  },
  plugins: [],
}
