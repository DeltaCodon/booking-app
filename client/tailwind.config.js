/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { themeGold: "#ffad61", themeBlue: "#72bede" },
    },
  },
  plugins: [],
};
