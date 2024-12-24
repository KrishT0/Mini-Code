import "@/index.css";
import App from "@/App.jsx";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <App />
      <SpeedInsights />
      <Analytics />
    </QueryClientProvider>
  </ThemeProvider>
);
