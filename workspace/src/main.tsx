import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./components/App.tsx";
import { StrictMode } from "react";
import { createQueryClient } from "./create-query-client.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";


const queryClient = createQueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient
  }
})


// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Cannot find the root element");
}

createRoot(rootElement).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>
// </StrictMode>,
);
