import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { canvas: "#0A0A0A", surface: "#111111", gold: { DEFAULT: "#C8A45D", hover: "#D8B97A" }, "text-secondary": "#CFCFCF" },
      fontFamily: { display: ["var(--font-playfair)", "serif"], body: ["var(--font-inter)", "sans-serif"] },
      spacing: { 18: "4.5rem", 22: "5.5rem", 30: "7.5rem" },
    },
  },
  plugins: [],
};

export default config;
