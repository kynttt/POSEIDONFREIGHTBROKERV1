// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add more paths as needed for Tailwind CSS to scan for classes
  ],
  theme: {
    screens: {
      xs: "20em", // Approximately 320px
    },
    extend: {
      screens: {
        sm: "30em", // Approximately 480px
        md: "48em", // Approximately 768px
        lg: "75em", // Approximately 1200px
        xl: "80em", // Approximately 1280px
      },
      fontWeight: {
        extrabold: 1500, // Example of extending fontWeight scale
      },
      height: {
        "500px": "500px", // Example of extending height scale
      },
      width: {
        "500px": "500px", // Example of extending height scale
      },
      colors: {
        // Define custom colors if needed
        primary: "#252F70",
        secondary: "#7783D2",
        tertiary: "#bbc1e8",
        white: "#FEFEFE",
        grey: "#DCDCDC",
        "light-grey": "#eeeeee",
        green: "#54AB82",
        price: "#00D9C9",
        darkBg: "#0d0e11",
        accentBg: "#11141b",
        teal: "#02FFE2",
        "freightquote-bg": "#6084F0",
        rblue: "#001C7C",
        lblue: "#A3C6FF",
        sblue: "#CBDFFF",
        nblue: "#003C9D"
      },
    },
  },
  plugins: [
    // Include any Tailwind CSS plugins here if required
  ],
};
