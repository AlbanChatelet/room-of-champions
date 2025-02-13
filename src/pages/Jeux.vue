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
    <div class="flex text-xl justify-center mt-6 text-white font-black font-poppins pt-24">
      <div>LES JEUX LES PLUS DEMANDÉS</div>
    </div>

    <!-- Carrousel -->
    <!-- Slider -->
<div data-hs-carousel='{
  "loadingClasses": "opacity-0",
  "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
  "isCentered": true,
  "slidesQty": {
    "xs": 1,
    "lg": 2
  }
}' class="relative">
  <div class="hs-carousel w-full overflow-hidden bg-white rounded-lg">
    <div class="relative min-h-72 -mx-1">
      <div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
        <!-- Première image -->
        <div class="hs-carousel-slide px-1">
          <div class="flex justify-center h-full">
            <img src="../assets/rocketleague.webp" alt="Jeu 1" class="w-full h-auto rounded-lg">
          </div>
        </div>
        <!-- Deuxième image -->
        <div class="hs-carousel-slide px-1">
          <div class="flex justify-center h-full">
            <img src="../assets/valorant.webp" alt="Jeu 2" class="w-full h-auto rounded-lg">
          </div>
        </div>
        <!-- Troisième image -->
        <div class="hs-carousel-slide px-1">
          <div class="flex justify-center h-full">
            <img src="../assets/supersmashbros.webp" alt="Jeu 3" class="w-full h-auto rounded-lg">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Boutons de navigation -->
  <button type="button" class="hs-carousel-prev absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 rounded-s-lg">
    <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"></path>
    </svg>
  </button>
  <button type="button" class="hs-carousel-next absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 rounded-e-lg">
    <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  </button>

  <!-- Pagination -->
  <div class="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"></div>
</div>
<!-- End Slider -->

  </main>
</template>
