import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "9/16": "9 / 16",
      },
      maxWidth: {
        "3/4": "75%",
      },
      fontFamily: {
        raleway: ["Raleway"],
      },
      fontSize: {
        xs: "0.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "card-text-green": "url('/assets/bg-card-green.svg')",
        "card-text-yellow": "url('/assets/bg-card-yellow.svg')",
        "card-text-purple": "url('/assets/bg-card-purple.svg')",
        "card-text-red": "url('/assets/bg-card-red.svg')",
        "card-text-blue": "url('/assets/bg-card-blue.svg')",
      },
    },
    colors: {
      yellow: {
        light1: "#FFF4D6",
        light2: "#FFDE85",
        DEFAULT: "#FFCA3A",
        dark1: "#F5B400",
        dark2: "#CC9600",
      },
      purple: {
        light1: "#E8DDF9",
        light2: "#BB98EC",
        DEFAULT: "#A359FF",
        dark1: "#6A31B6",
        dark2: "#361367",
      },
      red: {
        light1: "#FDD8DA",
        light2: "#F88B8F",
        DEFAULT: "#F94848",
        dark1: "#D40C13",
        dark2: "#AE0A10",
      },
      blue: {
        light1: "#DDF4F9",
        light2: "#98DDEC",
        DEFAULT: "#27B3D2",
        dark1: "#1C849B",
        dark2: "#166779",
      },
      green: {
        light1: "#DAFBDF",
        light2: "#7FE290",
        DEFAULT: "#23C43D",
        dark1: "#OB6F1C",
        dark2: "#074A12",
      },
      white: "#FAF2FF",
      black: "#202020",
      grey: "#3C3B3D",
    },
  },
  plugins: [],
};
export default config;
