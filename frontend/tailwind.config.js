/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-30": "rgba(0, 0, 0, 0.3)",
        "black-50": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  variants: {},
  plugins: [],
};
