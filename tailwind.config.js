/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      content: ['before'],
      colors: {
        'darkerbritish-racing-green': '#002814',
        'british-racing-green': '#004225', // Adding British racing green color
        'lighterbritish-racing-green': '#006400', // Adding British racing green color
        'mustard-yellow': '#FFDB58', // Adding mustard yellow color
        'rich-gold' : '#D4AF37', // Adding rich gold color
        'deep-cream' : '#FFFDD0',
        'turquoise' : '#30D5C8',
        'magenta' : '#FF00FF',
        'bamboo' :  '#61674f',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-to-british-racing-green': 'linear-gradient(to right, #004225, #006400)', // Custom gradient
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}