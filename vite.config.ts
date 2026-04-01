import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hsvutil.smarthub.coop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/services'),
      },
    },
  },
})
