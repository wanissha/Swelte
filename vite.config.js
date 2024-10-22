// import { defineConfig } from 'vite'
// import { svelte } from '@sveltejs/vite-plugin-svelte'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
// })
// import { defineConfig } from 'vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';

// export default defineConfig({
//   plugins: [svelte()],
//   build: {
//     outDir: 'dist'  // Ensure this matches your firebase.json
//   }
// });

import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist', // Ensure this matches your firebase.json
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.80.6.165:3000', // Backend API URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Strips '/api' from the path
      },
    },
  },
});
