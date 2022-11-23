/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation : {
        blob : "blob 7s infinite",
        pulseslow: "pulse 7s infinite"
      },
      keyframes : {
        blob: {
          "0%" : {
            transform : "scale(1)"
          },
          "33%" : {
            transform : "scale(1.1)"
          },
          "66%" : {
            transform : "scale(0.9)"
          },
          "100%" : {
            transform : "scale(1)"
          },
        }
      }
    },
  },
  plugins: [],
}