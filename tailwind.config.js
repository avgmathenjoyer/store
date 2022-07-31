/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Montserrat", ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(at center center, rgb(254, 243, 199), rgb(250, 250, 250), rgb(255, 255, 255))'
      }
    },
  },
  plugins: [],
}
