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
        'dark-blue':'#08153C', // Main dark blue from design
        'light-blue':'#E6F4FF', // Light blue background
        'lime-green':'#CCFF00', // Lime green background
        'white':'#FFFFFF',
      },
      fontFamily:{
        sans:['"Inter Display"', 'Inter', 'sans-serif'],
        fontspring:['"Inter Display"', 'Inter', 'sans-serif'],
        serif:['var(--HKGrotesk)']
      },
      fontSize:{
        xlClamp:"clamp(2rem,10vw,4rem)",
        lgClamp:"clamp(1.5rem,10vw,3.5rem)",
        mdClamp:"clamp(1rem, 10vw, 3rem)"
      },
     screens:{
      md2:'870px',
      sm2:'480px'
     },
     animation: {
       'spin-slow': 'spin 20s linear infinite',
     }
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode:'class',
}

