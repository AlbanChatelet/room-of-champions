<script setup lang="ts">
import { loginWithGitHub, logout, user } from '@/backend'

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Affiche un bouton de déconnexion si l'utilisateur est connecté -->
    <button 
      v-if="user" 
      @click="logout"
      class="px-6 py-2 mb-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors duration-200"
    >
      {{ user.username }} se déconnecter
    </button>
    
    <!-- Si l'utilisateur n'est pas connecté, affiche les options de connexion -->
    <div v-else class="flex flex-col items-center">
      <button 
        @click="loginWithGitHub"
        class="px-6 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-900 transition-colors duration-200"
      >
        Se connecter avec GitHub
      </button>
    </div>
  </div>
</template>
