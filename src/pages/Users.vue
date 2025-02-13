<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/backend'
import type { UsersResponse } from '@/pocketbase-types'
import { useRouter } from 'vue-router'

const router = useRouter()

// Variable pour stocker la liste des utilisateurs
const users = ref<UsersResponse[]>([])

// Fonction pour récupérer la liste des utilisateurs
const fetchUsers = async () => {
  try {
    const response = await pb.collection('users').getFullList<UsersResponse>()
    users.value = response
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste des utilisateurs:', error)
  }
}

// Appeler la fonction pour récupérer les utilisateurs au chargement
fetchUsers()

// Fonction pour naviguer vers la page de détails de l'utilisateur
const goToUserDetails = (id: string) => {
  router.push(`/users/${id}`)
}

// Fonction pour générer l'URL de l'avatar
const getAvatarUrl = (user: UsersResponse) => {
  if (user.avatar) {
    return pb.getFileUrl(user, user.avatar)
  }
  return ''
}
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl mb-4">Liste des utilisateurs</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
        @click="goToUserDetails(user.id)"
      >
        <!-- Afficher l'avatar de l'utilisateur s'il existe -->
        <div v-if="getAvatarUrl(user)" class="mb-4">
          <img
            :src="getAvatarUrl(user)"
            alt="Avatar de l'utilisateur"
            class="w-16 h-16 rounded-full object-cover mx-auto"
          />
        </div>
        <div class="text-center">
          <p class="text-lg font-semibold">{{ user.username }}</p>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
