/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#121212",
        "surface-border": "#222222",
        cyan: {
          DEFAULT: "#00F0FF",
          glow: "rgba(0, 240, 255, 0.35)",
        },
        magenta: {
          DEFAULT: "#FF007A",
          glow: "rgba(255, 0, 122, 0.35)",
        },
        kinetic: {
          white: "#F5F5F5",
          gray: "#8E8E93",
          dark: "#141414",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
