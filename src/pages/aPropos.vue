<script setup lang="ts">
import { ref, onMounted } from "vue";
import L from "leaflet";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090"); // Remplace par ton URL si nécessaire
interface Membre {
  id: string;
  Prenom_Nom: string;
  Specialite: string;
  photo: string;
  logo?: string;
  portfolio: string;
}

const membres = ref<Membre[]>([]);

onMounted(async () => {
  try {
    const records = await pb.collection("Nous").getFullList();
    membres.value = records;
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
  }

  const map = L.map("map").setView([47.4948596, 6.8029504], 18); // Nouvelle localisation précise

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([47.4948596, 6.8029504])
    .addTo(map)
    .bindPopup("📍 Département MMI, Campus Universitaire<br>4 Place Lucien Tharradin, 25200 Montbéliard")
    .openPopup();
});
</script>

<template>
  <section class="fond_apropos pt-32 md:pt-12 pb-32">
    <div class="px-6 md:px-12">
      <h1 class="text-2xl md:text-4xl font-bold text-white">ROOM OF CHAMPIONS,</h1>
      <h1 class="text-2xl md:text-4xl font-bold text-white">C'EST QUOI ?</h1>
      <p class="text-white font-light text-sm md:text-2xl md:pl-4">Découvrez qui nous sommes</p>
      <p class="text-white text-sm md:text-2xl md:pl-4">Le site internet de la salle d’esport de Montbéliard</p>
    </div>

    <div class="flex justify-center pt-4">
      <p class="text-white font-bold text-sm md:text-2xl">NOTRE LOCALISATION</p>
    </div>

    <!-- Conteneur de la carte + cadre -->
    <div class="relative flex justify-center pt-6 pb-4">
      <!-- Carte Leaflet -->
      <div id="map" class="relative w-[90%] md:w-[600px] h-[300px] md:h-[500px] rounded-lg shadow-lg z-10"></div>
    </div>

    <!-- Texte sous la carte -->
    <div class="w-[90%] md:w-[600px] mx-auto bg-gradient-to-r from-[#000011] to-[#00C9C6] p-4 rounded-lg shadow-md text-center border-2 border-white">
      <h2 class="text-lg md:text-xl font-bold text-white">Département MMI, Campus Universitaire</h2>
      <p class="text-white">4 Place Lucien Tharradin, 25200 Montbéliard</p>
    </div>
  </section>

  <section class="bg-[#000011] justify-center items-center min-h-screen">
    <div class="flex flex-col md:flex-row items-center justify-center w-full px-6 md:gap-x-24">
      
      <!-- Étape 1 -->
      <div class="text-white text-center md:w-1/2">
        <div class="text-[100px] md:text-[200px] font-bold">01.<strong>NOTRE ORIGINE</strong></div>
        <p class="text-white text-xl md:text-xl sm:px-8 text-left">
          Home of Champions est né de la passion de quatre étudiants en deuxième année de BUT MMI, partageant un intérêt commun pour l’esport et le développement web. Ce projet collaboratif représente l’aboutissement de nos compétences acquises et notre engagement pour créer une expérience immersive et informative.
        </p>
      </div>

      <!-- Barre de séparation avec espace -->
      <div class="hidden md:flex justify-center">
        <div class="w-[5px] h-[550px] bg-gradient-to-b from-[#FFFFFF] to-[#030314]"></div>
      </div>

      <!-- Étape 2 -->
      <div class="text-white text-center md:w-1/2">
        <div class="text-[100px] md:text-[200px] font-bold">02.<strong>À QUOI ÇA SERT ?</strong></div>
        <p class="text-white text-xl md:text-xl sm:px-8 text-left">
          Ce site a pour objectif de centraliser toutes les informations relatives à la salle d’esport de notre université. Il permet aux utilisateurs de découvrir les équipes, les jeux disponibles, les événements à venir, et de suivre les performances des compétitions.
        </p>
      </div>

    </div>
    <div class="flex flex-col md:flex-row items-center justify-center w-full px-6 md:gap-x-24 pt-24">
      
      <!-- Étape 3 -->
      <div class="text-white text-center md:w-1/2">
        <div class="text-[100px] md:text-[200px] font-bold">03.<strong>LE BUT</strong></div>
        <p class="text-white text-xl md:text-xl sm:px-8 text-left">
          Créer une plateforme innovante, responsive et conviviale qui valorise la communauté esportive universitaire. Nous voulons offrir un outil indispensable pour informer, connecter et inspirer les amateurs d’esport.
        </p>
      </div>

      <!-- Barre de séparation avec espace -->
      <div class="hidden md:flex justify-center">
        <div class="w-[5px] h-[550px] bg-gradient-to-b from-[#FFFFFF] to-[#030314]"></div>
      </div>

      <!-- Étape 4 -->
      <div class="text-white text-center md:w-1/2">
        <div class="text-[100px] md:text-[200px] font-bold">04.<strong>QUI SOMMES-NOUS ?</strong></div>
        <p class="text-white text-xl md:text-xl sm:px-8 text-left">
          Nous sommes un groupe de quatre étudiants passionnés par le numérique, le design, et l’esport. Chacun apporte ses compétences spécifiques : webdesign, développement, communication et gestion de projet, pour faire de 'Home of Champions' une référence universitaire.
        </p>
      </div>

    </div>
  </section>

  <section class="fond_groupe">
    <div class="flex justify-center pt-4">
      <p class="text-white font-bold text-sm md:text-5xl">NOTRE GROUPE</p>
    </div>

    <div class="flex flex-wrap justify-center gap-8 px-6 pt-8">
      <div v-for="membre in membres" :key="membre.id" class="text-center p-6  w-80">
        <img :src="pb.files.getUrl(membre, membre.photo)" alt="Photo" class="w-48 h-48 rounded-full mx-auto mb-4 object-cover">
        <h3 class="text-white text-xl font-bold">
  <a :href="membre.portfolio" target="_blank" rel="noopener noreferrer" class="hover:underline">
    {{ membre.Prenom_Nom }}
  </a>
</h3>

        <p class="text-[#00C9C6] text-lg">{{ membre.Specialite }}</p>
        <img v-if="membre.logo" :src="pb.files.getUrl(membre, membre.logo)" alt="Logo" class="w-28 h-24 mx-auto mt-4">

        <a :href="membre.portfolio" target="_blank" rel="noopener noreferrer" class="inline-block mt-4 px-4 py-2 bg-[#00C9C6] bg-opacity-20 text-opacity-100 text-white font-bold rounded-lg hover:bg-[#008b8a] transition">
    Portfolio
  </a>
      </div>
      
    </div>
    
  </section>

</template>

<style>
.fond_apropos {
  background-image: url('@/assets/fond_apropos.webp');
  background-size: cover;
}

.fond_groupe {
  background-image: url('@/assets/fond_groupe.webp');
  background-size: cover;
}

#map {
  border-radius: 12px;
  overflow: hidden;
}

strong {
  color: #00C9C6;
  font-size: 28px;
}
</style>
