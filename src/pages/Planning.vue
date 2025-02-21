<template>
  <section class="bg-black">
    <div class="pl-16 py-12">
      <h1 class="font-poppins font-black text-4xl text-white pb-6">
        LE PLANNING CHEZ HOME OF CHAMPIONS
      </h1>
      <div class="w-[502px] h-[3px] bg-[#8B44FF]"></div>
    </div>

    <section class="max-w-md mx-auto p-6 bg-[#8B44FF] text-white shadow-lg rounded-lg">
      <h2 class="text-xl font-semibold text-white mb-4">Réserver un créneau</h2>

      <div class="space-y-4">
        <!-- Sélecteur de date -->
        <div class="relative">
          <flat-pickr
            v-model="date"
            :config="dateConfig"
            class="w-full px-4 py-2 border border-[#9B59B6] bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#D8BFD8] focus:outline-none"
            placeholder="Sélectionnez une date"
            name="date"
          />
        </div>

        <!-- Sélecteur d'heure -->
        <div class="relative">
    <flat-pickr
    v-model="heure"
    :config="timeConfig"
    class="w-full px-4 py-2 border border-[#9B59B6] bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-[#D8BFD8] focus:outline-none"
    placeholder="Sélectionnez une heure"
    name="heure"
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
            title="Effacer"
            @click="clearSelection"
          >
            <i class="fa fa-times"></i> Effacer
          </button>
        </div>
      </div>

      <pre class="mt-4 text-white bg-[#6A0DAD] p-2 rounded">Sélection : {{ selectedDateTime || 'Aucunes' }}</pre>

      <div v-if="reservedSlots.length" class="mt-6">
        <h3 class="text-lg font-semibold text-white">Créneaux réservés :</h3>
        <ul class="list-disc pl-6 mt-2">
          <li v-for="(slot, index) in reservedSlots" :key="index" class="text-gray-300">
  {{ formatDate2(formatDate(slot.date)) }} à {{ slot.heure }} - Réservé par {{ slot.user }}
</li>
        </ul>
      </div>
    </section>

    <div class="text-center pt-12">
      <router-link to="/MesCrenaux" class="px-12 py-2 bg-black text-[#8B44FF] border border-white rounded-lg hover:bg-black md:text-3xl font-bold">
        MES CRENAUX
      </router-link>
    </div>

    <div class="text-center py-12">
      <button 
        class="px-4 py-2 bg-white text-[#9932CC] rounded-lg hover:bg-[#9932CC] hover:text-white transition duration-200 md:text-3xl font-bold"
        title="Réserver"
        @click="reserveSlot"
      >
        <i class="fa fa-calendar"></i> RESERVER UN CRENAU
      </button>
    </div>
  </section>
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
const heure = ref('');
const reservedSlots = ref([]);
const selectedDateTime = ref('');


const dateConfig = ref({
  altFormat: 'd F Y',
  altInput: true,
  dateFormat: 'Y-m-d',
  locale: French,
  inline: true,
});

const timeConfig = ref({
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
  locale: French,
});

// Charger les créneaux réservés au démarrage
onMounted(async () => {
  await fetchReservedSlots();
});

const fetchReservedSlots = async () => {
  try {
    const records = await pb.collection('reservations').getFullList({
      expand: 'user', // On étend la relation 'user'
    });

    console.log(records);  // Vérifie que les réservations sont récupérées
    reservedSlots.value = records.map(record => ({
      date: record.date,
      heure: record.heure,
      user: record.expand?.user?.username || "Inconnu",
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
  }
};


// Fonction pour réserver un créneau
const reserveSlot = async () => {
    if (!date.value || !heure.value) {  // Vérifie si la date et l'heure sont sélectionnées
        alert("Veuillez sélectionner une date et une heure.");
        return;
    }

    const user = pb.authStore.model;
    if (!user) {
        alert("Vous devez être connecté pour réserver un créneau.");
        return;
    }

    try {
        // Crée la réservation avec la date et l'heure
        const reservation = await pb.collection('reservations').create({
            date: date.value,
            heure: heure.value,  // Ajoute l'heure dans la réservation
            user: user.id, // Envoie l'ID de l'utilisateur
            statut: true,
        });

        // Récupérer la réservation créée avec la relation utilisateur étendue
        const expandedReservation = await pb.collection('reservations').getOne(reservation.id, {
            expand: 'user',
        });

        reservedSlots.value.push({
            date: expandedReservation.date,
            heure: expandedReservation.heure,  // Affiche l'heure de la réservation
            user: expandedReservation.expand?.user?.username || "Inconnu",
        });

    } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        alert("Une erreur est survenue lors de la réservation.");
    }
};

// Fonction pour effacer la sélection
const clearSelection = () => {
  date.value = '';
  heure.value = '';
};

const formatDate = (dateString) => {
  return dateString.slice(0, 10); // Prend les 10 premiers caractères de la date
  
};

const formatDate2 = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

import { watch } from 'vue';

watch([date, heure], () => {
  if (date.value && heure.value) {
    selectedDateTime.value = `${formatDate2(date.value)} à ${heure.value}`;
  } else {
    selectedDateTime.value = 'Aucunes';
  }
});

</script>
