<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import type { EquipesResponse, ProjetsResponse } from '@/pocketbase-types'
import { RouterLink } from 'vue-router'
import ImgPb from '@/components/ImgPb.vue'

const projets = ref<ProjetsResponse[]>([])

onMounted(async () => {
  try {
    const response = await pb.collection('projets').getFullList<EquipesResponse>()
    projets.value = response
  } catch (error) {
    console.error('Error fetching teams:', error)
  }
})


</script>

<template>
  

  <main class="py-10 bg-gray-100">
    <div class="container mx-auto">
      <div v-if="projets.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="projet in projets" :key="projet.id" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
          <!-- Contenu du projet -->
          <div>
            <h3 class="text-lg font-semibold mt-2">
        Par : <span class="font-medium text-blue-600">{{ projet.expand?.chef_projet.username }}</span>
      </h3>
            <div v-html="projet.description" class="mb-4"></div>
            <ImgPb
                v-if="projet.image"
                :record="projet"
                :filename="projet.image"
                class="h-24 w-24 rounded-full object-cover mb-5"
                />
          </div>

          <!-- Bouton pour rediriger vers la page de détails de l'équipe, fixé en bas à gauche -->
          <RouterLink :to="`/projets/${projet.id}`" class="inline-block stroke-blue-500 text-red-500 px-4 py-2 rounded-md shadow hover:bg-slate-200 transition-colors mt-auto">
            Voir les détails
          </RouterLink>
        </div>
        
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Aucun projet trouvé.</p>
      </div>
    </div>
  </main>
</template>

