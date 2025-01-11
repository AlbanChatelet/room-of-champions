<script setup lang="ts">
import { ref, onMounted } from "vue";

// Importation des images
import valorantImg from "../assets/valorant.webp";
import lolImg from "../assets/lol.webp";
import rocketleagueImg from "../assets/rocketleague.webp";
import supersmashbrosImg from "../assets/supersmashbros.webp";
import mariokartImg from "../assets/mariokart.webp";
// Index de l'image active
const activeIndex = ref(0);

// Liste des images
const images = [valorantImg, lolImg, rocketleagueImg, supersmashbrosImg, mariokartImg];

// Fonction pour changer l'image active
const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % images.length;
};

// Fonction pour changer l'image après un certain temps
onMounted(() => {
  setInterval(nextImage, 4000); // Change l'image toutes les 4 secondes (4000ms)
});

const setImage = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <main>
    <div class="relative">
      <!-- Image de couverture -->
      <img src="../assets/cover.webp" alt="Image de fond" class="w-full">

      <!-- Image vague avec texte centré -->
      <div class="relative">
        <img src="../assets/vague.webp" alt="Image de fond" class="w-full z-10 -mt-20">

        <!-- Texte au centre de l'image -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
          <!-- Titre principal -->
          <p class="text-[#8B44FF] text-4xl md:text-8xl font-bold">ROOM OF CHAMPIONS</p>
          <!-- Texte secondaire -->
          <div class="md:px-[450px] px-8">
            <p class="text-white text-xs md:text-2xl mt-4">
              Découvrez l’univers de l’Esport Universitaire grâce à notre salle conçue
              spécialement pour la pratique de jeux vidéos compétitif et en équipe
            </p>
          </div>
        </div>

        <!-- Rectangle "LES JEUX PROPOSÉS" positionné sur l'image vague -->
<div class="absolute px-4 py-1 md:top-[85%] left-8 top-[110%] bg-[#8E3F8D] text-white md:py-4 md:px-36 shadow-lg max-w-fit
            sm:px-10 sm:py-2 sm:text-xl">
  <p class="text-xs font-bold sm:text-2xl">LES JEUX PROPOSÉS</p>
</div>

      </div>
    </div>

    <!-- Carrousel -->
    <section class="bg-[#000011] py-10">
      <div class="relative max-w-screen-lg mx-auto">
        <!-- Images -->
        <div class="flex justify-center">
          <img
            :src="images[activeIndex]"
            alt="Jeu vidéo"
            class="w-full"
          />
        </div>

        <!-- Rond et points sous le carrousel -->
        <div class="relative flex flex-col items-center mt-6">
          <!-- Points autour du rond -->
          <div class="relative mt-4 w-40 h-40">
            <!-- Points au-dessus du cercle -->
            <div
              v-for="(image, index) in images"
              :key="index"
              @click="setImage(index)"
              class="absolute w-4 h-4 rounded-full cursor-pointer transition-all"
              :class="{
                'bg-[#8E3F8D]': activeIndex === index,
                'bg-gray-500': activeIndex !== index
              }"
              :style="{
                top: '-25%', /* Positionnement des points au-dessus du cercle */
                left: `${(100 / (images.length + 1)) * (index + 1)}%`, /* Calcul dynamique de la position horizontale */
                transform: 'translateX(-50%)'
              }"
            ></div>
          </div>

          <!-- Bouton rond au centre -->
          <button
            @click="nextImage"
            class="w-32 h-32 bg-[#8E3F8D] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#743272] transition-all absolute z-50"
          >
          </button>
        </div>
      </div>
    </section>
  </main>
</template>




<style>
/* Si besoin, styles personnalisés */
</style>
