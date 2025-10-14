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
        brand: {
          DEFAULT: "#004aad",
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#0066ff",
          600: "#0052cc",
          700: "#003d99",
          800: "#002966",
          900: "#001433",
        },
        aqua: {
          DEFAULT: "#00c6ff",
          50: "#e6fbff",
          100: "#ccf7ff",
          200: "#99efff",
          300: "#66e6ff",
          400: "#33deff",
          500: "#00d5ff",
          600: "#00aacb",
          700: "#008098",
          800: "#005665",
          900: "#002c33",
        }
      },
    },
  },
  plugins: [],
};

export default config;
