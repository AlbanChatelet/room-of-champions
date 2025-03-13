<script setup lang="ts">
import { RouterLink } from 'vue-router/auto';
import MenuBurger from "@/assets/icons/MenuBurger.vue";
import ProfileIcon from "@/assets/icons/ProfileIcon.vue";
import { onMounted, ref } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

const isMenuOpen = ref(false);
const isLoggedIn = ref(pb.authStore.isValid);
const user = ref(pb.authStore.model);
const isProfileMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const logout = () => {
  pb.authStore.clear();
  isLoggedIn.value = false;
  user.value = null;
  window.location.reload(); // Force le refresh après la déconnexion
};

const login = async (credentials: { email: string; password: string }) => {
  try {
    await pb.collection('users').authWithPassword(credentials.email, credentials.password);
    window.location.reload(); // Force le refresh après la connexion
  } catch (error) {
    console.error("Erreur de connexion :", error);
  }
};

onMounted(() => {
  isLoggedIn.value = pb.authStore.isValid;
  user.value = pb.authStore.model;

  pb.authStore.onChange(() => {
    isLoggedIn.value = pb.authStore.isValid;
    user.value = pb.authStore.model;
  });
});
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
      <RouterLink to="/" class="flex items-center md:pr-[40px]">
        <img class="h-16 md:h-20 2xl:h-40" src="../assets/logo.webp" alt="Logo" />
      </RouterLink>
    </div>

    <!-- Menu Desktop -->
    <nav class="hidden 2xl:flex items-center justify-between py-14 w-full pl-[450px]">
      <ul class="flex space-x-16 bg-[#00C9C6] items-center h-[60px] rounded-[16px]">
        <li>
          <RouterLink to="/jeux">
            <button class="text-black rounded-lg hover:text-white transition duration-300 ease-in-out flex pl-12 items-center justify-center font-source-code-pro font-bold">
              JEUX
            </button>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/equipes">
          <button class="text-black hover:text-white transition duration-300 ease-in-out  rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            EQUIPES
          </button>
        </RouterLink>
        </li>
        <li>
          <RouterLink to="/Planning" class="text-black hover:text-white transition duration-300 ease-in-out  rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            PLANNING
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/Event" class="text-black hover:text-white transition duration-300 ease-in-out  rounded-lg flex ml-[170px] items-center justify-center font-source-code-pro font-bold">
            ÉVÉNEMENTS
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/Materiel" class="text-black  hover:text-white transition duration-300 ease-in-out rounded-lg flex items-center justify-center font-source-code-pro font-bold">
            MATÉRIEL
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/Contact" class="text-black  hover:text-white transition duration-300 ease-in-out rounded-lg flex items-center pr-12 justify-center font-source-code-pro font-bold">
            CONTACT
          </RouterLink>
        </li>
      </ul>

      <div v-if="isLoggedIn" class="relative mr-48">
        <ProfileIcon @click="toggleProfileMenu" class="w-20 h-20 cursor-pointer" />

        <div v-if="isProfileMenuOpen" class="absolute top-full right-0 bg-white shadow-md rounded-lg mt-2 p-4 z-50">
          <p class="text-black font-bold">Bonjour, {{ user?.username || 'Utilisateur' }}</p>
          <button @click="logout" class="mt-2 bg-red-500 text-white px-4 py-2 rounded-md">
            Déconnexion
          </button>
        </div>
      </div>

      <div v-if="!isLoggedIn" class="flex space-x-4 mr-12">
        <RouterLink to="/Auth" class="bg-[#00C9C6] h-[60px] text-black font-bold py-2 px-6 rounded-[16px] shadow-md hover:bg-[#7aecea] transition-all duration-300 pt-4">
          INSCRIPTION
        </RouterLink>
        <RouterLink to="/Auth" class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[16px] shadow-md hover:bg-[#e4ffff] transition-all duration-300 pt-4">
          CONNEXION
        </RouterLink>
      </div>
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

    <transition name="slide-fade">
  <div v-if="isMenuOpen" class="absolute top-24 right-0 w-full fond_header z-50 flex flex-col items-center p-4 2xl:hidden shadow-lg shadow-gray-500/50">
    <nav class="flex flex-col items-center space-y-2 font-spartan w-full">
      <RouterLink to="/Jeux" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          JEUX
        </button>
      </RouterLink>
      <RouterLink to="/equipes" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          EQUIPES
        </button>
      </RouterLink>
      <RouterLink to="/planning" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          PLANNING
        </button>
      </RouterLink>
      <RouterLink to="/Event" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          ÉVÉNEMENTS
        </button>
      </RouterLink>
      <RouterLink to="/Materiel" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          MATÉRIEL
        </button>
      </RouterLink>
      <RouterLink to="/Contact" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          CONTACT
        </button>
      </RouterLink>
      <RouterLink to="/Auth" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold border-b border-gray-300 py-2 w-full text-center">
          INSCRIPTION
        </button>
      </RouterLink>
      <RouterLink to="/Auth" class="w-full">
        <button class="text-[#00C9C6] text-lg font-source-code-pro font-bold py-2 w-full text-center">
          CONNEXION
        </button>
      </RouterLink>
    </nav>
  </div>
</transition>


  </header>
</template>
