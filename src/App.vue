<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/auto'
import LogInOut from './components/LogInOut.vue'
</script>

<template>
  <header class="bg-gradient-to-r from-green-500 to-green-400 p-4">
    <div class="container mx-auto flex justify-between items-center">
      
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
            <RouterLink to="/Users" class="text-white hover:text-gray-200 transition-colors">Utilisateurs</RouterLink>
          </li>
          <li>
            <RouterLink to="/equipes" class="text-white hover:text-gray-200 transition-colors">Équipes</RouterLink>
          </li>
          <li>
            <RouterLink to="/equipes/edit/" class="text-white hover:text-gray-200 transition-colors">Ajouter une équipe</RouterLink>
          </li>
          <li>
            <RouterLink to="/ProfileEdit" class="text-white hover:text-gray-200 transition-colors">Profil</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  
  <main class="">
    <RouterView />
  </main>
</template>
