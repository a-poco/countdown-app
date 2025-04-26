/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/app.component.html",
    "./src/**/*.{html,ts}",
  ],
  //this is not working try to fix it before sending it
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