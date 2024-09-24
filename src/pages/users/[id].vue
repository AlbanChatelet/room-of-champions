<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router/auto'
import { pb } from '@/backend'
import type { UsersResponse } from '@/pocketbase-types'

const route = useRoute() // Accéder à l'ID via la route
const userId = route.params.id

// Variable pour stocker les détails de l'utilisateur
const user = ref<UsersResponse | null>(null)

// Fonction pour récupérer les informations de l'utilisateur
const fetchUser = async () => {
  try {
    const response = await pb.collection('users').getOne<UsersResponse>(userId)
    user.value = response
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error)
  }
}

// Appeler la fonction de récupération des données
fetchUser()
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl mb-4">Détails de l'utilisateur</h1>
    <div v-if="user">
      <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <!-- Tu peux ajouter plus d'infos ici selon ce qui est disponible dans les détails de l'utilisateur -->
    </div>
    <div v-else>
      <p>Chargement des informations de l'utilisateur...</p>
    </div>
  </div>
</template>
