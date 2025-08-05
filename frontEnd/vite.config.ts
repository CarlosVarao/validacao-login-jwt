import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ou coloque seu IP: '192.168.0.10'
    port: 5173,
  },
});
