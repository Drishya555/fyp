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
        sans: ['Merriweather', 'serif'], // Set Merriweather as the default serif font
      },
      colors: {
        "dark-gray": "#1E1E2C",
        "bgpurple": "#2B2738",
        "forminside": "#3B364C",
        "textform": "#5D5A6D",
        "purplebutton": "#6E54B5",
      },
    },
  },
  plugins: [],
};
