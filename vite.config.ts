import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: resolve(__dirname, 'site'),
  publicDir: '../public',
  plugins: [react()],
  build: {
    outDir: '../dist-site',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@tokens': resolve(__dirname, 'tokens'),
      '@build': resolve(__dirname, 'build'),
      '@primitives': resolve(__dirname, 'primitives'),
      '@site': resolve(__dirname, 'site'),
    },
  },
  server: {
    port: 3100,
  },
});
