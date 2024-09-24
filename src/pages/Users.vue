<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/backend'
import type { UsersResponse } from '@/pocketbase-types'

// Déclarer la variable pour stocker les utilisateurs
const users = ref<UsersResponse[]>([])

// Utilisation de `async setup` pour récupérer les utilisateurs
const fetchUsers = async () => {
  try {
    const response = await pb.collection('users').getFullList<UsersResponse>()
    users.value = response
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error)
  }
}

// Appeler directement la fonction lors du chargement du composant
fetchUsers()
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl mb-4">Liste des utilisateurs</h1>
    <ul>
      <li v-for="user in users" :key="user.id" class="border-b py-2">
        <router-link :to="'/users/' + user.id" class="text-blue-500 hover:underline">
          <strong>{{ user.username }}</strong>
        </router-link> - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
