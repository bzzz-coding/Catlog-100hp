/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  daisyui: {
    base: true,
    styled: true,
    utils: true,
    themes: ["bumblebee", "night"],
    darkTheme: "night",
  },
    plugins: [
      require('daisyui'),
    ],
  }
