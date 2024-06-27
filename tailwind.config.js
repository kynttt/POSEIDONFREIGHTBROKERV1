// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add more paths as needed for Tailwind CSS to scan for classes
  ],
  theme: {
    extend: {
      fontWeight: {
        'extrabold': 1500, // Example of extending fontWeight scale
      }, 
      height: {
        '500px': '500px', // Example of extending height scale
      },
      width: {
        '500px': '500px', // Example of extending height scale
      },
      colors: {
        // Define custom colors if needed
        'primary': '#252F70',
        'secondary': '#7783D2',
        'tertiary': '#bbc1e8',
        'white': '#FEFEFE',
        'grey': '#DCDCDC',
        

      },
    },
  },
  plugins: [
    // Include any Tailwind CSS plugins here if required
  ],
};