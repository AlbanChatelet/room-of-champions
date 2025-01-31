import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import 'quill/dist/quill.snow.css'; // Importer les styles de Quill
import { createHead } from 'unhead'
import 'leaflet/dist/leaflet.css'

const app = createApp(App)
const head = createHead()
app.use(head)
app.use(createRouter({history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
routes:routes,}))

app.mount('#app')
