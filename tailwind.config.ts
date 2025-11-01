import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Architectural Glass Design System
        background: "#FAFAF8",
        paper: "#FFFFFF",
        foreground: "#111111",
        primary: "#E01919",
        "primary-foreground": "#FFFFFF",
        secondary: "#666666",
        tertiary: "#999999",
        "border-light": "#E6E6E6",
        accent: "#E01919",
        muted: "#F5F5F3",
        "muted-foreground": "#666666",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'hero': ['7rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backdropBlur: {
        'glass': '14px',
      },
      animation: {
        'grain': 'grain 6s steps(10) infinite',
        'wipe-in': 'wipe-in 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        grain: {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-5% -10%' },
          '20%': { backgroundPosition: '-15% 5%' },
          '30%': { backgroundPosition: '7% -25%' },
          '40%': { backgroundPosition: '20% 25%' },
          '50%': { backgroundPosition: '-25% 10%' },
          '60%': { backgroundPosition: '15% 30%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '25% 5%' },
          '90%': { backgroundPosition: '10% -10%' },
        },
        'wipe-in': {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0 0 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
