import postcssPresetMantine from 'postcss-preset-mantine';
import postcssSimpleVars from 'postcss-simple-vars';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  theme: {
    extend: {
      colors: {
        primary: "#252F70",
      },
      width: {
        p40: "40%",
      },
    },
  },
  plugins: [
    postcssPresetMantine,
    postcssSimpleVars({
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    }),
    tailwindcss,
    autoprefixer,
  ],
};
