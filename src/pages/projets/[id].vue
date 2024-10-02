<script setup lang="ts">
import { ref } from 'vue'
import { user } from '@/backend'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { ProjetsResponse, UsersResponse } from '@/pocketbase-types'

import QuillEditor from '@/components/QuillEditor.vue'
import ImgPb from '@/components/ImgPb.vue'

const route = useRoute()
const router = useRouter()

// Récupérer l'équipe
const projet = ref<ProjetsResponse>(await pb.collection<ProjetsResponse<{ chef: UsersResponse, membres: UsersResponse }>>('projets').getOne(route.params.id, {
  expand: 'chef_projet'
}))
const listUsers = ref<UsersResponse[]>(await pb.collection('users').getFullList())

// État pour gérer l'affichage du formulaire de modification
const isEditing = ref(false)



// Fonction pour mettre à jour les membres
async function updateMembres(id: string) {
  projet.value = await pb.collection('projets').update(route.params.id, {
    'membres+': id
  }, { expand: 'chef_equipe, membres' })
}

// Fonction pour supprimer un membre
async function deleteMembre(id: string) {
  projet.value = await pb.collection('projets').update(route.params.id, {
    'membres-': id
  }, { expand: 'chef_equipe, membres' })
}

// Fonction pour supprimer l'équipe
async function deleteProjet(id: string) {
  await pb.collection('projets').delete(id)
  router.push({ name: '/projets/' })
}

// Fonction pour soumettre les modifications
async function submitChanges() {
  try {
    await pb.collection('projets').update(projet.value.id, {
      nom: projet.value.description,
      description: projet.value.description,
    })
    isEditing.value = false // Fermer le formulaire après soumission
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'équipe :', error)
  }
}



</script>

<template>
  <div v-if="projet" class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-4">{{ projet.description }}</h1>
    <ImgPb 
          :record="projet" 
          :filename="projet.image" 
          class="w-full h-[215px] object-cover rounded-t-lg"
      />

    <h2 class="text-lg font-semibold">
      Nom du chef de projet : 
      <span class="font-medium text-blue-600">{{ projet.expand?.chef_projet.username }}</span>
    </h2>

    <!-- Nouvelle ligne ajoutée -->
    <h2 class="text-lg font-semibold mt-2">
      Par : <span class="font-medium text-blue-600">{{ projet.expand?.chef_projet.username }}</span>
    </h2>

    <!-- Conditionner le bouton de suppression au chef d'équipe -->
    <button v-if="user?.id === projet.expand?.chef_projet.id" 
            class="mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring" 
            @click="deleteProjet(projet.id)">
      Supprimer l'équipe
    </button>

    <div class="mt-6" v-if="user?.id === projet.expand?.chef_projet.id">
      <button @click="isEditing = !isEditing" class="text-blue-600 hover:underline">
        {{ isEditing ? 'Annuler' : 'Modifier' }}
      </button>
    </div>

    <!-- Formulaire de modification -->
    <div v-if="isEditing" class="mt-4">
      <h2 class="text-xl font-semibold">Modifier l'équipe</h2>
      <form @submit.prevent="submitChanges" class="bg-white p-4 rounded shadow-md space-y-4">
        <div>
          <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
          <input v-model="projet.description" type="text" id="nom" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <QuillEditor v-model="projet.description" type="text" id="description" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Sauvegarder
        </button>
      </form>
    </div>

    <div class="mt-4">
      <h2 class="text-lg font-semibold">Liste des membres</h2>
      <ul class="list-disc pl-5 mt-2">
        <li v-for="utilisateur in projet.expand?.membres" :key="utilisateur.id" class="flex justify-between items-center">
          <span class="text-gray-800">{{ utilisateur.name || utilisateur.username }}</span>
          <!-- Conditionner le bouton de suppression des membres au chef d'équipe -->
          <button v-if="user?.id === projet.expand?.chef_projet.id" 
                  class="ml-2 text-red-500 hover:text-red-700" 
                  @click="deleteMembre(utilisateur.id)">
            Supprimer
          </button>
        </li>
      </ul>
    </div>

    <select v-if="user?.id === projet.expand?.chef_projet.id" @change="updateMembres(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''" class="mt-4 px-3 py-2 border rounded">
      <option value="" selected disabled>Sélectionnez un membre</option>
      <option v-for="utilisateur in listUsers" :key="utilisateur.id" :value="utilisateur.id">{{ utilisateur.name || utilisateur.email || utilisateur.username }}</option>
    </select>
  </div>
</template>
