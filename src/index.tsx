import React from "react";
import { createRoot } from "react-dom/client";
import { GlobalStyle } from "./globalStyle";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
