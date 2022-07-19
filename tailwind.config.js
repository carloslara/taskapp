/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appBlue:{
          light:"#F0F4F7",
          DEFAULT: '#22A2F2',
          dark: '#0373B5',
          soft: '#047EC4'
        },
        appRed:{
          DEFAULT:"#FF4457"
        }
      }
    },
  },
  plugins: [],
}
