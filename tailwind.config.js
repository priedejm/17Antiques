import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      colors: {
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: "#f5f3f0",
              100: "#e8e4db",
              200: "#d2c9b7",
              300: "#bbad93",
              400: "#a5927a",
              500: "#8e7760",
              600: "#725f4d",
              700: "#55473a",
              800: "#392f26",
              900: "#1c1713",
              DEFAULT: "#55473a",
              foreground: "#ffffff"
            },
          }
        }
      }
    })
  ],
};