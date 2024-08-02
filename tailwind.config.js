/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	   screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',

    },
    // darkMode: 'class',
    // colors: {
    //   dark: {
    //     bg: '#1F2937',
    //   },

    // },
    extend: {},
  },
  //   variants: {
  //   backgroundColor: ['dark'],
  // },
  plugins: [
    require('daisyui'),
  ],
}



