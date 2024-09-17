<script setup lang="ts">
import { loginWithGitHub, loginWithGoogle, logout, user } from '@/backend'

</script>

<template>
  <div>
    <button v-if="user" @click="logout">{{ user.username }} se déconnecter</button>
    
    <!-- Si l'utilisateur n'est pas connecté, affiche les options de connexion -->
    <div v-else>
      <button @click="loginWithGoogle">Se connecter avec Google</button>
      <br>
      <button @click="loginWithGitHub">Se connecter avec GitHub</button>
    </div>
  </div>
</template>
