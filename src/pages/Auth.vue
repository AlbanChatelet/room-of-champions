<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/loginForm.vue'
import RegisterForm from '@/components/registerForm.vue'

const showLoginForm = ref(false)

// Fonction pour passer à la page de login
const onShowLoginForm = () => {
  showLoginForm.value = true
}

// Fonction pour revenir à la page d'inscription après l'inscription réussie
const onRegisterSuccess = () => {
  showLoginForm.value = false
}
</script>

<template>
  <section class="fond_auth">
    <div class="container mx-auto py-10">
      <div class="text-center pb-6">
        <h1 class="text-4xl font-black lg:text-7xl text-[#8B44FF] font-mulish shadow-text">
          {{ showLoginForm ? 'CONNEXION' : 'CREER UN COMPTE' }}
        </h1>
      </div>
      
      <div>
        <div v-if="!showLoginForm">
          <RegisterForm @register-success="onRegisterSuccess" @show-login="onShowLoginForm" />
        </div>
        <div v-else>
          <LoginForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.fond_auth {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}

.shadow-text {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
}

.font-mulish {
  font-family: 'Mulish', sans-serif;
}

.font-orbitron {
  font-family: 'Orbitron', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Orbitron:wght@400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
</style>
