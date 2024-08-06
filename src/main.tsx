import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 5,
  breakpoints: {
    xs: "20em", // Approximately 320px
    sm: "30em", // Approximately 480px
    md: "48em", // Approximately 768px
    lg: "75em", // Approximately 1200px
    xl: "80em", // Approximately 1280px
  },
  colors: {
    brand: [
      "#f0f5ff",
      "#d9e2ff",
      "#b2c4ff",
      "#8ca7ff",
      "#657aff",
      "#252F70",
      "#324bcc",
      "#253899",
      "#192666",
      "#0c1333",
    ],
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
