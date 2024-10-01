<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'
import { pb, user } from '@/backend'
import type { EquipesResponse, UsersResponse } from '@/pocketbase-types'
import { useHead } from 'unhead'
import QuillEditor from '@/components/QuillEditor.vue'

const route = useRoute('/equipes/[id]')
const router = useRouter()

useHead({
  title: () => 'Équipe ' + (infoEquipes?.nom || 'Inconnue'),
})

// Identifiant de l'équipe

const listUsers = await pb.collection('users').getFullList()
// Mode "édition" ou "lecture"
const isEditMode = ref(false) // Par défaut, lecture seule

// Variables pour stocker les informations de l'équipe
const form = ref({
  nom: '',
  description: '',
  chef_equipe: null as string | null, // Utiliser l'ID de l'utilisateur
  membres: [] as UsersResponse[] // Liste des membres
})

function edit() {
  router.push({ name: '/equipes/edit/[[id]]', params: { id: route.params.id } })
}



// Fonction pour basculer en mode édition
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

// Fonction de soumission pour sauvegarder les modifications

const infoEquipes = ref(await pb
  .collection<EquipesResponse<{ chef: UsersResponse, membre: UsersResponse[] }>>('equipes')
  .getOne(route.params.id, { expand: 'chef_equipe,membres' }))

// Fonction pour ajouter un membre à l'équipe
async function addMember(id: string) {
  infoEquipes.value = await pb.collection('equipes').update(route.params.id, {
    'membres+': id,
    'chef': infoEquipes.value.chef_equipe
  }, { expand: 'membres' })
}

</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl">Détails de l'équipe</h1>

    <div class="mb-4">
      <label for="nom" class="block text-sm font-medium text-gray-700">Nom de l'équipe</label>
      <input
        type="text"
        id="nom"
        v-model="form.nom"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        :disabled="!isEditMode"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <QuillEditor v-model="form.description" :readonly="!isEditMode" />
    </div>

    <!-- Afficher les membres de l'équipe -->
    <div class="mb-4">
      <h2 class="text-lg font-bold">Membres de l'équipe</h2>
      <ul>
        <li v-for="membre in form.membres" :key="membre.id">
          {{ membre.name || membre.username || 'Utilisateur inconnu' }}
        </li>
      </ul>
      <p v-if="form.membres.length === 0">Aucun membre pour l'instant.</p>
    </div>

    <!-- Sélecteur pour ajouter des membres (toujours visible maintenant) -->
<div class="mb-4">
  <label for="utilisateur" class="block text-sm font-medium text-gray-700">Ajouter un membre</label>
  <select 
        id="user-select"
        @change="addMember(($event.target as HTMLSelectElement).value)" 
        v-if="user && user.id === infoEquipes?.chef_equipe" 
      >
        <option value="" selected>Choisir un utilisateur</option>
        <option v-for="user in listUsers" :key="user.id" :value="user.id">
          {{ user.username || user.email }}
        </option>
      </select>
</div>

    <div class="flex space-x-4">
      <button
        v-if="!isEditMode"
        @click="toggleEditMode"
        class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
      >
        Modifier
      </button>

      <button
        v-else
        @click="edit"
        class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
      >
        Sauvegarder
      </button>
    </div>
  </div>
</template>
