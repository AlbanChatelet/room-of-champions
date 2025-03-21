<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue'
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
    const response = await pb.collection('users').getOne<UsersResponse>(route.params.id, {
      expand: 'jeuxFavoris' // Permet de récupérer l'objet jeu lié
    })
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
      `membres ?~ "${userId}"`
    )
    userTeam.value = response
  } catch (error) {
    console.log("Aucune équipe trouvée pour cet utilisateur.")
  }
}

// Computed pour l'URL de l'avatar
const avatarUrl = computed(() => {
  if (user.value?.avatar) {
    return pb.getFileUrl(user.value, user.value.avatar)
  }
  return undefined
})

// Computed pour l'URL de l'icône du jeu favori
const gameIconUrl = computed(() => {
  if (user.value?.expand?.jeuxFavoris?.icone) {
    return pb.getFileUrl(user.value.expand.jeuxFavoris, user.value.expand.jeuxFavoris.icone)
  }
  return undefined
})

// Fonction pour retourner à la page de la liste des utilisateurs
const goBackToUsers = () => {
  router.push('/equipes')
}

// Charger les données au montage
fetchUser()
</script>

<template>
  <section class="fond_equipe py-12 px-12">
    <section class="bg-white bg-opacity-10 rounded-tl-[80px] p-8">
      <div v-if="user" class="flex flex-col md:flex-row justify-center items-center gap-8">
        <!-- Partie gauche : Avatar + Nom -->
        <div class="md:w-1/2 flex flex-col items-center">
          <div v-if="avatarUrl" class="mb-4">
            <img
              :src="avatarUrl"
              alt="Avatar de l'utilisateur"
              class="w-48 h-48 md:w-[600px] md:h-[600px] object-cover rounded-xl"
            />
          </div>
          <p class="text-center text-3xl md:text-7xl font-bold mb-4 text-white">
            {{ user.username }}
          </p>
        </div>

        <!-- Partie droite : Équipe + Jeu Favori -->
        <div class="md:w-1/2">
          <!-- Affichage de l'équipe -->
          <div v-if="userTeam">
            <p class="text-3xl md:text-7xl font-bold mb-4 text-white">EQUIPE</p>
            <p class="text-3xl md:text-7xl font-light mb-4 text-white">{{ userTeam.nom }}</p>
            <hr class="border-t-2 border-white opacity-50 mb-4">
            <p class="text-3xl md:text-xl font-light mb-4 text-white">Description : {{ userTeam.description }}</p>
            <hr class="border-t-2 border-white opacity-50 mb-4">
          </div>
          <div v-else class="text-gray-500">
            Cet utilisateur n'appartient à aucune équipe.
          </div>

          <!-- Affichage du jeu favori -->
          <div v-if="gameIconUrl" class="mt-4">
            <p class="text-3xl md:text-7xl font-bold mb-4 text-white md:pb-4">JEU FAVORIS</p>
            <img
              :src="gameIconUrl"
              alt="Icône du jeu favori"
              class="w-16 h-16 md:w-[250px] md:h-[250px] rounded-lg shadow-md md:mb-24"
            />
          </div>
        </div>
      </div>

      <!-- Chargement -->
      <div v-else class="text-center text-white text-2xl">
        Chargement des données...
      </div>

      <!-- Bouton retour -->
      <div class="mt-6 text-center">
        <button
          @click="goBackToUsers"
          class="bg-[#8E3F8D] hover:bg-[#b447b2] text-white md:text-2xl font-bold py-2 px-4 rounded"
        >
          Retour à la liste des utilisateurs
        </button>
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
