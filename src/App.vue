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
          <li>
            <RouterLink to="/projets" class="text-white hover:text-gray-200 transition-colors">Projets</RouterLink>
          </li>
          <li>
            <RouterLink to="/projets/edit/" class="text-white hover:text-gray-200 transition-colors">Ajouter un projet</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />

        <template #fallback>
          <div class="text-center">Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </main>
</template>
