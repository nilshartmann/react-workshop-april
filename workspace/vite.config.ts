/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), TanStackRouterVite({ target: "react" }), react()],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",

    setupFiles: ["./vitest-setup.ts"],
    restoreMocks: true,
  },
});
