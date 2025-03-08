<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
</script>

<template>
<main class="bg-[#000011] p-6 md:p-24">
    <h1 class="font-poppins font-black text-2xl md:text-4xl text-white pl-4 md:pl-16 pb-6">
        LE MATÉRIEL DES <span class="text-[#00c9c6]">CHAMPIONS</span>
    </h1>
    <div class="w-full md:w-[502px] h-[3px] bg-[#00c9c6] ml-4 md:ml-16"></div>
    <div class="flex flex-col md:flex-row pt-10">
        <div class="md:w-3/4">
            <h1 class="font-poppins font-black text-2xl md:text-4xl text-white pl-4 md:pl-16 pb-6">
                <span class="text-9xl m-10">01.</span><span class="text-[#00c9c6] pl-8">LA SOURIS</span>
            </h1>
            <h2 class="font-poppins text-xl md:text-2xl text-white pl-4 md:pl-16 pb-6 w-full">
                Souris Logitech G502. Prenez le contrôle avec la Logitech G502, la souris gaming de référence. 
                Avec ses capteurs ultra-précis, son poids ajustable et ses boutons programmables, elle ne suit pas vos mouvements : 
                elle les anticipe. Ergonomique et innovante, elle vous place toujours un clic d’avance.
            </h2>
        </div>
        <div class="hidden md:block w-[2px] bg-gradient-to-b from-[#000011] to-white mx-8"></div>
        <img src="@/assets/souris.png" alt="souris" class="md:w-1/2 w-full h-auto rounded-3xl mt-6 md:mt-0">
    </div>
</main>
</template>