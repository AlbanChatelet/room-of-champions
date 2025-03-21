<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router/auto'
import { pb } from '@/backend'

const form = ref({
  username: '',
  email: '',
  avatar: null as File | null,
  jeuxFavoris: '' // Un seul jeu favori (ID du jeu)
})

const router = useRouter()

// Charger les données de l'utilisateur actuel
const user = pb.authStore.model
if (user) {
  form.value.username = user.username
  form.value.email = user.email
  form.value.jeuxFavoris = user.jeuxFavoris || '' // Pré-remplir avec le jeu favori actuel
}

const jeuxList = ref<any[]>([]) // Liste des jeux de la collection 'jeux'
const jeuxMap = ref<any>({}) // Map des noms de jeux à leurs ID

// Charger les jeux depuis la collection 'jeux'
onMounted(async () => {
  try {
    const jeuxResponse = await pb.collection('jeux').getFullList()
    jeuxList.value = jeuxResponse.map(jeu => jeu.nom_jeux)
    jeuxMap.value = jeuxResponse.reduce((acc, jeu) => {
      acc[jeu.nom_jeux] = jeu.id // Créer un mapping des noms de jeux aux IDs
      return acc
    }, {})
  } catch (error) {
    console.error('Error fetching games:', error)
  }
})

const onFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  if (fileInput.files && fileInput.files[0]) {
    form.value.avatar = fileInput.files[0]
  }
}

const successMessage = ref('') // Déclare successMessage ici

const submit = async () => {
  try {
    const formData = new FormData()
    formData.append('username', form.value.username)
    formData.append('email', form.value.email)
    if (form.value.avatar) {
      formData.append('avatar', form.value.avatar)
    }
    
    // Convertir jeuxFavoris (ID du jeu favori)
    const jeuxFavorisId = jeuxMap.value[form.value.jeuxFavoris]
    
    if (jeuxFavorisId) {
      formData.append('jeuxFavoris', jeuxFavorisId) // Ajouter l'ID du jeu favori dans la requête
    }
    
    if (!user) {
      throw new Error('User is not authenticated')
    }
    
    // Mise à jour du profil
    await pb.collection('users').update(user.id, formData)
    
    // Afficher un message de succès et rediriger
    successMessage.value = 'Votre profil a été mis à jour avec succès!'
    setTimeout(() => {
      router.push('/Profil')
    }, 2000)
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>

<template>
  <section class="fond_auth py-24 pt-36 md:pt-24">
  <div class="bg-[#0F0F1D] pt-16 p-8 rounded-lg text-white max-w-[800px] mx-4 md:mx-auto shadow-2xl">
    <h1 class="text-3xl font-bold text-[#8B44FF] mb-6">Modifier mon profil</h1>
    <form @submit.prevent="submit" class="bg-[#0F0F1D] p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label for="username" class="block text-xl font-medium text-[#ab85e9] mb-1">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          class="w-full px-3 py-2 border border-gray-300 bg-[#0F0F1D] rounded-md shadow-sm focus:outline-none focus:ring-[#6f37c9] focus:border-[#6f37c9]"
        />
      </div>
      
      <div>
        <label for="avatar" class="block text-xl font-medium text-[#ab85e9] mb-1">Avatar</label>
        <input type="file" @change="onFileChange" />
      </div>

      <!-- Affichage du jeu favori -->
      <div>
        <label for="jeuxFavoris" class="block text-xl font-medium text-[#ab85e9] mb-1">Jeu favori</label>
        <select
          id="jeuxFavoris"
          v-model="form.jeuxFavoris"
          class="w-full px-3 py-2 border border-gray-300 bg-[#0F0F1D] rounded-md shadow-sm focus:outline-none focus:ring-[#6f37c9] focus:border-[#6f37c9]"
        >
          <option value="" disabled selected>Sélectionner un jeu</option>
          <option v-for="jeu in jeuxList" :key="jeu" :value="jeu">{{ jeu }}</option>
        </select>
      </div>

      <!-- Message de succès -->
      <div v-if="successMessage" class="text-green-500 mt-4">
        {{ successMessage }}
      </div>

      <button
        type="submit"
        class="bg-[#6f37c9] text-white font-bold py-2 px-4 rounded-md"
      >
        Mettre à jour
      </button>
    </form>
  </div></section>
</template>

<style>
.fond_auth {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>
