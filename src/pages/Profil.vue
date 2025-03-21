<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { pb } from '@/backend'
import ImgPb from '@/components/ImgPb.vue'
import ProfileIcon from '@/assets/icons/ProfileIcon.vue' // Icône par défaut
import { onMounted, ref } from 'vue' // Ajout des imports nécessaires

const router = useRouter()
const user = pb.authStore.model

// On récupère le jeu favori de l'utilisateur
const jeuFavori = ref<string | null>(null)

onMounted(async () => {
  if (user && user.jeuxFavoris) {
    try {
      // Récupère directement le jeu à partir de l'ID
      const jeu = await pb.collection('jeux').getOne(user.jeuxFavoris)
      jeuFavori.value = jeu.nom_jeux // On récupère directement le nom du jeu
    } catch (error) {
      console.error("Erreur lors de la récupération du jeu favori :", error)
      jeuFavori.value = 'Erreur de récupération du jeu'
    }
  }
})

const logout = () => {
  pb.authStore.clear()
  router.push('/Auth')
}
</script>

<template>
  <section class="fond_auth">
    <div class="container mx-auto py-10">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">Mon profil</h1>
      <section class="bg-[#0F0F1D] rounded-l-xl">

        <div v-if="user" class="p-6 rounded-lg shadow-md">
          <div class="flex items-center space-x-4">
            <ImgPb 
              v-if="user.avatar" 
              :record="{ id: user.id, collectionName: 'users' }" 
              :filename="user.avatar"
              class="w-24 h-24 rounded-full border"
            />
            <ProfileIcon v-else class="w-24 h-24" /> <!-- Icône par défaut -->

            <div>
              <p class="text-lg font-semibold text-white">{{ user.username }}</p>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
          </div>

          <!-- Affichage du jeu favori -->
          <div class="mt-6">
            <h2 class="text-xl font-semibold text-white mb-4">Jeu favori</h2>
            <p v-if="jeuFavori" class="text-white">{{ jeuFavori }}</p>
            <p v-else class="text-gray-600">Aucun jeu favori trouvé</p>
          </div>

          <div class="mt-6 space-x-2">
            <router-link to="/ProfileEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Modifier mon profil
            </router-link>
            <button @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
              Déconnexion
            </button>
          </div>
        </div>

        <p v-else class="text-gray-600">Vous devez être connecté pour voir cette page.</p>
      </section>
    </div>
  </section>
</template>

<style>
.fond_auth {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>
