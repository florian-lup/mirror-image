import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          light: '#F5F5F5', // Neutral light gray
          dark: '#121212', // Neutral dark
        },
        accent: {
          light: '#A3A3A3', // Medium gray for light mode borders
          DEFAULT: '#737373', // Medium gray
          dark: '#525252', // Lighter dark gray for dark mode borders
        },
        content: {
          light: '#262626', // Dark gray for light mode text
          DEFAULT: '#525252', // Medium gray for secondary text
          dark: '#F5F5F5', // Light gray for dark mode text
        },
        primary: {
          light: '#A3A3A3', // Medium gray for light mode
          DEFAULT: '#525252', // Darker medium gray
          dark: '#404040', // Dark gray
        }
      },
    },
  },
  plugins: [],
};

export default config;
