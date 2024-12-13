import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import { ThemeProvider } from "./context/theme-provider";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);
