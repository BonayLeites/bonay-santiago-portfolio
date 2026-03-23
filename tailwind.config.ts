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
        // Warm stone palette
        stone: {
          50: "#faf9f7",
          100: "#f5f3ef",
          200: "#e8e4dd",
          300: "#d4cec3",
          400: "#b5ac9e",
          500: "#968c7d",
          600: "#7a7067",
          700: "#635a53",
          800: "#524a44",
          900: "#3d3733",
          950: "#1e1b18",
        },
        // Vermillion accent (Japanese-inspired)
        accent: {
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#ffcdc8",
          300: "#fda8a0",
          400: "#f97468",
          500: "#e84d3d",
          600: "#d63626",
          700: "#b3281c",
          800: "#94251b",
          900: "#7c251d",
          950: "#430f0a",
        },
        // Deep indigo for secondary accents
        ink: {
          50: "#f0f1f8",
          100: "#dfe1ee",
          200: "#c5c7e0",
          300: "#9fa3cd",
          400: "#7478b5",
          500: "#565a9e",
          600: "#454886",
          700: "#3a3c6d",
          800: "#34365b",
          900: "#2e304d",
          950: "#1a1b2e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
