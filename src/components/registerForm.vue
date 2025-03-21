<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { registerUser, pb } from '@/backend'

const acceptCookies = ref(false)
const emit = defineEmits(['register-success', 'show-login'])
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref<string | null>(null)
const showLogin = ref(false)

const handleRegister = async () => {
  try {
    // Vérification des champs de base
    if (!username.value || !email.value || !password.value || password.value !== passwordConfirm.value) {
      errorMessage.value = "Tous les champs sont obligatoires et les mots de passe doivent correspondre."
      return
    }

    // Enregistrement de l'utilisateur
    await registerUser(username.value, email.value, password.value, passwordConfirm.value)

    alert("Inscription réussie !")
    emit('register-success')
  } catch (error) {
    errorMessage.value = "Échec de l'inscription."
  }
}

const showLoginComponent = () => {
  emit('show-login') // Emission de l'événement pour afficher le formulaire de connexion
}
</script>

<template>
  <section class="rounded-3xl overflow-hidden shadow-2xl ">
    <div class="flex h-screen rounded-xl">
      <!-- Partie gauche pour l'image -->
      <div class="md:w-1/2 bg-[#0F0F1D] flex justify-center items-center rounded-l-xl ml-4 px-6">
        <img src="@/assets/logo_auth.webp" alt="Logo" class="md:w-[400px] w-0"/>
      </div>

      <!-- Partie droite pour le formulaire -->
      <div class="md:w-1/2 bg-[#0F0F1D] pr-8 text-white flex pt-32 rounded-r-xl">
        <form @submit.prevent="handleRegister" class="flex flex-col space-y-6 w-full max-w-2xl">
          <div class="relative pb-2 border-b border-white">
            <input
              type="text"
              v-model="username"
              placeholder="Nom d'utilisateur"
              required
              class="input-no-outline bg-[#0F0F1D] text-white md:text-3xl p-3 w-full rounded"
            />
          </div>

          <div class="relative pb-2 border-b border-white">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
              class="input-no-outline bg-[#0F0F1D] text-white md:text-3xl p-3 w-full rounded"
            />
          </div>

          <div class="relative pb-2 border-b border-white">
            <input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
              required
              class="input-no-outline bg-[#0F0F1D] text-white md:text-3xl p-3 w-full rounded"
            />
          </div>

          <div class="relative pb-2 border-b border-white">
            <input
              type="password"
              v-model="passwordConfirm"
              placeholder="Confirmer le mot de passe"
              required
              class="input-no-outline bg-[#0F0F1D] text-white md:text-3xl p-3 w-full rounded"
            />
          </div>

          <button
            type="submit"
            class="bg-[#8E3F8D] text-2xl md:text-4xl text-white font-bold py-4 rounded hover:bg-[#793377] transition-colors duration-200 input-no-outline"
          >
            VALIDER
          </button>

          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
          
          <p class="mt-6">
            Déjà un compte ? 
            <button @click="showLoginComponent" class="text-[#1ac0b8] hover:underline">Connectez-vous ici</button>
          </p>
        </form>

        <LoginForm v-if="showLogin" />
      </div>
    </div>
  </section>
</template>

<style>
/* On cible tous les inputs, boutons et checkboxes */
.input-no-outline {
  outline: none !important;
  box-shadow: none !important;
}

/* Pour s’assurer de virer les focus sur les navigateurs chiants (Safari/Chrome) */
input:focus, button:focus, textarea:focus {
  outline: none !important;
  box-shadow: none !important;
}
</style>
