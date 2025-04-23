import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./components/App.tsx";
import { StrictMode } from "react";
import { createQueryClient } from "./create-query-client.ts";
import { QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Cannot find the root element");
}

const queryClient = createQueryClient();

createRoot(rootElement).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <div className={"container mx-auto pt-8"}>
      <App />
    </div>
  </QueryClientProvider>
// </StrictMode>,
);
