import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['stream'],
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      stream: 'stream-browserify',
      'node:stream': 'stream-browserify',
    },
  },
  optimizeDeps: {
    include: ['lucid-cardano', 'stream-browserify'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    global: {},
    'process.env': {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      plugins: [],
    },
  },
});
