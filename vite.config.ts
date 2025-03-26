import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'unplugin-vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Config pour SSR (Server-Side Rendering)
  build: {
    ssr: 'src/entry-server.ts', // Point d'entrée pour le serveur
    outDir: './dist', // Dossier de sortie
    rollupOptions: {
      input: 'src/entry-client.ts' // Point d'entrée pour le client
    }
  }
})
