import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

export const Plugins = [
  react(),
  mkcert({ hosts: ['localhost'] }),
  svgr({
    exportAsDefault: true,
    svgrOptions: { titleProp: true },
  }),
  tailwindcss(),
];
