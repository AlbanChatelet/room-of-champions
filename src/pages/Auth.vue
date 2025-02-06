<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/loginForm.vue'
import RegisterForm from '@/components/registerForm.vue'

const isRegistered = ref(false)

// Fonction pour changer d'état après l'inscription
const onRegisterSuccess = () => {
  isRegistered.value = true
}
</script>

<template>
  <section class="section_teemo">
    
    <div class="container mx-auto py-10">
      <div class="text-center pb-6">
        <h1 class="text-4xl font-black lg:text-7xl text-[#E7C920] font-mulish shadow-text">Authentification</h1>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8  p-8 ">
        <div v-if="!isRegistered">
          <RegisterForm @register-success="onRegisterSuccess" />
        </div>
        <div v-else>
          <LoginForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.section_teemo {
  background-image: url('@/assets/fond_teemo.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
