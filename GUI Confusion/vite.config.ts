import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  build: {
    rollupOptions: {
      input: {
        "condition-a": resolve(__dirname, "condition-a.html"),
        "condition-b": resolve(__dirname, "condition-b.html"),
      },
    },
  },
  server: {
    port: 5173,
  },
});