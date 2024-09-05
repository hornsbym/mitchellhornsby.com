import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#679d41",
        secondary: "#9d4841",
        accent1: "#41959d",
        accent2: "#76419d",
        background: "#111827",
        background_gradient: "#1a2431",
        overlay: 'rgba(39, 39, 42, .6)'
      },
      dropShadow: {
        dark: `4px 4px 8px rgba(250, 204, 21, .3)`,
        light: `4px 4px 8px rgba(12, 74, 110, .50)`
      },
      fontFamily: {
        header: ['var(--sora-font)'],
        body: ['var(--quicksand-font)']
      },
    },
    keyframes: {
      squish: {
        '0%, 100%': { transform: 'scaleY(1)' },
        '50%': { transform: 'scaleY(.5)' },
      },
      shapeDrift: {
        'from': { top: '0px' },
        'to': { top: '1000px' }
      }
    },
    animation: {
      squish: 'squish 350ms ease-in-out infinite',
      shapeDrift: 'shapeDrift 1s ease-linear'
    }
  },
  plugins: [],
};
export default config;
