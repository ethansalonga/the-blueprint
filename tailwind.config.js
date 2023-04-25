/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        161616: "#161616",
        f3eed9: "#f3eed9",
        824936: "#824936",
        "222c2a": "#222c2a",
      },
      spacing: {
        "20%": "20%",
        "40%": "40%",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
      letterSpacing: {
        widest: ".25em",
      },
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
