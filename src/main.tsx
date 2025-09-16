import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

// Get the root element from the HTML
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

// Create React 18 root
const root = createRoot(container);

// Render the app inside StrictMode and BrowserRouter
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
