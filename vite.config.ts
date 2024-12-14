import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['util', 'stream', 'buffer'],
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'node:util': 'util',
      'node:stream': 'stream-browserify',
      'node:buffer': 'buffer',
    },
  },
  optimizeDeps: {
    include: ['lucid-cardano', 'util', 'stream-browserify', 'buffer'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    global: {},
    'process.env': {},
    'globalThis.Buffer': ['buffer', 'Buffer'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
    rollupOptions: {
      plugins: [
        // Thêm plugin để xử lý node modules
        require('rollup-plugin-node-polyfills')(),
      ],
    },
  },
});
