<script setup lang="ts">
import { ref, onMounted } from "vue";

// Importation des images
import valorantImg from "../assets/valorant.webp";
import lolImg from "../assets/lol.webp";
import rocketleagueImg from "../assets/rocketleague.webp";
import supersmashbrosImg from "../assets/supersmashbros.webp";
import mariokartImg from "../assets/mariokart.webp";
import lineIcon from "@/assets/icons/lineIcon.vue";
import lineIcon2 from "@/assets/icons/lineIcon2.vue";
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
            <p class="text-white text-xs md:text-2xl mt-4 mb-4">
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
<section class="bg-[#000011] py-16">
  <div class="relative max-w-screen-lg mx-auto">
    <!-- Images -->
    <div class="flex justify-center">
      <img
  :src="images[activeIndex]"
  alt="Jeu vidéo"
  class="w-full max-w-xs sm:max-w-sm md:max-w-full mx-auto"
/>
    </div>

    <!-- Rond et points sous le carrousel -->
    <div class="relative flex flex-col items-center mt-6">
      <!-- Points autour du rond -->
      <div class="relative mt-4 w-40 h-40">
        <div
          v-for="(image, index) in images"
          :key="index"
          @click="setImage(index)"
          class="absolute w-4 h-4 rounded-full cursor-pointer transition-all"
          :class="{
            'bg-[#8E3F8D] hover:bg-[#662a64] transition-all': activeIndex === index,
            'bg-gray-500': activeIndex !== index
          }"
          :style="{
            top: '-25%',
            left: `${(100 / (images.length + 1)) * (index + 1)}%`,
            transform: 'translateX(-50%)'
          }"
        ></div>
      </div>
      
      <!-- Bouton rond au centre -->
      <button
        @click="nextImage"
        class="md:w-32 md:h-32 w-16 h-16 bg-[#8E3F8D] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#743272] transition-all absolute"
      >
      </button>
    </div>
  </div>
