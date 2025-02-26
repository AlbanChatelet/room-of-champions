<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import type { EquipesResponse, JeuxResponse } from '@/pocketbase-types'
import { RouterLink } from 'vue-router'

const equipes = ref<EquipesResponse[]>([])

onMounted(async () => {
  try {
    const response = await pb.collection('equipes').getFullList<EquipesResponse>({
      expand: 'jeu_associe'
    })
    console.log('Données récupérées avec expand:', response)
    equipes.value = response
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error)
  }
})

// Fonction pour récupérer l'URL de l'icône
const getIconUrl = (equipe: EquipesResponse) => {
  return equipe.icone ? pb.getFileUrl(equipe, equipe.icone) : null
}

</script>

<template>
  <main class="py-10 bg-gray-100">
    <RouterLink to="/equipes/edit/:id?">Créer une équipe</RouterLink>
    <div class="container mx-auto">
      <div v-if="equipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="equipe in equipes" :key="equipe.id" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
          <!-- Image de l'équipe -->
          <img v-if="equipe.icone" :src="getIconUrl(equipe)" :alt="`Icône de ${equipe.nom}`" class="w-full h-40 object-cover rounded-md mb-4">
          
          <!-- Contenu de l'équipe -->
          <div>
            <h2 class="text-2xl font-semibold text-green-700 mb-2">{{ equipe.nom }}</h2>
            <div v-html="equipe.description" class="mb-4"></div>

            <!-- Affichage du jeu associé -->
            <p v-if="equipe.expand?.jeu_associe?.length" class="text-gray-700">
  Jeux associés :
  <span class="font-semibold">
    {{ equipe.expand.jeu_associe.map(jeu => jeu.nom_jeux).join(', ') }}
  </span>
</p>


          </div>

          <!-- Bouton pour voir les détails -->
          <RouterLink :to="`/equipes/${equipe.id}`" class="inline-block stroke-blue-500 text-red-500 px-4 py-2 rounded-md shadow hover:bg-slate-200 transition-colors mt-auto">
            Voir les détails
          </RouterLink>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Aucune équipe trouvée.</p>
      </div>
    </div>
  </main>
</template>
