<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="max-w-md mx-auto mt-10 p-6 bg-[#4B0082] text-white shadow-lg rounded-lg">
    <h2 class="text-xl font-semibold text-white mb-4">Réserver un créneau</h2>

    <div class="space-y-4">
        <div class="relative">
            <flat-pickr
                v-model="date"
                :config="config"
                class="w-full px-4 py-2 border border-[#9B59B6] bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#D8BFD8] focus:outline-none"
                placeholder="Sélectionnez une date"
                name="date"
            />
        </div>

        <div class="flex justify-between">
            <button 
                class="px-4 py-2 bg-[#8A2BE2] text-white rounded-lg hover:bg-[#9932CC] transition duration-200"
                title="Réserver"
                @click="reserveSlot"
            >
                <i class="fa fa-calendar"></i> Réserver
            </button>

            <button 
                class="px-4 py-2 bg-[#E63946] text-white rounded-lg hover:bg-[#D62828] transition duration-200"
                title="Effacer la date"
                @click="date = ''"
            >
                <i class="fa fa-times"></i> Effacer
            </button>
        </div>
    </div>

    <pre class="mt-4 text-white bg-[#6A0DAD] p-2 rounded">Date sélectionnée : {{ date || 'Aucune date sélectionnée' }}</pre>

    <div v-if="reservedSlots.length" class="mt-6">
        <h3 class="text-lg font-semibold text-white">Créneaux réservés :</h3>
        <ul class="list-disc pl-6 mt-2">
            <li v-for="(slot, index) in reservedSlots" :key="index" class="text-gray-300">
                {{ slot.date }} - Réservé par {{ slot.user }}
            </li>
        </ul>
    </div>
</section>
<router-link to="/MesCrenaux" class="px-4 py-2 bg-[#4B0082] text-white rounded-lg hover:bg-[#6A0DAD]">
    📅 Mes créneaux
</router-link>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';
import { French } from 'flatpickr/dist/l10n/fr.js';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Remplace par ton URL PocketBase

const date = ref('');
const reservedSlots = ref([]);

const config = ref({
    altFormat: 'd F Y',
    altInput: true,
    dateFormat: 'Y-m-d',
    locale: French,
    inline: true,
});

// Charger les créneaux réservés au démarrage
onMounted(async () => {
    await fetchReservedSlots();
});

const fetchReservedSlots = async () => {
    try {
        const records = await pb.collection('reservations').getFullList({
            expand: 'user',  // On étend la relation 'user'
        });

        reservedSlots.value = records.map(record => ({
            date: record.date,
            user: record.expand?.user?.username || "Inconnu",
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
    }
};

// Fonction pour réserver un créneau
const reserveSlot = async () => {
    if (!date.value) {
        alert("Veuillez sélectionner une date.");
        return;
    }

    const user = pb.authStore.model;
    if (!user) {
        alert("Vous devez être connecté pour réserver un créneau.");
        return;
    }

    try {
        const reservation = await pb.collection('reservations').create({
            date: date.value,
            user: user.id, // Envoie l'ID de l'utilisateur en tant que relation
            statut: true,
        });

        // Récupérer la réservation créée avec la relation utilisateur étendue
        const expandedReservation = await pb.collection('reservations').getOne(reservation.id, {
            expand: 'user',
        });

        reservedSlots.value.push({
            date: expandedReservation.date,
            user: expandedReservation.expand?.user?.username || "Inconnu",
        });

    } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        alert("Une erreur est survenue lors de la réservation.");
    }
};
</script>
