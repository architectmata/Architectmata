import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EC",
        ink: "#28322D",
        clay: "#B86F52",
        sun: "#E7B75F",
        sky: "#AFC8C4",
        rose: "#D9AEA0",
        plaster: "#f6efe3",
        limewash: "#fffaf0",
        sandstone: "#d6b476",
        terracotta: "#a94f2a",
        sienna: "#78351f",
        teak: "#5b3625",
        brick: "#8f3d2e",
        indigo: "#143756",
        olive: "#657146",
        marigold: "#d99b22",
        peacock: "#117488",
        moss: "#546b45",
        copper: "#b76d3a"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(40,50,45,.10)",
        line: "0 1px 0 rgba(91,54,37,0.16)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        paper:
          "radial-gradient(circle at 20% 20%, rgba(169,79,42,.08), transparent 28%), radial-gradient(circle at 80% 0%, rgba(17,116,136,.08), transparent 24%)"
      }
    }
  },
  plugins: []
};

export default config;
