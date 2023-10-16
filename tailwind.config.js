/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#09011B',
        'secondary':'#0091FF',


      },
      fontFamily:{
        sans:['var(--fontspring)']
      }
    },
  },
  plugins: [],
}
// background: linear-gradient(0deg, rgba(9, 24, 67, 0.4), rgba(9, 24, 67, 0.4)),
// linear-gradient(91.32deg, #40CBFF 0.8%, #40FFCC 103.85%);

