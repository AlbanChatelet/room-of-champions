<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';
import { ref } from 'vue'; // Importer ref
import MenuBurger from "@/assets/icons/MenuBurger.vue"; // Import du composant de l'icône burger

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};



</script>


<template>
  <header class="bg-[#000000] text-black flex items-center py-4 md:py-0 justify-between fixed top-0 left-0 w-full shadow-md z-50">
    <!-- Logo -->
    <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/8">
      <RouterLink to="/" class="flex items-center">
        <img class="h-32 md:h-40" src="../assets/logo.webp" alt="Logo" />
      </RouterLink>
    </div>

    <!-- Menu Desktop -->
    <nav class="hidden md:flex items-center space-x-8 py-14 w-full pl-48 pr-64">
      <ul class="flex space-x-8 bg-[#00C9C6] w-full justify-between items-center h-[60px]">
        <li>
          <button 
            class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            JEUX
          </button>
        </li>
        <li>
          <button 
            class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            EQUIPES
          </button>
        </li>
        <li>
          <button 
            class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            PLANNING
          </button>
        </li>
        <ul class="flex space-x-8 bg-[#00C9C6] w-full justify-between items-center h-[60px]"></ul>
        <li>
          <RouterLink
            to="/evenements"
            class="text-black rounded-lg flex pl-48 items-center justify-center font-source-code-pro font-bold">
            ÉVÈNEMENTS
          </RouterLink>
        </li>
        <li>
          <button 
            class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            MATÉRIEL
          </button>
        </li>
      </ul>
    </nav>

    <!-- Menu Burger pour mobile -->
    <button @click="toggleMenu" class="md:hidden flex items-center mr-4">
      <template v-if="isMenuOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </template>
      <template v-else>
        <MenuBurger class="w-6 h-6" />
      </template>
    </button>

    <!-- Menu Mobile avec ombre en bas et transition -->
    <transition name="slide-fade">
      <div v-if="isMenuOpen" class="absolute top-16 right-0 w-full bg-[#D8E4FA] z-50 flex flex-col p-4 md:hidden shadow-lg shadow-gray-500/50">
        <!-- Liens du menu mobile -->
        <nav class="flex flex-col items-start space-y-2 font-spartan w-full">
          <button 
           
            class="text-black text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            ACCUEIL
          </button>
          <button 
           
            class="text-black text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            A PROPOS
          </button>
          <button 
           
            class="text-black text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            PROJETS
          </button>
          <button 
            
            class="text-black text-lg font-source-code-pro font-bold py-2 w-full">
            CONTACT
          </button>

        </nav>
      </div>
    </transition>
  </header>
</template>

<style>
/* Transition personnalisée */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
