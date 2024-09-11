import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        josefin_sans: ["var(--font-josefin-sans)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--gradient-color-stops))",
      },
      screens: {
        "400px": "400px",
        "800px": "800px",
        "1080px": "1080px",
        "1280px": "1280px",
        "1440px": "1440px",
        "1680px": "1680px",
        "1920px": "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
