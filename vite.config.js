import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets", // Source folder for i18n files
          dest: ".", // Destination folder in dist
        },
      ],
    }),
  ],
  define: {
    global: "window", // Define `global` as `window` for browser compatibility
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src",
      stream: "stream-browserify", // Add stream polyfill
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@azure/storage-blob"],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Polyfill for Buffer
          process: true, // Polyfill for process
        }),
      ],
    },
  },
});
