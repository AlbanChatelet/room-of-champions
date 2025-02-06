  <script setup lang="ts">
  import { RouterLink } from 'vue-router/auto';
  import MenuBurger from "@/assets/icons/MenuBurger.vue";
  import ProfileIcon from "@/assets/icons/ProfileIcon.vue";

  const isMenuOpen = ref(false);
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  import { onMounted, ref } from 'vue';
  import PocketBase from 'pocketbase';

  const pb = new PocketBase("http://127.0.0.1:8090");

  const isLoggedIn = ref(pb.authStore.isValid);
  const user = ref(pb.authStore.model);
  const isProfileMenuOpen = ref(false);

  const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
  };

  const logout = () => {
    pb.authStore.clear();
    isLoggedIn.value = false;
    user.value = null;
  };

  onMounted(() => {
    isLoggedIn.value = pb.authStore.isValid;
    user.value = pb.authStore.model;
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
        <RouterLink to="/" class="flex items-center md:pr-[550px]">
          <img class="h-16 md:h-20 2xl:h-40" src="../assets/logo.webp" alt="Logo" />
        </RouterLink>
      </div>

      <!-- Menu Desktop -->
      <nav class="hidden 2xl:flex items-center justify-between py-14 w-full px-24">
        <!-- Liens du menu -->
        <ul class="flex space-x-24 bg-[#00C9C6] items-center h-[60px] rounded-[16px]">
          <li>
            <RouterLink to="/jeux">
              <button class="text-black rounded-lg flex pl-12 items-center justify-center font-source-code-pro font-bold">
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
            <RouterLink to="/Planning" class="text-black rounded-lg flex items-center justify-center font-source-code-pro font-bold">
              PLANNING
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/evenements" class="text-black rounded-lg flex ml-[170px] items-center justify-center font-source-code-pro font-bold">
              ÉVÉNEMENTS
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="text-black rounded-lg flex items-center  justify-center font-source-code-pro font-bold">
              MATÉRIEL
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/" class="text-black rounded-lg flex items-center pr-24 justify-center font-source-code-pro font-bold">
              CONTACT
            </RouterLink>
          </li>
        </ul>

        <!-- Profile Icon et Menu de Profil -->
        <div class="relative ml-auto">
          <ProfileIcon v-if="isLoggedIn" @click="toggleProfileMenu" class="w-20 h-20 cursor-pointer" />
          
          <div v-if="isProfileMenuOpen" class="absolute top-full right-0 bg-white shadow-md rounded-lg mt-2 p-4 z-50">
            <p v-if="isLoggedIn" class="text-black font-bold">Bonjour, {{ user?.username || 'Utilisateur' }}</p>
            <button v-if="isLoggedIn" @click="logout" class="mt-2 bg-red-500 text-white px-4 py-2 rounded-md">
              Déconnexion
            </button>
          </div>
        </div>

        <!-- Boutons Connexion et Inscription (visibles uniquement si l'utilisateur n'est pas connecté) -->
        <div v-if="!isLoggedIn" class="flex space-x-4">
          <RouterLink to="/Auth" class="bg-[#00C9C6] h-[60px] text-black font-bold py-2 px-6 rounded-[16px] shadow-md hover:bg-[#7aecea] transition-all duration-300 pt-4">
            INSCRIPTION
          </RouterLink>
          <RouterLink to="/Auth" class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[16px] shadow-md hover:bg-[#e4ffff] transition-all duration-300 pt-4">
            CONNEXION
          </RouterLink>
        </div>
      </nav>
    </header>
  </template>

