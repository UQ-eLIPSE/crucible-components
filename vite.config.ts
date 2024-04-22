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
  build: {
    lib: {
      entry: "./src/ViewerPlugin.ts", // Update this path
      name: "CrucibleComponent",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
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
});
