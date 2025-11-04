import { defineConfig, loadEnv } from 'vite';
import svgr from "vite-plugin-svgr";
import autoprefixer from "autoprefixer";
import { createHtmlPlugin } from "vite-plugin-html";
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react';

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
            vendor: [
              'react',
              'react-dom',
              'react-router',
              'react-router-dom',
              'zustand',
              'ahooks',
              '@shopify/app-bridge-react'
            ],
            utils: [
              'lodash',
              'dayjs',
              'axios',
              'uuid',
              'clone-deep'
            ],
            ui: [
              'antd',
              '@ant-design/icons',
              '@ant-design/pro-components',
              '@shopify/polaris-icons'
            ]
          },
          chunkFileNames: (chunkInfo) => {
            const mid = chunkInfo.facadeModuleId
            let folder = 'chunks';
            let fileName = '[name]-[hash].js';

            if (mid?.includes('node_modules')) {
              folder = 'vendor';
            }
            if (mid?.includes('src/components')) {
              folder = 'components';
            }
            if (mid?.includes('src/pages')) {
              folder = 'pages';
            }
            return [folder, fileName].join('/');
          },
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
