import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/test-jobs/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "motion",
      "@reduxjs/toolkit",
      "react-redux",
      "lucide-react",
      "react-virtuoso",
      "usehooks-ts",
      "html-react-parser",
      "vaul",
    ],
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          framer: ["motion"],
          lucide: ["lucide-react"],
          virtuoso: ["react-virtuoso"],
          hooks: ["usehooks-ts"],
          parser: ["html-react-parser"],
          vaul: ["vaul"],
        },
      },
    },
  },
});