</section>

    <section class="bg-[#8E3F8D] py-10">
  <div class="inset-0 flex flex-col items-center justify-center text-center pt-16">
    <!-- Titre principal -->
    <p class="text-[#ffffff] text-2xl md:text-5xl font-bold">ROOM OF CHAMPIONS, C'EST QUOI ?</p>
  </div>

  <!-- Section des cartes -->
  <div class="container mx-auto px-12 md:px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div class="relative bg-[#8E3F8D] rounded-[40px] shadow-lg overflow-hidden border-4 border-white transform transition-transform duration-300 hover:scale-105">
        <div class="absolute top-2 right-2  text-[#8E518D] text-4xl md:text-9xl font-bold px-4 py-1 rounded-full">1</div>
        <div class="p-6">
          <h3 class="md:text-4xl font-bold mt-16 md:mt-64 text-white px-2 text-xl md:px-8">UNE SALLE DÉDIÉE À L'ESPORT</h3>
          <p class="text-white md:text-2xl font-light mt-4 px-2 md:px-8 text-lg">Home of Champions est un espace pensé pour les étudiants passionnés d'esport, avec un matériel haut de gamme et des jeux compétitifs.</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="relative bg-[#8E3F8D] rounded-[40px] shadow-lg overflow-hidden border-4 border-white transform transition-transform duration-300 hover:scale-105">
        <div class="absolute top-2 right-2  text-[#8E518D] text-4xl  md:text-9xl font-bold px-4 py-1 rounded-full">2</div>
        <div class="p-6">
          <h3 class="md:text-4xl font-bold mt-16 md:mt-64 text-white px-2 text-xl md:px-8">UN LIEU D'ÉQUIPE ET DE COMPÉTITION</h3>
          <p class="text-white md:text-2xl font-light mt-4 px-2 md:px-8 text-lg">Rassemblez vos équipes, entraînez-vous, participez à des tournois et vivez une expérience compétitive unique.</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="relative bg-[#8E3F8D] rounded-[40px] shadow-lg overflow-hidden border-4 border-white transform transition-transform duration-300 hover:scale-105">
        <div class="absolute top-2 right-2 text-[#8E518D] text-4xl  md:text-9xl font-bold px-4 py-1 rounded-full">3</div>
        <div class="p-6">
          <h3 class="md:text-4xl font-bold mt-16 md:mt-64 text-white px-2 text-xl md:px-8">UN AGENDA RICHE ET DYNAMIQUE</h3>
          <p class="text-white md:text-2xl font-light mt-4 px-2 md:px-8 text-lg">Découvrez un emploi du temps varié : pratiques, formations, événements spéciaux et retransmissions en streaming.</p>
        </div>
      </div>
    </div>
  </div>
</section>


<section class="fond_triangle">
  <div class="flex justify-center pb-2">
    <button class="bg-[#FFFFFF] h-[60px] text-[#8E3F8D] font-bold py-2 px-6 rounded-[16px] text-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
      NOUS DÉCOUVRIR
    </button>
  </div>

  <div class="flex justify-center px-4 pt-20">
    <div class="bg-gradient-to-b from-[#461145] to-[#8E3F8D] border-[12px] border-white rounded-[30px] w-full max-w-[1550px] p-8 relative">
      <!-- Contenu du rectangle -->
      <h2 class="text-white text-2xl md:text-5xl font-bold mb-4">REJOIGNEZ LA COMPÉTITION DÈS AUJOURD'HUI</h2>
      <p class="text-white text-xl md:text-3xl md:pr-[800px] mb-8 font-light pb-16 md:pb-32">Créez votre compte et devenez un acteur clé de 
l'univers e-sportif !</p>
      
      <!-- Bouton en bas à droite -->
      <button class="absolute bottom-4 ml-4 md:ml-0 md:right-4 bg-white text-[#8E3F8D] font-bold py-2 px-12 text-2xl rounded-[30px] shadow-md hover:bg-[#ffffff] transition-all duration-300">
        S'INSCRIRE
      </button>
    </div>
  </div>
</section>

<section class="bg-[#000011] pt-12 md:pt-0 md:py-16">
  <div class="inset-0 flex items-center justify-center text-center md:pt-16">
    <!-- Titre principal -->
    <lineIcon2 />
    <p class="text-[#00C9C6] text-xl md:text-5xl font-bold px-4 md:px-16 whitespace-nowrap">LE PLANNING</p>
    <lineIcon />
  </div>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-1/2">
      <img src="../assets/calendar.webp" alt="">
    </div>

    <div class="md:w-1/2">
      <div class="flex flex-col ">
        <p class="text-[#ffffff] text-2xl md:text-5xl font-bold md:pt-[180px] md:pr-[220px] md:px-0 px-8 ">PLANIFIEZ VOS ÉVÉNEMENTS E-SPORTS EN TOUTE SIMPLICITÉ</p>
        <p class="text-white text-lg md:text-4xl font-light pt-12 md:pr-64 mx-8 pb-8 md:mx-0 md:pb-0">Grâce à notre outil de planning intuitif, réservez vos créneaux pour vos matchs, entraînements ou rendez-vous stratégiques en quelques clics. Prenez le contrôle de votre calendrier, synchronisez-vous avec vos coéquipiers, et assurez-vous d’être toujours prêt pour la victoire. Commencez à planifier votre succès dès maintenant !</p>
        <div class="flex justify-center items-center md:pl-[500px] md:pt-12 pb-12 md:pb-0">
  <button class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[32px] text-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
    DÉCOUVRIR
  </button>
</div>

      </div>
    </div>
  </div>
</section>

<section>
  <div class="relative w-full h-32 bg-[#000011] flex items-center justify-center">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full h-[80px] md:h-[263px] bg-[#00C9C6]"></div>
    </div>
    <div class="relative bg-white h-[130px] w-[200px] md:h-[388px] md:w-[781px] text-black flex items-center justify-center font-bold text-[24px] md:text-[100px] rounded-md shadow-md">
      LES ÉQUIPES
    </div>
  </div>
</section>

<section class="fond_vert">
  <div class="mb-12 flex flex-wrap md:flex-nowrap justify-center items-center pt-32 gap-8 md:gap-16">
    <!-- Étape 1 -->
    <div class="text-white text-center">
      <div class="text-[200px] md:text-[300px] font-bold opacity-10">1</div>
      <h3 class="text-3xl md:text-[40px] font-bold">COMPOSE TON ÉQUIPE</h3>
      <p class="text-white text-xl md:text-3xl px-4 sm:px-8 md:px-[90px]">Que ce soit avec tes amis ou alors avec de nouvelles rencontres !</p>
    </div>
    <div class="w-[5px] h-auto md:h-[550px] bg-gradient-to-b from-[#00C9C6] to-[#000011] hidden md:block"></div>

    <!-- Étape 2 -->
    <div class="text-white text-center">
      <div class="text-[200px] md:text-[300px] font-bold opacity-10">2</div>
      <h3 class="text-3xl md:text-[40px] font-bold">INSCRIS TON ÉQUIPE</h3>
      <p class="text-white text-xl md:text-3xl px-4 sm:px-8 md:px-[90px]">Inscrivez-vous à des séances d'entraînements ou des tournois !</p>
    </div>
    <div class="w-[5px] h-auto md:h-[550px] bg-gradient-to-b from-[#00C9C6] to-[#000011] hidden md:block"></div>

    <!-- Étape 3 -->
    <div class="text-white text-center">
      <div class="text-[200px] md:text-[300px] font-bold opacity-10">3</div>
      <h3 class="text-3xl md:text-[40px] font-bold">CHERCHEZ LA VICTOIRE</h3>
      <p class="text-white text-xl md:text-3xl px-4 sm:px-8 md:px-[90px]">Faites partie des meilleurs en remportant des matchs !</p>
    </div>
  </div>

  <div class="flex justify-center pt-16">
    <button class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[16px] text-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
      VOIR LES ÉQUIPES
    </button>
  </div>
</section>


<section class="bg-[#000011]">
  <div class="md:w-[1100px] items-center justify-center mx-8 md:mx-auto flex flex-col pb-8 md:pb-0">
    <img src="../assets/setup.webp" alt="">
  </div>
<div class="text-white text-center">
      
      <h3 class="text-3xl md:text-[40px] font-bold mx-8 md:pt-16">RETROUVE LA PAGE DU MATÉRIEL</h3>
      
    </div>
    <div class="flex justify-center pt-8 pb-8">
    <button class="bg-[#FFFFFF] h-[60px] text-[#00C9C6] font-bold py-2 px-6 rounded-[16px] text-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
      JUSTE ICI !
    </button>
  </div>
</section>

  </main>
</template>




<style>
.fond_triangle {
  background-image: url('@/assets/fond_triangle.webp');
  background-size: cover;
}

.fond_vert {
  background-image: url('@/assets/fond_vert.webp');
  background-size: cover;
}

</style>
