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

const iconeJeuFavori = ref<string | null>(null)

onMounted(async () => {
  if (user && user.jeuxFavoris) {
    try {
      // Récupération du jeu à partir de son ID
      const jeu = await pb.collection('jeux').getOne(user.jeuxFavoris)
      iconeJeuFavori.value = jeu.icone // On stocke l'icône du jeu
    } catch (error) {
      console.error("Erreur lors de la récupération de l'icône du jeu favori :", error)
      iconeJeuFavori.value = null // En cas d'erreur, on ne met rien
    }
  }
})
const logout = () => {
  pb.authStore.clear()
  router.push('/Auth')
}
</script>

<template>
  <section class="pt-32 md:pt-12 fond_auth py-12 px-4 md:px-72 min-h-screen flex flex-col justify-between">
    <section class="bg-white bg-opacity-10 rounded-tl-[80px] p-8 flex-grow">
      <div v-if="user" class="flex flex-col md:flex-row justify-center items-center gap-8">
        <div class="flex flex-col items-center">
          <ImgPb 
            v-if="user.avatar" 
            :record="{ id: user.id, collectionName: 'users' }" 
            :filename="user.avatar"
            class="w-48 h-48 md:w-[600px] md:h-[300px] object-cover rounded-xl"
          />
          <ProfileIcon v-else class="md:w-[600px] md:h-[600px]" />

          <div>
            <p class="text-center text-3xl md:text-7xl font-bold mb-4 text-white">
              {{ user.username }}
            </p>
          </div>
        </div>

        <div class="">
          <h2 class="text-3xl md:text-7xl font-bold mb-4 text-white">Jeu favori</h2>
          <div v-if="iconeJeuFavori">
            <ImgPb 
              :record="{ id: user.jeuxFavoris, collectionName: 'jeux' }" 
              :filename="iconeJeuFavori"
              class="w-48 h-48 md:w-96 md:h-96 object-cover"
            />
          </div>
          <p v-else class="text-gray-600">Aucun jeu favori trouvé</p>
        </div>
      </div>

      <p v-else class="text-gray-600">Vous devez être connecté pour voir cette page.</p><!-- Boutons en bas de la page -->
    <div class="flex justify-center mt-12">
      <router-link to="/ProfileEdit" class="bg-[#8E3F8D] hover:bg-[#be53bd] text-white font-bold py-2 px-4 rounded-md mx-2 md:text-3xl">
        Modifier mon profil
      </router-link>
      <button @click="logout" class="bg-white text-[#8E3F8D] font-bold py-2 px-4 rounded-md mx-2 md:text-3xl">
        Déconnexion
      </button>
    </div>
    </section>

    
  </section>
</template>


<style>
.fond_auth {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>
