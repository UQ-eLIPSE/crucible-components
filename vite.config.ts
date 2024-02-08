/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@data": fileURLToPath(new URL("./data", import.meta.url)),
      "@type": fileURLToPath(new URL("./src/types", import.meta.url)),
    },
  },
  test: {
    files: ["tests/components/*.test.ts"],
    globals: true,
    environment: "jsdom",
  },
});
