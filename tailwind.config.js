/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./film.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        desktop: "1920px",
      },
    },
  },
  plugins: [],
}
