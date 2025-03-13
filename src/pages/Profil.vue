<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { pb } from '@/backend'
import ImgPb from '@/components/ImgPb.vue'
import ProfileIcon from '@/assets/icons/ProfileIcon.vue' // Import de l'icône par défaut

const router = useRouter()
const user = pb.authStore.model

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
      <div class="mt-6 space-x-2">
        <router-link to="/ProfileEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
          Modifier mon profil
        </router-link>
        <button @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
          Déconnexion
        </button>
      </div>
    </div>
    <p v-else class="text-gray-600">Vous devez être connecté pour voir cette page.</p></section>
  </div>
  </section>
</template>

<style>
.fond_auth {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>