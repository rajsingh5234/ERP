/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#424242",
        secondary: "#78909C",
        secondaryLite: "#546E7A"
      }
    },
  },
  plugins: [],
}