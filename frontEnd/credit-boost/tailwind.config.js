/** @type {import('tailwindcss').Config} */ 
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#02A669",
          light: "#05B19B",
        },
        secondary: {
          DEFAULT: "#0177A5",
          light: "#12AACF",
        },
        background: "#F6F8F6",
        foreground: "#000000",
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#02A669",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#05B19B",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
      },
      fontFamily: {
        brand: ["'Montserrat'", 'sans-serif'],
      },
      fontSize: {
        'brand-credit': ['2rem', { letterSpacing: '0.01em', fontWeight: '900' }],
        'brand-boost': ['2rem', { letterSpacing: '0.01em', fontWeight: '700', color: '#02A669' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};