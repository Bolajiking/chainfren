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
        sans:['var(--Fontspring)'],
        serif:['var(--HKGrotesk)']
      },
      fontSize:{
        xlClamp:"clamp(2rem,10vw,4rem)",
        lgClamp:"clamp(1.5rem,10vw,3.5rem)",
        mdClamp:"clamp(1rem, 10vw, 3rem)"
        
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

