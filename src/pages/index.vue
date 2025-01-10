<script setup lang="ts">
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
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center ">
          <!-- Titre principal -->
          <p class="text-[#8B44FF] text-4xl md:text-8xl font-bold">ROOM OF CHAMPIONS</p>
          <!-- Texte secondaire -->
           <div class="px-[450px]">
          <p class="text-white text-lg md:text-2xl mt-4 ">
            Découvrez l’univers de l’Esport Universitaire grâce à notre salle conçue 
            spécialement pour la pratique de jeux vidéos compétitif et en équipe
          
          </p></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
/* Si besoin, styles personnalisés */
</style>
