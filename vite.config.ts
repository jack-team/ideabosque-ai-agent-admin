import { defineConfig, loadEnv } from 'vite';
import svgr from "vite-plugin-svgr";
import autoprefixer from "autoprefixer";
import { createHtmlPlugin } from "vite-plugin-html";
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig((config) => {
  const mode = config.mode;
  const envDir = './env';
  const envPrefix = ['ENV'];

  // 获取环境变量
  const getEnv = (key: string) => {
    return loadEnv(mode, envDir, envPrefix)[key];
  };

  return {
    plugins: [
      react(),
      svgr(),
      createHtmlPlugin({
        inject: {
          data: {
            title: getEnv("ENV_APP_NAME"),
          }
        }
      })
    ],
    envDir,
    envPrefix,
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
    css: {
      postcss: {
        plugins: [autoprefixer(["Last 5 versions"])],
      }
    }
  }
})
