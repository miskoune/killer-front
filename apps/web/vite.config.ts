import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'source/') } },
  server: {
    port: 4000,
    host: true,
    watch: { ignored: ['**/__tests__/**', '**/tests/**', 'coverage/**'] },
  },
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
  build: { target: 'es2020', outDir: 'build' },
  plugins: [
    react(),
    mkcert({ hosts: ['localhost'] }),
    svgr({
      exportAsDefault: true,
      svgrOptions: { titleProp: true },
    }),
    tailwindcss(),
  ],
});
