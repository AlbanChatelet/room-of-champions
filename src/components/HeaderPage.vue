<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';
import { ref } from 'vue';
import MenuBurger from "@/assets/icons/MenuBurger.vue";
import ProfileIcon from "@/assets/icons/ProfileIcon.vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style>
.fond_header {
  background: linear-gradient(to right, #001E20, #130926);
}
</style>

<template>
  <header class="fond_header text-black flex items-center pt-4 pb-0 justify-between fixed md:static top-0 left-0 w-full shadow-md z-50">
    
    <!-- Profile Icon Mobile -->
    <div class="pl-4 md:hidden">
      <ProfileIcon class="w-14 h-14" />
    </div>

    <!-- Logo -->
<div class="absolute left-1/2 -translate-x-1/2">
  <RouterLink to="/" class="flex items-center">
    <img class="h-16 md:h-20 2xl:h-40" src="../assets/logo.webp" alt="Logo" />
  </RouterLink>
</div>


    <!-- Menu Desktop -->
    <nav class="hidden 2xl:flex items-center space-x-8 py-14 w-full pl-24 pr-[550px]">
      <div class="mr-12 hidden md:flex">
        <ProfileIcon class="w-20 h-20" />
      </div>
      <ul class="flex space-x-32 bg-[#00C9C6] w-full justify-between items-center h-[60px] rounded-[16px]">
        <li>
          <RouterLink to="/jeux">
            <button class="text-black rounded-lg flex pl-24 items-center justify-center font-source-code-pro font-bold">
              JEUX
            </button>
          </RouterLink>
        </li>
        <li>
          <button class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            EQUIPES
          </button>
        </li>
        <li>
          <button class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            PLANNING
          </button>
        </li>
        <li>
          <RouterLink to="/evenements" class="text-black rounded-lg flex pl-48 items-center justify-center font-source-code-pro font-bold">
            ÉVÉNEMENTS
          </RouterLink>
        </li>
        <li>
          <button class="text-black rounded-lg flex items-center pr-24 justify-center font-source-code-pro font-bold">
            MATÉRIEL
          </button>
        </li>
      </ul>

      <!-- Bouton Inscription -->
      <button class="bg-[#00C9C6] h-[60px] text-black font-bold py-2 px-6 rounded-[16px] shadow-md hover:bg-[#7aecea] transition-all duration-300">
        INSCRIPTION
      </button>
      <button class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[16px] shadow-md hover:bg-[#e4ffff] transition-all duration-300">
        CONNEXION
      </button>
    </nav>

    <!-- Menu Burger pour mobile -->
    <button @click="toggleMenu" class="2xl:hidden flex items-center ml-auto py-6 pr-4 z-51">
      <template v-if="isMenuOpen">
        <svg class="w-12 h-12" fill="none" stroke="#00C9C6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </template>
      <template v-else>
        <MenuBurger class="w-12 h-12" />
      </template>
    </button>

    <!-- Menu Mobile avec ombre en bas et transition -->
    <transition name="slide-fade">
      <div v-if="isMenuOpen" class="absolute top-24 right-0 w-full fond_header z-50 flex flex-col p-4 2xl:hidden shadow-lg shadow-gray-500/50">
        <nav class="flex flex-col items-start space-y-2 font-spartan w-full">
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            JEUX
          </button>
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            EQUIPES
          </button>
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            PLANNING
          </button>
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            ÉVÉNEMENTS
          </button>
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            MATÉRIEL
          </button>
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full">
            INSCRIPTION
          </button>
          <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold py-2 w-full">
            CONNEXION
          </button>
        </nav>
      </div>
    </transition>
  </header>
</template>

