import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        "flag-red": "var(--flag-red)",
        "pitch-green": "var(--pitch-green)",
        line: "var(--line)",
      },
      fontFamily: {
        display: "var(--font-oswald)",
        body: "var(--font-inter)",
        mono: "var(--font-jetbrains)",
      },
    },
  },
  plugins: [],
};

export default config;
