/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx,jsx}', './src/components/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      grayscale: {
        10: '10%',
        20: '20%',
        30: '30%',
        40: '40%',
        50: '50%',
      },
    },
    container: {
      center: true,
      padding: '10px',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
      },
    },
  },
  plugins: [],
};
