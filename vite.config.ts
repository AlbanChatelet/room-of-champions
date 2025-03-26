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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Ajouter un alias pour pb_public si nécessaire
      pb_public: fileURLToPath(new URL('./pb_public', import.meta.url))
    }
  },

  // Serveur public pour les fichiers statiques
  publicDir: 'pb_public', // Si tu veux servir ce dossier comme "public" dans Vite

  build: {
    outDir: './dist' // Change le chemin ici pour que le build se fasse dans le dossier dist
  }
})
