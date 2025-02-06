<template>
    <section class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Réserver un créneau</h2>

        <div class="space-y-4">
            <div class="relative">
                <!-- Calendrier toujours visible avec inline: true -->
                <flat-pickr
                    v-model="date"
                    :config="config"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Sélectionnez une date"
                    name="date"
                />
            </div>

            <div class="flex justify-between">
                <button 
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    title="Réserver"
                    @click="reserveSlot"
                >
                    <i class="fa fa-calendar"></i>Réserver
                </button>

                <button 
                    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    title="Effacer la date"
                    @click="date = ''"
                >
                    <i class="fa fa-times"></i>Effacer
                </button>
            </div>
        </div>

        <pre class="mt-4 text-gray-600 bg-gray-100 p-2 rounded">Date sélectionnée : {{ date || 'Aucune date sélectionnée' }}</pre>

        <div v-if="reservedSlots.length" class="mt-6">
            <h3 class="text-lg font-semibold text-gray-700">Créneaux réservés :</h3>
            <ul class="list-disc pl-6 mt-2">
                <li v-for="(slot, index) in reservedSlots" :key="index" class="text-gray-600">
                    {{ slot.date }} - Réservé par {{ slot.utilisateur }}
                </li>
            </ul>
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

// Vérifie si la session est toujours valide après rechargement
if (!pb.authStore.isValid) {
    console.warn("Utilisateur non connecté ou session expirée.");
}

const date = ref('');
const reservedSlots = ref([]);

const config = ref({
    altFormat: 'd F Y',
    altInput: true,
    dateFormat: 'Y-m-d',
    locale: French,
    inline: true,  // Garde le calendrier ouvert en permanence
});

// Charger les créneaux réservés au démarrage
onMounted(async () => {
    await fetchReservedSlots();
});

const fetchReservedSlots = async () => {
    try {
        // Utilise 'expand' pour récupérer les informations sur l'utilisateur (username)
        const records = await pb.collection('reservations').getFullList({
            expand: 'user',  // Assurez-vous que le champ relation est bien 'user'
        });

        reservedSlots.value = records.map(record => ({
            date: record.date,  // La date de réservation
            utilisateur: record.expand?.user?.username || "Inconnu", // Récupère le 'username' de l'utilisateur, ou "Inconnu" si non trouvé
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
        // Crée une réservation avec la relation vers l'utilisateur
        const reservation = await pb.collection('reservations').create({
            date: date.value,
            utilisateur: user.id, // L'ID de l'utilisateur qui effectue la réservation
            statut: true, // Indique que le créneau est réservé
        });

        // Récupérer la réservation créée avec la relation utilisateur étendue
        const expandedReservation = await pb.collection('reservations').getOne(reservation.id, {
            expand: 'user',  // Étend la relation pour récupérer les infos de l'utilisateur
        });

        // Mettre à jour la liste des créneaux réservés avec la réservation étendue
        reservedSlots.value.push({
            date: expandedReservation.date,
            utilisateur: expandedReservation.expand?.user?.username || "Inconnu", // Si le username est disponible
        });

        
    } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        alert("Une erreur est survenue lors de la réservation.");
    }
};
</script>
