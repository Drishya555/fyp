/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        customRgba: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Arial', 'sans-serif'], // Use SF Pro Display as the primary font
      },
      colors: {
        "dark-gray": "#1E1E2C",
        "bgpurple": "#2B2738",
        "forminside": "#3B364C",
        "textform": "#5D5A6D",
        "purplebutton": "#6E54B5",
        "textcol": "#233182",
        "login": "#e8e8e8",
        "homegrey": "#F2F4F4",
        "lightpurple": "#3c096c",
        "homegreen": "#1D7713",
        "homered": "#7E1814",
        "homepurple": "#592474",
        "pharmadark": "#163300",
        "pharmalight": "#a5e677"
      },
    },
  },
  plugins: [],
};