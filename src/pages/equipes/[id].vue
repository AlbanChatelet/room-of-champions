<script setup lang="ts">
import { computed, ref } from 'vue'
import { user } from '@/backend'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { EquipesResponse, UsersResponse } from '@/pocketbase-types'
import sanitizeHtml from 'sanitize-html'
import QuillEditor from '@/components/QuillEditor.vue'

const route = useRoute()
const router = useRouter()

// Récupérer l'équipe
const equipe = ref<EquipesResponse>(await pb.collection<EquipesResponse<{ chef: UsersResponse, membres: UsersResponse }>>('equipes').getOne(route.params.id, {
  expand: 'chef_equipe, membres'
}))

// Récupérer tous les utilisateurs
const listUsers = ref<UsersResponse[]>(await pb.collection('users').getFullList())

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

// Fonction pour supprimer un membre
async function deleteMembre(id: string) {
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    'membres-': id
  }, { expand: 'chef_equipe, membres' })
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

const canEdit = computed(() => user.value && user.value.id === equipe.value.chef_equipe)
</script>

<template>
  <div v-if="equipe" class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-4">{{ equipe.nom }}</h1>
    <div v-html="sanitizeHtml(equipe.description)" class="text-gray-700 mb-6 border rounded-lg p-4 bg-gray-100"></div>
    <h2 class="text-lg font-semibold">Nom du chef d'équipe : <span class="font-medium text-blue-600">{{ equipe.expand?.chef_equipe.username }}</span></h2>

    <!-- Liste des membres -->
    <div class="mt-4">
      <h2 class="text-lg font-semibold">Liste des membres</h2>
      <ul class="list-disc pl-5 mt-2">
        <li v-for="utilisateur in equipe.expand?.membres" :key="utilisateur.id" class="flex justify-between items-center">
          <span class="text-gray-800">{{ utilisateur.name || utilisateur.username }}</span>
          <button v-if="user?.id === equipe.expand?.chef_equipe.id" 
                  class="ml-2 text-red-500 hover:text-red-700" 
                  @click="deleteMembre(utilisateur.id)">
            Supprimer
          </button>
        </li>
      </ul>
    </div>

    <!-- Sélection pour ajouter des membres -->
    <select v-if="user?.id === equipe.expand?.chef_equipe.id" @change="updateMembres(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''" class="mt-4 px-3 py-2 border rounded">
      <option value="" selected disabled>Sélectionnez un membre</option>
      <option v-for="utilisateur in listUsers" :key="utilisateur.id" :value="utilisateur.id">{{ utilisateur.name || utilisateur.email || utilisateur.username }}</option>
    </select>
  </div>
</template>
