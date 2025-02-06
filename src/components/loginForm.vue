<script setup lang="ts">
import { ref } from 'vue'
import { loginWithEmail } from '@/backend'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)

// Fonction de connexion
const handleLogin = async () => {
  try {
    await loginWithEmail(email.value, password.value)
    errorMessage.value = null
    alert("Connexion réussie !")
    router.push('/') // Redirige vers la page d'accueil
  } catch (error) {
    errorMessage.value = "Échec de la connexion. Vérifiez vos informations."
  }
}
</script>

<template>
  <div class="login-form bg-[#303030] p-8 rounded-lg border-2 border-[#1AB2C0] text-white">
    <h2 class="text-2xl font-bold text-[#1AB2C0] mb-6 font-mulish">Connexion</h2>
    <form @submit.prevent="handleLogin" class="flex flex-col space-y-4">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
        class="border border-[#1AB2C0] bg-[#505050] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1a91c0]"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
        class="border border-[#1AB2C0] bg-[#505050] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#1a91c0]"
      />
      <button
        type="submit"
        class="bg-[#1AB2C0] text-[#303030] font-bold py-2 rounded hover:bg-[#1a91c0] transition-colors duration-200"
      >
        Connexion
      </button>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style>
.font-mulish {
  font-family: 'Mulish', sans-serif;
}
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
</style>
