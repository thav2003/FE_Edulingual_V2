/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#58CC02',
      primaryBg: '#58CC02'
    },
    extend: {
      backgroundImage: {
        home: "url('/banner.png')"
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
