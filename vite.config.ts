import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig((config) => {
  const { mode } = config;
  const envDir = './env';
  const envPrefix = 'ENV';

  const getEnvVal = (key: string) => {
    return loadEnv(mode, envDir, envPrefix)[key];
  }

  return {
    envDir,
    envPrefix,
    plugins: [
      react(),
      svgr(),
      createHtmlPlugin({
        inject: {
          data: {
            appId: getEnvVal("ENV_SHOPIFY_APP_ID"),
            title: getEnvVal("ENV_APP_NAME"),
            sdkUrl: getEnvVal('ENV_AI_SDK_URL')
          }
        }
      })
    ],
    server: {
      port: 5999,
      host: '0.0.0.0',
      allowedHosts: true
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
});
