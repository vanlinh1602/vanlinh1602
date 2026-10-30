import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// GitHub Pages project sites are served from "/<repo>/"; CI passes "/<repo>".
const BASE_PATH = process.env.BASE_PATH ?? '';

export default defineConfig({
  base: `${BASE_PATH}/`,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // three.js alone is ~600 kB, so the 3D stack gets its own cached chunk.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
