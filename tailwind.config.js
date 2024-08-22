const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inet: ['INET', ...defaultTheme.fontFamily.sans],
      lan: ['LAN', ...defaultTheme.fontFamily.sans],
      uni: ['UNI', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}

