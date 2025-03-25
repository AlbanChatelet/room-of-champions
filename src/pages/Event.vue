<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
</script>

<template>
    <main class="bg-[#000011] p-6 md:p-24">
        <h1 class="font-poppins font-black text-2xl md:text-4xl text-white pl-4 md:pl-16 pb-6">
            LES ÉVÉNEMENTS D’
            <span class="text-[#00c9c6]">HOME OF CHAMPIONS</span>
        </h1>
        <div class="w-full md:w-[502px] h-[3px] bg-[#00c9c6]"></div>
        <div class="flex justify-center items-center mt-8">
            <span class="bg-[#00c9c6] text-white font-black font-poppins text-2xl md:text-4xl py-2 px-4 mt-12">
            À VENIR
            </span>
        </div>
        <div class="flex flex-col md:flex-row justify-between mt-12">
            <div class="bg-gradient-to-b from-black to-[#00c9c6] text-black p-6 md:p-10 w-full md:w-1/3 mx-2 mb-6 md:mb-0 border border-white rounded-3xl">
                <span class="text-white font-black font-poppins text-2xl md:text-4xl">Événement à venir...</span>
                <div class="text-white font-poppins mt-4 md:mt-10 text-lg md:text-xl leading-relaxed">
                    Pas encore d'événement pour le moment. Restez connecté pour être informé des prochains événements organisés par Home of Champions.
                </div>
            </div>
            <div class="bg-gradient-to-b from-black to-[#00c9c6] text-black p-6 md:p-10 w-full md:w-1/3 mx-2 mb-6 md:mb-0 border border-white rounded-3xl">
                <span class="text-white font-black font-poppins text-2xl md:text-4xl">Événement à venir...</span>
                <div class="text-white font-poppins mt-4 md:mt-10 text-lg md:text-xl leading-relaxed">
                    Pas encore d'événement pour le moment. Restez connecté pour être informé des prochains événements organisés par Home of Champions.
            </div></div>
            <div class="bg-gradient-to-b from-black to-[#00c9c6] text-black p-6 md:p-10 w-full md:w-1/3 mx-2 mb-6 md:mb-0 border border-white rounded-3xl">
                <span class="text-white font-black font-poppins text-2xl md:text-4xl">Événement à venir...</span>
                <div class="text-white font-poppins mt-4 md:mt-10 text-lg md:text-xl leading-relaxed">
                    Pas encore d'événement pour le moment. Restez connecté pour être informé des prochains événements organisés par Home of Champions.
                </div>
            </div>
        </div>
        <section class="hidden">
        <div class="flex justify-center items-center mt-12">
            <span class="bg-[#00c9c6] text-white font-black font-poppins text-2xl md:text-4xl py-2 px-4 mt-12">
            ÉVÉNEMENTS PRÉCÉDENTS
            </span>
        </div>
        <div class="flex flex-wrap justify-between mt-12">
            <div class="w-full md:w-1/2 p-2">
                <img src="/img/inauguration_salle.png" alt="inauguration" class="w-full h-auto rounded-3xl">
            </div>
            <div class="w-full md:w-1/2 p-6 md:p-10 mt-4 bg-white rounded-3xl">
                <div class="text-black font-black font-poppins text-2xl md:text-4xl">Événement à venir...</div>
                <div class="text-black font-poppins mt-4 text-lg md:text-xl leading-relaxed">
                    Une journée portes ouvertes marquant l’inauguration officielle de la salle Home for Champions. Les étudiants ont pu découvrir les équipements dernier cri, participer à des démonstrations de jeux en direct, et s’inscrire à des compétitions exclusives.
                </div>
                <div class="flex justify-end mt-4">
                    <button class="font-poppins font-black p-3 text-lg md:text-4xl border-4 border-[#00c9c6] rounded-3xl">
                        VOIR PLUS
                    </button>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-6 md:p-10 mt-4 bg-white rounded-3xl">
                <div class="text-black font-black font-poppins text-2xl md:text-4xl">ÉVÉNEMENT 2</div>
                <div class="text-black font-poppins mt-4 text-lg md:text-xl leading-relaxed">
                    Un tournoi convivial réunissant les amateurs et passionnés d’esport du campus pour clôturer l’année dans une ambiance festive. Les participants se sont affrontés sur League of Legends.
                </div>
                <div class="flex justify-end mt-4">
                    <button class="font-poppins font-black p-3 text-lg md:text-4xl border-4 border-[#00c9c6] rounded-3xl">
                        VOIR PLUS
                    </button>
                </div>
            </div>
            <div class="w-full md:w-1/2 p-2">
                <img src="/img/winter_gaming_cup.png" alt="winter gaming cup" class="w-full h-auto rounded-3xl">
            </div>
        </div></section>
    </main>
</template>
