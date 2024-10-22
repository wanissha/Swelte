import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';

dotenv.config(); // Load .env files

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist', // Ensure this matches your firebase.json
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.80.6.165:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
