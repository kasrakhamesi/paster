/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        CustomBlack: "#0A0B14",
        CustomGray: "#1D202D",
        CustomGrayDarker: "#9E9E9E",
        CustomGreen: "#C5FF4B",
        asterfiDarkGreen: "#94c232",
        asterfiPink: "#f1a9d3",
        asterfiBlue: "#5C99AE",
        asterfiYellow: "#F5DE68",
        asterfiOrange: "#E4AF81"

      },
      fontFamily: {
        Tactic: "Tactic",
        Gilroy: "Gilroy",
        GilroyBlack: "GilroyBlack",
        GilroyBold: "GilroyBold",
        GilroyRegular: "GilroyRegular",
        GilroyThin: "GilroyThin",
        GilroyUltraLight: "GilroyUltraLight",
      },
    },
  },
  daisyui: {
    themes: [{
      dark: {
        ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
        "primary": "#1D202D",
        "primary-focus": "#0A0B14",
        "base-content": "#ffffff",
        "accent": "#C5FF4B",
        "accent-content": "#0A0B14",
      }
    }, {
      cupcake: {
        ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
        "accent": "#2AA227",
        "accent-content": "#ffffff",
        "--rounded-btn": ".5rem",
      },
      forest: {
        ...require("daisyui/src/theming/themes")["[data-theme=forest]"],
        "accent": "#C5FF4B",
        "accent-content": "#ffffff",
        "base": "#2AA227",
        "secondary": "#3B2F2F",
        "--rounded-btn": ".5rem",
      },
    }, "light", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula"],

  },
  plugins: [require('daisyui')],
})
