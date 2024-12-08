import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', 'lucid-cardano'],
    // exclude: ['lucid-cardano'],
  },
  resolve: {
    alias: {
      // Optional: Add aliases if needed
      '@': path.resolve(__dirname, './src'),
    },
  },
});
