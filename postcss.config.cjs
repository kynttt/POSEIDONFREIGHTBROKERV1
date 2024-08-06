module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#252F70",
      },
      width: {
        p40: "40%",
      },
    },
    screens: {
      xs: "36em", // 576px
      sm: "48em", // 768px
      md: "62em", // 992px
      lg: "75em", // 1200px
      xl: "88em", // 1408px
    },
  },
  plugins: [
    require("postcss-preset-mantine"),
    require("postcss-simple-vars")({
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    }),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
