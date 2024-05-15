/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const buildAsLibrary = process.env.BUILDASLIBRARY === "true";
const isTest = process.env.MODE === "test";
export default defineConfig({
  plugins: [vue()],
  root: fileURLToPath(new URL(".", import.meta.url)),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@type": fileURLToPath(new URL("./src/types", import.meta.url)),
    },
  },
  build: buildAsLibrary && {
    lib: {
      entry: "./src/ViewerPlugin.ts",
      name: "CruciblePlugin",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    globals: true,
    environment: "jsdom",
  },
  server: {
    open: isTest ? "/tests/testApp.vue" : "/index.html", // Open testApp.vue if in test mode
  },
});
