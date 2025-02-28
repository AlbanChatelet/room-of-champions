<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import rocketleague from "@/assets/rocketleague.webp";
import valorant from "@/assets/valorant.webp";
import supersmashbros from "@/assets/supersmashbros.webp";

const images = [
  { src: rocketleague, alt: "Rocket League" },
  { src: valorant, alt: "Valorant" },
  { src: supersmashbros, alt: "Super Smash Bros" },
];

const currentIndex = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

onMounted(() => {
  interval = setInterval(nextSlide, 3000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <main class="bg-[#000011] p-6 md:p-24">
    <h1 class="font-poppins font-black text-2xl md:text-4xl text-white pl-4 md:pl-16 pb-6">
  LES JEUX PROPOSÉS À HOME OF CHAMPIONS
</h1>
<div class="w-full md:w-[502px] h-[3px] bg-[#00c9c6] ml-4 md:ml-16"></div>


    <h2 class="text-lg md:text-xl text-white font-black text-center mt-6">
      LES JEUX LES PLUS DEMANDÉS
    </h2>

    <!-- Carrousel -->
    <div class="relative max-w-4xl mx-auto mt-10 overflow-hidden">
      <div class="flex transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="flex-shrink-0 w-full">
          <img :src="image.src" :alt="image.alt" class="w-full h-64 md:h-96 object-cover rounded-lg">
        </div>
      </div>

      <!-- Boutons de navigation -->
      <button @click="prevSlide" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80">
        ❮
      </button>
      <button @click="nextSlide" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/80">
        ❯
      </button>
      
      <!-- Pagination -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span v-for="(image, index) in images" :key="index" 
          class="w-3 h-3 rounded-full" 
          :class="index === currentIndex ? 'bg-white' : 'bg-gray-500'"
          @click="currentIndex = index">
        </span>
      </div>
    </div>
    <h1 class="font-poppins font-black text-2xl md:text-4xl text-white pl-4 md:pl-16 pb-6">
      LA LISTE COMPLETE
    </h1>
    <div class="w-full md:w-[502px] h-[3px] bg-[#00c9c6] ml-4 md:ml-16"></div>

  </main>
</template>
