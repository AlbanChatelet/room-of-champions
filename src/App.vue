<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/auto'
import LogInOut from './components/LogInOut.vue'
</script>

<template>
  <header class="bg-gradient-to-r from-blue-500 to-red-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold text-white">Template principale</h1>
      <LogInOut />
      <nav>
        <ul class="flex space-x-8">
          <li>
            <RouterLink to="/" class="text-white hover:text-gray-200 transition-colors">Accueil</RouterLink>
          </li>
          <li>
            <RouterLink to="/About" class="text-white hover:text-gray-200 transition-colors">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/equipes" class="text-white hover:text-gray-200 transition-colors">Équipes</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  
  <main class="py-10">
    <RouterView />
  </main>
</template>
