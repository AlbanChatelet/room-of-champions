<script setup lang="ts">
import { ref } from 'vue'
import { loginWithEmail } from '@/backend'



const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)

// Fonction de connexion
const handleLogin = async () => {
  try {
    await loginWithEmail(email.value, password.value)
    errorMessage.value = null
    alert("Connexion réussie !")

    window.location.replace('/') // Force le chargement de la page d'accueil sans conserver l'historique
  } catch (error) {
    errorMessage.value = "Échec de la connexion. Vérifiez vos informations."
  }
}

// Fonction pour revenir au formulaire d'inscription

</script>

<template>
  <section class="rounded-3xl overflow-hidden mx-4 md:mx-0 shadow-2xl">
    <div class="login-form bg-[#0F0F1D] pt-16 p-8 rounded-lg text-white max-w-[800px] mx-auto shadow-2xl">
      <form @submit.prevent="handleLogin" class="flex flex-col space-y-4">
        <div class="relative pb-2 border-b border-white">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="input-no-outline bg-[#0F0F1D] text-white text-3xl p-3 w-full rounded"
          />
        </div>
        <div class="relative pb-2 pt-16 border-b border-white">
          <input
            type="password"
            v-model="password"
            placeholder="Mot de passe"
            required
            class="input-no-outline bg-[#0F0F1D] text-white text-3xl p-3 w-full rounded"
          />
        </div>
        <div class="pb-12"></div>
        <button
          type="submit"
          class="bg-[#8B44FF] text-white md:w-[400px] px-12 md:px-0 mx-auto font-bold py-4 text-3xl rounded hover:bg-[#6f37c9] transition-colors duration-200"
        >
          VALIDER
        </button>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </form>

      
    </div>
  </section>
</template>


<style>
.font-mulish {
  font-family: 'Mulish', sans-serif;
}
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
</style>
