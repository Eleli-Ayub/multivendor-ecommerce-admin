/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": {
          DEFAULT: "#DC5F00",
        },
        "secondary-orange": {
          DEFAULT: "#CF0A0A",
        },
        "tertiary-orange": {
          DEFAULT: "#D63505",
        },
        "primary-green": {
          DEFAULT: "#A8DF8E",
        },

        "secondary-green": {
          DEFAULT: "1A5D1A",
        },
        black: {
          DEFAULT: "#000000",
          100: "#100d25",
          200: "#090325",
        },
        "gray-light": {
          DEFAULT: "#EEEEEE",
        },
        "white-100": {
          DEFAULT: "#f3f3f3",
        },
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(0, 0, 0, 0.3)",
        custom: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      },
    },

    plugins: [],
  },
};
