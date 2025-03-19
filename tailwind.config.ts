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
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      boxShadow: {
        light: "0 1px 3px rgba(0,0,0,0.04)",
        medium: "0 3px 12px rgba(0,0,0,0.08)",
        card: "0 1px 2px rgba(0,0,0,0.06), 0 3px 8px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [
    // @ts-expect-error - no types available
    function({ addBase, theme }) {
      addBase({
        '*': {
          '--scrollbar-thumb': theme('colors.primary'),
          '--scrollbar-track': theme('colors.secondary'),
          '--scrollbar-width': '4px',
        },
      });
    },
    scrollbarPlugin({ nocompatible: true }),
  ],
} satisfies Config;

export default config;