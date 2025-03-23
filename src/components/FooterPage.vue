<script setup lang="ts">
import DiscordIcon from '@/assets/icons/DiscordIcon.vue';
import YoutubeIcon from '@/assets/icons/YoutubeIcon.vue';
import TwitchIcon from '@/assets/icons/TwitchIcon.vue';

</script>

<template>
  <footer class="w-full border-t border-gray-300 py-4 bg-[#000000]">
    <p class="font-bold text-5xl ml-8">ROOM OF CHAMPIONS</p>
    
    <div class=" mx-auto px-8 pt-8">
      <div class="grid lg:grid-cols-2 md:gap-96 text-base text-white text-left font-bold">
        <div class="grid grid-cols-2  md:text-2xl text-white">
        <a href="#" class="hover:text-white">JEUX</a>
        <a href="#" class="hover:text-white">MATERIEL</a>
        <a href="#" class="hover:text-white">EQUIPES</a>
        <a href="#" class="hover:text-white">EVENEMENTS</a>
        <a href="#" class="hover:text-white">PLANNING</a>
        <a href="#" class="hover:text-white"></a>
      <div class="flex">
        <div class="py-4 ">
    <button class="bg-[#8E3F8D] h-[60px] text-[#FFFFFF] font-bold py-2 px-4 rounded-[16px] text-base shadow-xl transform transition-transform duration-300 hover:scale-105">
      INSCRIPTION
    </button>
  </div>
  <div class="py-4  pl-2">
    <button class="bg-[#FFFFFF] h-[60px] text-[#8E3F8D] font-bold py-2 px-4 rounded-[16px] text-base shadow-xl transform transition-transform duration-300 hover:scale-105">
      CONNEXION
    </button>
  </div></div>
      </div>
        
        <!-- Contenu violet sur la droite -->
        <div class="border-4 border-[#8E3F8D] md:w-[575px] md:p-8 p-2 space-y-4">
          <p class="font-bold text-xl text-[#FFFFFF]">4 PLACE LUCIEN THARRADIN 25200, MONTBÉLIARD</p>
          <p class="font-normal text-xl text-white">DÉPARTEMENT MMI</p>
          <p class="font-normal text-xl text-white">SALLE 201</p>
          <div class="flex space-x-4">
            <button class="bg-[#FFFFFF] h-[60px] text-[#8E3F8D] font-bold py-2 px-4 rounded-[16px] border-2 border-[#8E3F8D] text-base shadow-xl transform transition-transform duration-300 hover:scale-105">
              CONTACT
            </button>
            <button class="bg-[#FFFFFF] h-[60px] text-[#8E3F8D] font-bold py-2 px-4 rounded-[16px] border-2 border-[#8E3F8D] text-base shadow-xl transform transition-transform duration-300 hover:scale-105">
              A PROPOS
            </button>
          </div><div class="flex justify-center pt-4">
      <DiscordIcon class="w-24 h-24" />
      <YoutubeIcon class="w-24 h-24" />
      <TwitchIcon class="w-24 h-24" />
    </div>
        </div>
      </div>
    </div>

    <!-- Icônes réseaux sociaux en dessous de la section violette -->
    

    <div class="border-b border-white py-4"></div>
    <div class="max-w-screen-lg mx-auto px-8 pt-4">
      <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 text-center">
        <a href="#" class="hover:text-white">Home of champions</a>
        <a href="#" class="hover:text-white">FAQ</a>
        <a href="#" class="hover:text-white">Politique de Cookies</a>
        <li>
          <RouterLink to="/Mentions" class="hover:text-white">
            Mentions légales
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/CGU" class="hover:text-white">
            CGU
          </RouterLink>
        </li>
        <a href="#" class="hover:text-white">Politique de confidentialité</a>
      </div>
    </div>
  </footer>
</template>
