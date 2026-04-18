import type { Config } from "tailwindcss";

const ambientBaseColors = {
  micro: "#FFFFFF",
  linen: "#F6F6F6",
  limao: "#D9FF4F",
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
} as const;

const cadernoAzulPalette = {
  "classic-blue": "#3F6098",
  provence: "#7292C6",
  "baby-blue": "#AEC2D5",
  monument: "#8D959D",
  midnight: "#092742",
  heritage: "#0D3E69",
  atelier: "#0F4C81",
  royal: "#11548F",
  sky: "#197ACF",
  glow: "#00FFFF",
} as const;

const galeriaTreflePalette = {
  terracotta: "#B97A59",
  charcoal: "#111111",
  wood: "#6D7F71",
  line: "#6C7B8B",
  glow: "#00FFFF",
} as const;

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
};

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
          ...ambientBaseColors,
          "caderno-azul": cadernoAzulPalette,
          "galeria-trefle": galeriaTreflePalette,
        },
      },
      backgroundImage: {
        "caderno-azul-cover": `radial-gradient(circle at 50% 18%, rgb(${hexToRgb(ambientBaseColors.electric)} / 0.98) 0%, transparent 28%), linear-gradient(180deg, ${ambientBaseColors.deep} 0%, ${ambientBaseColors.electric} 54%, ${ambientBaseColors.cyan} 100%)`,
        "galeria-trefle-cover": `radial-gradient(circle at 34% 18%, rgb(${hexToRgb(galeriaTreflePalette.glow)} / 0.22) 0%, transparent 22%), linear-gradient(145deg, ${galeriaTreflePalette.terracotta} 0%, ${galeriaTreflePalette.charcoal} 52%, ${galeriaTreflePalette.wood} 100%)`,
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
