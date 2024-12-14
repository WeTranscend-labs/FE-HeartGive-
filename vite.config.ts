import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// vite.config.ts
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), topLevelAwait(), wasm()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "node-fetch": "node-fetch-polyfill",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
    exclude: ["lucid-cardano", "lucide-react"],
  },
  build: {
    target: "es2020",
  },
});
