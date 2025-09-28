/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
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
 
    extend: {
      colors:{
        "primary":"#2563eb"
      }
    },
  },
  plugins: [daisyui],
}



