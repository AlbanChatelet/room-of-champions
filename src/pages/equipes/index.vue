<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import type { EquipesResponse } from '@/pocketbase-types'

const equipes = ref<EquipesResponse[]>([])

onMounted(async () => {
  try {
    const response = await pb.collection('equipes').getFullList<EquipesResponse>()
    equipes.value = response
  } catch (error) {
    console.error('Error fetching teams:', error)
  }
})
</script>

<template>
  <header class="bg-gradient-to-r from-blue-500 to-red-500 p-6 text-white shadow-lg">
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold">Page des équipes</h1>
    </div>
  </header>

  <main class="py-10 bg-gray-100">
    <div class="container mx-auto">
      <div v-if="equipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="equipe in equipes" :key="equipe.id" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 class="text-2xl font-semibold text-red-700 mb-2">{{ equipe.nom }}</h2>
          
          <div v-html="equipe.description"></div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Aucune équipe trouvée.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Pas besoin de style personnalisé supplémentaire, Tailwind gère l'essentiel */
</style>
