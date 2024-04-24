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
      "@type": fileURLToPath(
        new URL("./src/plugins/CruciblePlugin/types", import.meta.url),
      ),
    },
  },
  build: {
    lib: {
      entry: "./src/plugins/CruciblePlugin/ViewerPlugin.ts", // Update this path
      name: "CruciblePlugin",
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
        // Ensuring CSS is bundled separately if needed
        // assetFileNames: (assetInfo) => {
        //   if (assetInfo.name.endsWith(".css")) return "[name][extname]";
        //   return "[name][extname]";
        // },
      },
    },
  },

  test: {
    include: ["tests/**/*.test.ts"],
    globals: true,
    environment: "jsdom",
  },
});
