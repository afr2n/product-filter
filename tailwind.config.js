/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          1: 'rgb(var(--color-accent-1))',
          2: 'rgb(var(--color-accent-2))',
        },
        bkg: 'rgb(var(--color-bkg))',
        textColor: {
          DEFAULT: `rgb(var(--color-textColor))`,
          70: `rgba(var(--color-textColor), 0.7)`,
        },
      },
    },
  },
  plugins: [],
}
