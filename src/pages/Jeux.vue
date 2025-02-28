<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Liste des images
import rocketLeagueImage from "../assets/rocketleague.webp";
import valorantImage from "../assets/valorant.webp";
import superSmashBrosImage from "../assets/supersmashbros.webp";

const images = [
  { src: rocketLeagueImage, alt: "Rocket League" },
  { src: valorantImage, alt: "Valorant" },
  { src: superSmashBrosImage, alt: "Super Smash Bros" },
];

const currentIndex = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

// Fonction pour passer au slide suivant
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

// Fonction pour passer au slide précédent
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

// Auto-scroll toutes les 3 secondes
onMounted(() => {
  interval = setInterval(nextSlide, 3000);
});

// Stop auto-scroll lorsqu'on quitte le composant
onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <main class="bg-[#000011] p-10 flex flex-col items-center">
    <h1 class="text-white text-3xl font-bold text-center mb-6">
      LES JEUX PROPOSÉS À HOME OF CHAMPIONS
    </h1>
    <div class="w-48 h-[3px] bg-[#00c9c6] mb-6"></div>

    <div class="relative w-full max-w-lg overflow-hidden">
      <!-- Slides -->
      <div
        class="flex transition-transform duration-700"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      <!-- Bouton Précédent -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 -translate-y-1/2 left-4 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-900"
      >
        ❮
      </button>

      <!-- Bouton Suivant -->
      <button
        @click="nextSlide"
        class="absolute top-1/2 -translate-y-1/2 right-4 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-900"
      >
        ❯
      </button>

      <!-- Pagination -->
      <div class="flex justify-center mt-4 space-x-2">
        <span
          v-for="(image, index) in images"
          :key="index"
          @click="currentIndex = index"
          class="w-3 h-3 rounded-full cursor-pointer"
          :class="index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'"
        ></span>
      </div>
    </div>
  </main>
</template>
