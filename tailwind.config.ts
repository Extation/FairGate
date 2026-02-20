import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fair: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fc",
          400: "#36adf8",
          500: "#0c93e9",
          600: "#0074c7",
          700: "#015ca1",
          800: "#064f85",
          900: "#0b426e",
          950: "#072a49",
        },
        bronze: {
          DEFAULT: "#CD7F32",
          light: "#D4944A",
          dark: "#A66528",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          light: "#D4D4D4",
          dark: "#A0A0A0",
        },
        gold: {
          DEFAULT: "#FFD700",
          light: "#FFE44D",
          dark: "#CCB000",
        },
        platinum: {
          DEFAULT: "#E5E4E2",
          light: "#F0EFED",
          dark: "#B8B7B5",
        },
        dark: {
          50: "#f6f6f7",
          100: "#e2e3e5",
          200: "#c4c5ca",
          300: "#9fa1a8",
          400: "#7b7d86",
          500: "#61636b",
          600: "#4c4e55",
          700: "#3e4046",
          800: "#2a2b30",
          900: "#1a1b1f",
          950: "#0d0e10",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #0d0e10 0%, #072a49 50%, #0d0e10 100%)",
        "hero-pattern-light":
          "linear-gradient(135deg, #f0f7ff 0%, #e0effe 50%, #f0f7ff 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(12, 147, 233, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(12, 147, 233, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
