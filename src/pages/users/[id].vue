<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'
import { pb } from '@/backend'
import type { UsersResponse, EquipesResponse } from '@/pocketbase-types'

const route = useRoute('/users/[id]')
const router = useRouter()

// Stocker les détails de l'utilisateur
const user = ref<UsersResponse | null>(null)
const userTeam = ref<EquipesResponse | null>(null) // Stocker l'équipe de l'utilisateur

// Fonction pour récupérer les détails de l'utilisateur
const fetchUser = async () => {
  try {
    const response = await pb.collection('users').getOne<UsersResponse>(route.params.id)
    user.value = response

    // Récupérer l'équipe de l'utilisateur
    await fetchUserTeam(response.id)
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'utilisateur:", error)
  }
}

// Fonction pour récupérer l'équipe de l'utilisateur
const fetchUserTeam = async (userId: string) => {
  try {
    const response = await pb.collection('equipes').getFirstListItem<EquipesResponse>(
      `membres ?~ "${userId}"` // Filtrer les équipes où l'utilisateur est membre
    )
    userTeam.value = response
  } catch (error) {
    console.log("Aucune équipe trouvée pour cet utilisateur.")
  }
}

// Fonction pour générer l'URL de l'avatar
const getAvatarUrl = (user: UsersResponse) => {
  if (user.avatar) {
    return pb.getFileUrl(user, user.avatar)
  }
  return undefined
}

// Fonction pour retourner à la page de la liste des utilisateurs
const goBackToUsers = () => {
  router.push('/users')
}

// Charger les données au montage
fetchUser()
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl mb-4">Détails de l'utilisateur</h1>

    <div v-if="user" class="border p-4 rounded-lg shadow-md">
      <!-- Afficher l'avatar de l'utilisateur s'il existe -->
      <div v-if="getAvatarUrl(user)" class="mb-4">
        <img
          :src="getAvatarUrl(user)"
          alt="Avatar de l'utilisateur"
          class="w-24 h-24 rounded-full object-cover mx-auto"
        />
      </div>
      <div class="text-center">
        <p class="text-lg font-semibold">{{ user.username }}</p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>

      <!-- Afficher l'équipe de l'utilisateur -->
      <div v-if="userTeam" class="mt-4 text-center">
        <p class="text-md font-semibold">Équipe :</p>
        <p class="text-lg font-bold text-blue-600">{{ userTeam.nom }}</p>
      </div>
      <div v-else class="mt-4 text-center text-gray-500">
        Cet utilisateur n'appartient à aucune équipe.
      </div>
    </div>

    <!-- Bouton pour revenir à la liste des utilisateurs -->
    <div class="mt-6">
      <button
        @click="goBackToUsers"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Retour à la liste des utilisateurs
      </button>
    </div>
  </div>
</template>
