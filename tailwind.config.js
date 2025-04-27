/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/app.component.html",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Open Sauce One",
      },
      colors: {
        ncPurple: '#72035D',
      },
    },
  },
  plugins: [],
} 