<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { pb } from '@/backend'
import type { EquipesResponse } from '@/pocketbase-types'

// Récupérer le paramètre d'URL (l'id de l'équipe)
const route = useRoute()
const equipeId = ref(route.params.id as string)

// Variable pour stocker les données de l'équipe
const equipe = ref<EquipesResponse | null>(null)
const loading = ref(true)

// Charger les détails de l'équipe quand le composant est monté
onMounted(async () => {
  try {
    const response = await pb.collection('equipes').getOne<EquipesResponse>(equipeId.value)
    equipe.value = response
  } catch (error) {
    console.error('Error fetching team details:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto py-10">
    <!-- Loader pendant que les données sont en cours de chargement -->
    <div v-if="loading" class="text-center">
      <p class="text-lg text-gray-500">Chargement des informations de l'équipe...</p>
    </div>

    <!-- Afficher les détails de l'équipe si les données sont disponibles -->
    <div v-if="equipe && !loading" class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-blue-700 mb-4">{{ equipe.nom }}</h1>
      <div v-html="equipe.description" class="prose prose-lg text-gray-600"></div>
    </div>

    <!-- Message d'erreur si l'équipe n'est pas trouvée -->
    <div v-else-if="!loading && !equipe" class="text-center text-red-500">
      <p>Équipe non trouvée.</p>
    </div>
  </div>
</template>
