<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
</script>

<template>
  <main class="bg-[#000011] p-24">
    <div>
      <h1 class="font-poppins font-black text-4xl text-white pl-16 pb-6">
        LES JEUX PROPOSÉS À HOME OF CHAMPIONS
      </h1>
    </div>
    <div class="w-[502px] h-[3px] bg-[#00c9c6]"></div>
    
    <div class="flex justify-center mt-6 pt-24">
      <h2 class="text-xl text-white font-black font-poppins">
        LES JEUX LES PLUS DEMANDÉS
      </h2>
    </div>

    <!-- Carrousel -->
    <div 
      data-hs-carousel='{
        "loadingClasses": "opacity-0",
        "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
        "isCentered": true,
        "slidesQty": { "xs": 1, "lg": 2 }
      }'
      class="relative mt-10"
    >
      <div class="hs-carousel w-full overflow-hidden bg-white rounded-lg">
        <div class="relative min-h-72 flex transition-transform duration-700">
          <!-- Première image -->
          <div class="hs-carousel-slide flex justify-center px-2">
            <img src="../assets/rocketleague.webp" alt="Rocket League" class="w-full h-auto rounded-lg">
          </div>
          <!-- Deuxième image -->
          <div class="hs-carousel-slide flex justify-center px-2">
            <img src="../assets/valorant.webp" alt="Valorant" class="w-full h-auto rounded-lg">
          </div>
          <!-- Troisième image -->
          <div class="hs-carousel-slide flex justify-center px-2">
            <img src="../assets/supersmashbros.webp" alt="Super Smash Bros" class="w-full h-auto rounded-lg">
          </div>
        </div>
      </div>

      <!-- Boutons de navigation -->
      <button type="button" class="hs-carousel-prev absolute inset-y-0 start-0 flex items-center w-12 h-full text-white hover:bg-gray-800/50 rounded-s-lg">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>
      <button type="button" class="hs-carousel-next absolute inset-y-0 end-0 flex items-center w-12 h-full text-white hover:bg-gray-800/50 rounded-e-lg">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>

      <!-- Pagination -->
      <div class="hs-carousel-pagination flex justify-center absolute bottom-3 w-full space-x-2"></div>
    </div>
    <!-- Fin Carrousel -->
  </main>
</template>
