<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { user } from '@/backend'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { EquipesResponse, UsersResponse, JeuxResponse } from '@/pocketbase-types'
import sanitizeHtml from 'sanitize-html'
import QuillEditor from '@/components/QuillEditor.vue'

const route = useRoute()
const router = useRouter()

// Récupérer l'équipe
const equipe = ref<EquipesResponse>(await pb.collection<EquipesResponse<{ chef: UsersResponse, membres: UsersResponse }>>('equipes').getOne(route.params.id, {
  expand: 'chef_equipe, membres, jeu_associe'
}))

// Récupérer tous les utilisateurs
const listUsers = ref<UsersResponse[]>(await pb.collection('users').getFullList())
const listJeux = ref<JeuxResponse[]>(await pb.collection('jeux').getFullList())

// État pour gérer l'affichage du formulaire de modification
const isEditing = ref(false)

// Fonction pour mettre à jour les membres
async function updateMembres(id: string) {
  // Récupérer les membres actuels de l'équipe
  const currentMembres = equipe.value.membres || [];
  
  // Ajouter le nouveau membre tout en conservant les autres membres
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    membres: [...currentMembres, id],
  }, { expand: 'chef_equipe, membres' });
}

// Fonction pour mettre à jour les membres
async function updateJeux(id: string) {
  // Récupérer les membres actuels de l'équipe
  const currentJeux = equipe.value.jeu_associe || [];
  
  // Ajouter le nouveau membre tout en conservant les autres membres
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    jeu_associe: [...currentJeux, id],
  }, { expand: 'chef_equipe, jeu_associe' });
}

// Fonction pour supprimer un membre
async function deleteMembre(id: string) {
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    'membres-': id
  }, { expand: 'chef_equipe, membres' })
}
async function deleteGame(id: string) {
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    'jeu_associe-': id
  }, { expand: 'chef_equipe, jeu_associe' })
}
// Fonction pour supprimer l'équipe
async function deleteEquipe(id: string) {
  await pb.collection('equipes').delete(id)
  router.push({ name: '/equipes/' })
}

// Fonction pour soumettre les modifications
async function submitChanges() {
  try {
    await pb.collection('equipes').update(equipe.value.id, {
      nom: equipe.value.nom,
      description: equipe.value.description,
    })
    isEditing.value = false // Fermer le formulaire après soumission
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'équipe :', error)
  }
}
// Fonction pour obtenir l'URL de l'avatar de l'utilisateur, sinon retourner un avatar par défaut
const getAvatarUrl = (utilisateur: UsersResponse) => {
  return utilisateur.avatar
    ? pb.getFileUrl(utilisateur, utilisateur.avatar)
    : new URL('@/assets/profileDefaut.webp', import.meta.url).href;
}

const canEdit = computed(() => user.value && user.value.id === equipe.value.chef_equipe)

const getIconUrl = (equipe: EquipesResponse) => {
  return equipe.icone ? pb.getFileUrl(equipe, equipe.icone) : null
}
</script>

<template>
  <section class="fond_equipe py-12 px-12">
    <section class="bg-white bg-opacity-10 rounded-tl-[80px]">
  <div v-if="equipe" class="container mx-auto pt-10 px-4">
    <div class="flex items-center justify-between">
    <h1 class="text-3xl md:text-7xl font-bold mb-4 text-white">{{ equipe.nom }}</h1>
    <img 
    v-if="equipe.icone" 
    :src="getIconUrl(equipe)" 
    :alt="`Icône de ${equipe.nom}`" 
    class="w-[185px] h-[185px] object-cover rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
/>

</div>

    <div v-html="sanitizeHtml(equipe.description)" class="text-white md:text-2xl"></div>
    

    <!-- Remplace cette section : -->
<!-- Liste des membres -->
<div class="mt-4">
  <h2 class="text-lg text-[#8B44FF] md:text-4xl font-bold">MEMBRES :</h2>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-64 md:gap-16 mt-4">
    <div 
      v-for="utilisateur in equipe.expand?.membres" 
      :key="utilisateur.id" 
      class="bg-[#8B44FF] text-white rounded-tl-[60px] shadow-xl p-4 flex flex-col items-center justify-between md:w-[300px] md:h-[300px] transform transition-transform duration-300 hover:scale-105"
    >
    <!-- Nom -->
      <h3 class="font-bold text-lg md:text-2xl">
        {{ utilisateur.name || utilisateur.username }}
      </h3>
<span 
    class="text-xl font-semibold"
    :class="utilisateur.id === equipe.expand?.chef_equipe.id ? 'text-white' : 'text-gray-300'"
>
    {{ utilisateur.id === equipe.expand?.chef_equipe.id ? '(CAPITAINE)' : '(JOUEUR)' }}
</span>
      <!-- Photo de profil -->
      <img 
        :src="getAvatarUrl(utilisateur)" 
        alt="Avatar de l'utilisateur" 
        class="w-32 h-32 rounded-full object-cover mb-2"
      />

      
      


      <!-- Bouton Voir le profil -->
      <button 
        @click="router.push(`/users/${utilisateur.id}`)" 
        class="mt-4 bg-white text-black font-bold py-1 px-4 rounded hover:bg-gray-200"
      >
        VOIR LE PROFIL
      </button>

      <!-- Bouton Supprimer (si chef d'équipe connecté) -->
      <button 
        v-if="user?.id === equipe.expand?.chef_equipe.id" 
        class="mt-2 text-red-500 hover:text-red-700"
        @click="deleteMembre(utilisateur.id)"
      >
        Supprimer
      </button>
    </div>
  </div>
</div>


    
    <!-- Sélection pour ajouter des membres -->
    <select v-if="user?.id === equipe.expand?.chef_equipe.id" @change="updateMembres(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''" class="mt-4 px-3 py-2 border rounded">
      <option value="" selected disabled>Sélectionnez un membre</option>
      <option v-for="utilisateur in listUsers" :key="utilisateur.id" :value="utilisateur.id">{{ utilisateur.name || utilisateur.email || utilisateur.username }}</option>
    </select>
    
    <!-- Liste des jeux -->
    <div class="mt-4">
      <h2 class="text-lg text-[#8B44FF] md:text-4xl font-bold">JEUX ASSOCIES :</h2>
      <ul class="list-disc py-8 flex">
        <li v-for="jeu in equipe.expand?.jeu_associe" :key="jeu.id" class="flex justify-between items-center">
          <div class="bg-white py-2 px-4 rounded-xl mr-8">
          <span class="text-black font-bold md:text-2xl">{{ jeu.nom_jeux || jeu.nom_jeux }}</span>
        </div>
          <button v-if="user?.id === equipe.expand?.chef_equipe.id" 
                  class="ml-2 text-red-500 hover:text-red-700" 
                  @click="deleteGame(jeu.id)">
            Supprimer
          </button>
        </li>
      </ul>
    </div>

    <!-- Sélection pour ajouter des jeux -->
    <select v-if="user?.id === equipe.expand?.chef_equipe.id" @change="updateJeux(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''" class="mt-4 px-3 py-2 border rounded">
      <option value="" selected disabled>Sélectionnez un jeu</option>
      <option v-for="jeu in listJeux" :key="jeu.id" :value="jeu.id">{{ jeu.nom_jeux }}</option>
    </select>
  </div>
    </section>
  </section>
</template>

<style>
.fond_equipe {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}

</style>