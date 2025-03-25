<template>
    <section class="fond_equipe py-10">
    <section class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-semibold text-[#4B0082] mb-4">Mes créneaux réservés</h2>

        <div v-if="loading" class="text-gray-500 text-center">Chargement...</div>

        <div v-else-if="reservedSlots.length === 0" class="text-gray-500 text-center">
            Aucun créneau réservé pour le moment.
        </div>

        <ul v-else class="space-y-3">
            <li v-for="(slot, index) in reservedSlots" :key="index" class="p-4 bg-[#F3E5F5] rounded-lg shadow">
                <p class="text-lg font-semibold text-[#6A0DAD]">📅 {{ formatDate(slot.date)}} à {{ slot.heure }}</p>
            </li>
        </ul>

        
    </section>
    <div class="text-center py-12">
    <router-link to="/Planning" class="px-4 py-2 bg-[#4B0082] text-white rounded-lg hover:bg-[#6A0DAD]">
    📅 Voir le planning
</router-link></div></section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const reservedSlots = ref([]);
const loading = ref(true);

const fetchMyReservations = async () => {
    try {
        const user = pb.authStore.model;
        if (!user) {
            console.warn("Utilisateur non connecté.");
            loading.value = false;
            return;
        }

        const records = await pb.collection('reservations').getFullList({
            filter: `user = "${user.id}"`,
        });

        reservedSlots.value = records.map(record => ({
            date: record.date,
            heure: record.heure, // Ajoute l'heure
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des créneaux :", error);
    } finally {
        loading.value = false;
    }
};


const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

onMounted(fetchMyReservations);
</script>
<style>
.fond_equipe {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>
