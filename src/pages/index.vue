<script setup lang="ts">
</script>

<template>
  

  <main class="container mx-auto py-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <RouterLink to="/" class="block text-center text-lg font-semibold text-green-500 hover:text-green-700 transition-colors">
          Accueil
        </RouterLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <RouterLink to="/About" class="block text-center text-lg font-semibold text-green-500 hover:text-green-700 transition-colors">
          About
        </RouterLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <RouterLink to="/Users" class="block text-center text-lg font-semibold text-green-500 hover:text-green-700 transition-colors">
          Utilisateurs
        </RouterLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <RouterLink to="/equipes" class="block text-center text-lg font-semibold text-green-500 hover:text-green-700 transition-colors">
          Équipes
        </RouterLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <RouterLink to="/equipes/edit/" class="block text-center text-lg font-semibold text-green-500 hover:text-green-700 transition-colors">
          Ajouter une équipe
        </RouterLink>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <RouterLink to="/ProfileEdit" class="block text-center text-lg font-semibold text-green-500 hover:text-green-700 transition-colors">
          Profil
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Vous pouvez ajouter des styles supplémentaires ici si nécessaire */
</style>
