<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/backend'
import type { EquipesResponse, UsersResponse } from '@/pocketbase-types'
import { RouterLink } from 'vue-router'

const equipes = ref<EquipesResponse[]>([])

onMounted(async () => {
  try {
    const response = await pb.collection('equipes').getFullList<EquipesResponse>({
      expand: 'jeu_associe,membres'  // Ajoute 'membres' pour récupérer les utilisateurs associés
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
  <main class="py-10 bg-[#000011] ">
    <div class="md:pl-16 pl-4 py-12 pt-32 md:pt-0">
      <h1 class="font-poppins font-black text-xl md:text-4xl text-white pb-6">
        LA LISTE DES EQUIPES INSCRITES
      </h1>
      <div class="md:w-[502px] w-72 h-[3px] bg-[#00C9C6]"></div>
    </div>
    <div class="justify-center flex py-12">
      <button class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[32px] text-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
        <RouterLink to="/equipes/edit/:id?">Créer une équipe</RouterLink>
      </button>
    </div>
    <div class="container md:mx-auto">
      <div v-if="equipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 md:mx-0">
        <div v-for="equipe in equipes" :key="equipe.id" class="bg-gradient-to-b from-[#016D72] to-black p-6 rounded-lg border-4 border-white shadow-md hover:shadow-xl flex flex-col justify-between h-full relative rounded-tr-[80px] md:transform md:transition-transform md:duration-300 md:hover:scale-105">

          <!-- Icône de l'équipe (format carré, en haut à gauche) -->
          <img v-if="equipe.icone" :src="getIconUrl(equipe)" :alt="`Icône de ${equipe.nom}`" class="absolute top-4 left-4 w-32 h-32 object-cover  shadow-xl">
          
          <!-- Contenu de l'équipe -->
          <div class="pl-24"> <!-- Décalage pour ne pas chevaucher l'icône -->
            <div class="flex flex-col ml-8"> <!-- Alignement du nom de l'équipe et des jeux associés à droite -->
              <h2 class="text-2xl font-semibold text-white mb-1 uppercase">{{ equipe.nom }}</h2> <!-- Nom de l'équipe en majuscule -->

              <!-- Affichage des jeux associés -->
              <div v-if="equipe.expand?.jeu_associe?.length" class="text-white text-[16px] mt-2">
  <ul>
    <li v-for="jeu in equipe.expand.jeu_associe" :key="jeu.id" class="mb-1">
      {{ jeu.nom_jeux }}
    </li>
  </ul>
</div>

            </div>
          </div>

          <!-- Affichage des membres -->
          <!-- Affichage des membres -->
<div v-if="equipe.expand?.membres?.length" class="text-white mt-16 text-center mx-auto text-xl uppercase"> 
  <div class="font-semibold flex flex-wrap justify-center gap-x-12 gap-y-2">
    <span v-for="membre in equipe.expand.membres" :key="membre.id">
      {{ membre.username }}
    </span>
  </div>
</div>


          <!-- Bouton pour voir les détails -->
          <div class="flex justify-center items-center pt-8">
            <RouterLink :to="`/equipes/${equipe.id}`" class="text-center bg-white stroke-blue-500 text-black font-bold px-2 py-2 rounded-md shadow hover:bg-slate-200 transition-colors mt-auto w-[160px]">
              VOIR L'EQUIPE
            </RouterLink>
          </div>

        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Aucune équipe trouvée.</p>
      </div>
    </div>
  </main>
</template>


