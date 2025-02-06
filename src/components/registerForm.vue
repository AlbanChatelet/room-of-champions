<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { registerUser } from '@/backend'
import LoginForm from '@/components/loginForm.vue' // Importer votre composant de connexion

const emit = defineEmits(['register-success'])
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref<string | null>(null)
const showLogin = ref(false) // État pour contrôler l'affichage du composant de connexion

// Fonction d'inscription
const handleRegister = async () => {
  try {
    await registerUser(email.value, password.value, passwordConfirm.value)
    errorMessage.value = null
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.")
    emit('register-success') // Émet l'événement pour signaler le succès
  } catch (error) {
    errorMessage.value = "Échec de l'inscription. Vérifiez vos informations."
  }
}

// Fonction pour afficher le composant de connexion
const showLoginComponent = () => {
  showLogin.value = true
}
</script>

<template>
  <div class="register-form bg-[#303030] p-8 rounded-lg border-2 border-[#E7C920] text-white">
    <h2 class="text-2xl font-bold text-[#E7C920] mb-6 font-mulish">Inscription</h2>
    <form @submit.prevent="handleRegister" class="flex flex-col space-y-4">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
        class="border border-[#E7C920] bg-[#505050] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#E7C920]"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
        class="border border-[#E7C920] bg-[#505050] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#E7C920]"
      />
      <input
        type="password"
        v-model="passwordConfirm"
        placeholder="Confirmer le mot de passe"
        required
        class="border border-[#E7C920] bg-[#505050] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#E7C920]"
      />
      <button
        type="submit"
        class="bg-[#E7C920] text-[#303030] font-bold py-2 rounded hover:bg-[#c8a800] transition-colors duration-200"
      >
        Inscription
      </button>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      <div class="flex items-center text-[#E7C920]">
          <input type="checkbox" id="acceptCookies" class="mr-2"/>
          <label for="acceptCGU" class="text-[#c79e53] text-[12px] font-semibold">J’accepte les CGU</label>
          
        </div>
    </form>
    <!-- Lien vers le composant de connexion -->
    <p class="mt-6">
      Déjà un compte ? 
      <button @click="showLoginComponent" class="text-[#1ac0b8] hover:underline">Connectez-vous ici</button>
    </p>
    
    <!-- Afficher le composant de connexion si showLogin est vrai -->
    <LoginForm v-if="showLogin" />
  </div>
</template>

<style>
.font-mulish {
  font-family: 'Mulish', sans-serif;
}
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');
</style>
