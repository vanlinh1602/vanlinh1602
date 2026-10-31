import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// GitHub Pages project sites are served from "/<repo>/"; CI passes "/<repo>".
const BASE_PATH = process.env.BASE_PATH ?? '';

// Absolute site URL for the share tags in index.html; CI passes the Pages URL.
// Without it the tags fall back to root-relative paths.
process.env.VITE_SITE_URL ??= BASE_PATH;

export default defineConfig(({ command }) => {
  // Crawlers ignore relative Open Graph URLs, so say so rather than ship them.
  if (command === 'build' && !/^https?:\/\//.test(process.env.VITE_SITE_URL!)) {
    process.stderr.write(
      '[og] VITE_SITE_URL is not an absolute URL; share previews will not show.\n',
    );
  }
  return {
    base: `${BASE_PATH}/`,
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  };
});
