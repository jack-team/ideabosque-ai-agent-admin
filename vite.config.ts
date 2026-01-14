import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath, URL } from 'node:url';

const uiLibs1 = [
  'antd',
  'react-dnd',
  'rc-field-form',
  '@ant-design/icons'
];

const uiLibs2 = [
  '@ant-design/pro-components',
  '@shopify/polaris-icons',
  'react-syntax-highlighter',
  'react-dnd-html5-backend'
];

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
            sdkUrl: getEnvVal('ENV_AI_SDK_URL'),
            sdkVersion: getEnvVal('ENV_AI_SDK_VERSION')
          }
        }
      }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
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
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (uiLibs1.some(v => id.includes(v))) {
                return 'ui-vendor-1';
              }
              if (uiLibs2.some(v => id.includes(v))) {
                return 'ui-vendor-2';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
