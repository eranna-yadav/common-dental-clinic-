import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        primary: { DEFAULT: token("primary"), dark: token("primary-dark") },
        mint: token("mint"),
        navy: token("navy"),
        coral: { DEFAULT: token("coral"), dark: token("coral-dark") },
        bg: token("bg"),
        surface: token("surface"),
        card: token("card"),
        ink: token("ink"),
        heading: token("heading"),
        muted: token("muted"),
        line: token("line"),
        link: token("link"),
        success: token("success"),
        error: token("error"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem", "3xl": "1.5rem" },
      boxShadow: {
        soft: "0 1px 2px rgb(11 31 51 / 0.04), 0 4px 16px -4px rgb(11 31 51 / 0.08)",
        lift: "0 2px 4px rgb(11 31 51 / 0.04), 0 16px 40px -12px rgb(11 31 51 / 0.18)",
        glow: "0 10px 30px -10px rgb(15 118 110 / 0.45)",
      },
      maxWidth: { content: "1200px" },
      keyframes: {
        "float-y": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "float-y": "float-y 6s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
