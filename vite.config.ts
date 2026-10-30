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
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // Higher priority keeps React out of the three chunk, which
            // would otherwise absorb it as a shared dependency.
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 2,
            },
            {
              name: 'three',
              priority: 1,
              test: /node_modules[\\/](three|@react-three)[\\/]/,
            },
          ],
        },
      },
    },
  },
});
