/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#674636',
        secondary: '#FFF8E8',
        primaryDark: '#533324',
        primaryLight: '#8a6451'
      },
      fontSize: {
        'h1': ['3rem', { fontWeight: '500', lineHeight: '1.8' }]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    },
  },
  plugins: [],
}

