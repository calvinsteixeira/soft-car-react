import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  proxy: {
    "/": {
      target: `http://localhost:${process.env.PORT}/`,
    },
  },
  server: {
    port: process.env.PORT || 3000,
  },
  plugins: [react()],
});
