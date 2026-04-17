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
        ambient: {
          micro: "#FFFFFF",
          linen: "#F6F6F6",
          stone: "#D9D9D9",
          charcoal: "#252021",
          dark: "#111111",
          muted: "#8C8C8C",
          deep: "#050A30",
          electric: "#0000FF",
          cyan: "#00FFFF",
          canyon: "#8C8C8C",
          terracota: "#b97a59",
          wood: "#6d7f71",
          blue: "#24386F",
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "var(--font-barlow)", "system-ui", "sans-serif"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        brand: ["var(--font-syncopate)", "var(--font-barlow-condensed)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-massive": ["8rem", { lineHeight: "0.8", letterSpacing: "-0.055em" }],
        "display-lg": ["5.5rem", { lineHeight: "0.84", letterSpacing: "-0.045em" }],
        "display-md": ["3.5rem", { lineHeight: "0.88", letterSpacing: "-0.035em" }],
        "display-sm": ["2.5rem", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "detail": ["0.72rem", { lineHeight: "1.5", letterSpacing: "0.16em" }],
        "label": ["0.78rem", { lineHeight: "1.4", letterSpacing: "0.22em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      transitionDuration: {
        "700": "700ms",
        "900": "900ms",
        "1200": "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
