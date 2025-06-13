import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          libs: Object.keys(dependencies)
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
