<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'
import { pb } from '@/backend'
import type { EquipesResponse, UsersResponse } from '@/pocketbase-types'
import { useHead } from 'unhead'
import QuillEditor from '@/components/QuillEditor.vue'

const route = useRoute('/equipes/[[id]]')
const router = useRouter()

useHead({
  title: 'Détails de l\'équipe'
})

// Identifiant de l'équipe
const equipeId = ref(route.params.id)

// Mode "édition" ou "lecture"
const isEditMode = ref(false) // Par défaut, lecture seule

// Variables pour stocker les informations de l'équipe
const form = ref({
  nom: '',
  description: '',
  chef_equipe: null as string | null // Utiliser l'ID de l'utilisateur
})

// Liste des utilisateurs pour le sélecteur
const users = ref<UsersResponse[]>([])

// Variable pour l'utilisateur sélectionné indépendamment du chef d'équipe
const selectedUser = ref<string | null>(null) // ID de l'utilisateur sélectionné

// Charger la liste des utilisateurs
const loadUsers = async () => {
  try {
    const response = await pb.collection('users').getFullList<UsersResponse>()
    users.value = response
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
  }
}

// Charger les données de l'équipe
watchEffect(async () => {
  loadUsers() // Charger les utilisateurs dès le départ

  if (equipeId.value) {
    try {
      const response = await pb.collection('equipes').getOne<EquipesResponse>(equipeId.value)
      form.value.nom = response.nom
      form.value.description = response.description
      form.value.chef_equipe = response.chef_equipe || null
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'équipe:', error)
    }
  }
})

// Fonction pour basculer en mode édition
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

// Fonction de soumission pour sauvegarder les modifications
const submit = async () => {
  try {
    if (equipeId.value) {
      await pb.collection('equipes').update(equipeId.value, form.value)
      isEditMode.value = false // Retour en mode lecture après mise à jour
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'équipe:', error)
  }
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

    <!-- Sélecteur d'utilisateur indépendant -->
    <div class="mb-4">
      <label for="utilisateur" class="block text-sm font-medium text-gray-700">Sélectionner un utilisateur</label>
      <select
        id="utilisateur"
        v-model="selectedUser"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Aucun</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name || user.username || 'Utilisateur inconnu' }}
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
        @click="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none"
      >
        Sauvegarder
      </button>
    </div>
  </div>
</template>
