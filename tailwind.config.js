/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        600: "600px",
        900: "900px",
        1200: "1200px",
        1800: "1800px",
      },
    },
  },
  plugins: [],
}
