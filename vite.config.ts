import path from 'path';

import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import { HotReloadJSON } from './tools/plugins';

export default defineConfig({
  plugins: [
    reactRefresh({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
    HotReloadJSON(),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source/'),
    },
  },
  server: {
    port: 4000,
    host: true,
    watch: {
      ignored: ['**/__tests__/**', '**/tests/**'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020',
  },
});
