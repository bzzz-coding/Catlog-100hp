/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs, html, js}",
    "./public/**/*.js"
  ],
  theme: {
    container: {
    },
    extend: {},
  },
  daisyui: {
    // base: true,
    // styled: true,
    // utils: true,
    themes: ["bumblebee", "night"],
    // darkTheme: "night",
  },
    plugins: [
      require('daisyui'),
    ],
  }
