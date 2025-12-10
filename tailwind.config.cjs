/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        slideUp: "slideUp 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      boxShadow: {
        soft: "0 1px 4px rgba(0,0,0,0.08)",
        card: "0 1px 6px rgba(0,0,0,0.12)",
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          dark: "#1e3a8a",
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
