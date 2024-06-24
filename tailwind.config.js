/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        'extrabold': 1500,
      }, 
      height: {
        '500px': '500px',
      },
    },
  },
  plugins: [],
}
