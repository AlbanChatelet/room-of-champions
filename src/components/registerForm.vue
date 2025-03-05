<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { registerUser } from '@/backend'
import LoginForm from '@/components/loginForm.vue'

const acceptCookies = ref(false)

const emit = defineEmits(['register-success', 'show-login']) // Ajout de l'événement 'show-login'
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref<string | null>(null)
const showLogin = ref(false)

const handleRegister = async () => {
  if (!acceptCookies.value) {
    errorMessage.value = "Veuillez accepter les CGU"
    return
  }

  try {
    await registerUser(username.value, email.value, password.value, passwordConfirm.value)
    errorMessage.value = null
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.")
    emit('register-success')
  } catch (error) {
    errorMessage.value = "Échec de l'inscription. Vérifiez vos informations."
  }
}

const showLoginComponent = () => {
  emit('show-login') // Emission de l'événement pour afficher le formulaire de connexion
}
</script>

<template>
  <section class="rounded-3xl overflow-hidden shadow-2xl">
    <div class="flex h-screen rounded-xl">
      <!-- Partie gauche pour l'image -->
      <div class="w-1/2 bg-[#0F0F1D] flex justify-center items-center rounded-l-xl">
        <img src="@/assets/logo_auth.webp" alt="Logo" class="max-w-[400px]"/>
      </div>

      <!-- Partie droite pour le formulaire -->
      <div class="w-1/2 bg-[#0F0F1D] pr-8 text-white flex pt-32 rounded-r-xl">
        <form @submit.prevent="handleRegister" class="flex flex-col space-y-6 w-full max-w-2xl">
          <div class="relative pb-2 border-b border-white">
            <input
              type="text"
              v-model="username"
              placeholder="Nom d'utilisateur"
              required
              class="input-no-outline bg-[#0F0F1D] text-white text-3xl p-3 w-full rounded"
            />
          </div>

          <div class="relative pb-2 border-b border-white">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
              class="input-no-outline bg-[#0F0F1D] text-white text-3xl p-3 w-full rounded"
            />
          </div>

          <div class="relative pb-2 border-b border-white">
            <input
              type="password"
              v-model="password"
              placeholder="Mot de passe"
              required
              class="input-no-outline bg-[#0F0F1D] text-white text-3xl p-3 w-full rounded"
            />
          </div>

          <div class="relative pb-2 border-b border-white">
            <input
              type="password"
              v-model="passwordConfirm"
              placeholder="Confirmer le mot de passe"
              required
              class="input-no-outline bg-[#0F0F1D] text-white text-3xl p-3 w-full rounded"
            />
          </div>
          
          <div class="flex items-start text-white mt-4 space-x-4">
            <div
              class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
              @click="acceptCookies = !acceptCookies"
            >
              <div
                class="w-6 h-5 rounded-full bg-[#8E3F8D]"
                :class="acceptCookies ? 'scale-100' : 'scale-0'"
                style="transition: transform 0.2s ease"
              ></div>
            </div>

            <label class="text-white text-[16px] font-light leading-5">
              En cliquant sur “Valider”, vous confirmez que vous acceptez les Conditions Générales d'Utilisation (CGU) et la Politique de Confidentialité (lien vers les CGU et la politique de confidentialité).
            </label>
          </div>

          <button
            type="submit"
            class="bg-[#8E3F8D] text-4xl text-white font-bold py-4 rounded hover:bg-[#793377] transition-colors duration-200 input-no-outline"
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
