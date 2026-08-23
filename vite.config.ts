import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './', // Ensures relative assets work on GitHub Pages subpaths and custom domains
  server: {
    port: 5173,
  },
});
