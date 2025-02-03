import type { Config } from "tailwindcss";
import scrollbarPlugin from 'tailwind-scrollbar';

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    // @ts-expect-error - no types available
    function({ addBase, theme }) {
      addBase({
        '*': {
          '--scrollbar-thumb': theme('colors.emerald.800'),
          '--scrollbar-track': theme('colors.neutral.900'),
          '--scrollbar-width': '8px',
        },
      });
    },
    scrollbarPlugin({ nocompatible: true }),
  ],
} satisfies Config;

export default config;