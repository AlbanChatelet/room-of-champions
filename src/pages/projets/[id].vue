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

    <!-- Conditionner le bouton de suppression au chef de projet -->
    <button v-if="user?.id === projet.expand?.chef_projet.id" 
            class="mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none focus:ring" 
            @click="deleteProjet(projet.id)">
      Supprimer le projet
    </button>

    <div class="mt-6" v-if="user?.id === projet.expand?.chef_projet.id">
      <button @click="isEditing = !isEditing" class="text-blue-600 hover:underline">
        {{ isEditing ? 'Annuler' : 'Modifier' }}
      </button>
    </div>

    <!-- Formulaire de modification -->
    <div v-if="isEditing" class="mt-4">
      <h2 class="text-xl font-semibold">Modifier le projet</h2>
      <form @submit.prevent="submitChanges" class="bg-white p-4 rounded shadow-md space-y-4">
        <div>
          <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
          <input v-model="projet.description" type="text" id="nom" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <QuillEditor v-model="projet.description" type="text" id="description" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <!-- Sélecteur pour choisir une équipe -->
        <div>
          <label for="equipe" class="block text-sm font-medium text-gray-700 mb-1">Équipe choisie</label>
          <select v-model="equipeChoisie" id="equipe" class="w-full px-3 py-2 border rounded-md">
            <option value="" selected disabled>Sélectionnez une équipe</option>
            <option v-for="equipe in listEquipes" :key="equipe.id" :value="equipe.id">
              {{ equipe.nom || 'Nom non défini' }}
            </option>
          </select>
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
          <!-- Conditionner le bouton de suppression des membres au chef de projet -->
          <button v-if="user?.id === projet.expand?.chef_projet.id" 
                  class="ml-2 text-red-500 hover:text-red-700" 
                  @click="deleteMembre(utilisateur.id)">
            Supprimer
          </button>
        </li>
      </ul>

      <!-- Affichage du nom de l'équipe choisie -->
      <div v-if="equipeChoisie" class="mt-4">
        <h3 class="text-md font-medium">Équipe choisie :</h3>
        <p class="text-gray-700">{{ equipeNomChoisie }}</p>
      </div>
    </div>

    <select v-if="user?.id === projet.expand?.chef_projet.id" @change="updateMembres(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''" class="mt-4 px-3 py-2 border rounded">
      <option value="" selected disabled>Sélectionnez un membre</option>
      <option v-for="utilisateur in listUsers" :key="utilisateur.id" :value="utilisateur.id">{{ utilisateur.name || utilisateur.email || utilisateur.username }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { user } from '@/backend'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { ProjetsResponse, UsersResponse, EquipesResponse } from '@/pocketbase-types'

import QuillEditor from '@/components/QuillEditor.vue'
import ImgPb from '@/components/ImgPb.vue'

const route = useRoute()
const router = useRouter()

// Récupérer le projet
const projet = ref<ProjetsResponse>(await pb.collection<ProjetsResponse<{ chef_projet: UsersResponse, membres: UsersResponse }>>('projets').getOne(route.params.id, {
  expand: 'chef_projet'
}))
const listUsers = ref<UsersResponse[]>(await pb.collection('users').getFullList())

// Récupérer la liste des équipes pour le sélecteur
const listEquipes = ref<EquipesResponse[]>(await pb.collection('equipes').getFullList())

// État pour gérer le choix de l'équipe
const equipeChoisie = ref(projet.value.equipeChoisie || '')

// Propriété calculée pour obtenir le nom de l'équipe choisie
const equipeNomChoisie = computed(() => {
  const equipe = listEquipes.value.find(equipe => equipe.id === equipeChoisie.value)
  return equipe ? equipe.nom : 'Équipe non définie'
})

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

// Fonction pour supprimer le projet
async function deleteProjet(id: string) {
  await pb.collection('projets').delete(id)
  router.push('/')
}

// Fonction pour soumettre les changements dans le formulaire
async function submitChanges() {
  await pb.collection('projets').update(route.params.id, projet.value)
  isEditing.value = false
}
</script>
