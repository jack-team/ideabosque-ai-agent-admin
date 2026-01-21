import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import autoprefixer from 'autoprefixer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
//@ts-ignore
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
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            const uis = [
              'antd',
              '@rc-component',
              '@ant-design'
            ];

            if (id.includes('node_modules')) {

              if (uis.some(v => id.includes(v))) {
                return 'vender-ui';
              }

              if (id.includes('highlight')) {
                return 'highlight';
              }

              return 'vender';
            }
          }
        }
      }
    }
  }
});
