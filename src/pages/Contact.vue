<template>
  <section class="fond_auth min-h-screen flex items-center justify-center px-6 pt-28 md:pt-0">
    <div class="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12  shadow-lg p-10 rounded-lg">
      <!-- Partie gauche - Adresse -->
      <div class="flex flex-col justify-center">
      
        <div class="mt-4 text-lg text-white">
          <p class="md:text-4xl font-light">Localisation</p>
          <p class="md:text-4xl font-semibold pt-4">4 place lucien tharradin</p>
          <p class="md:text-4xl font-semibold pt-4">25200, montbéliard</p>
        </div>

        <div class="mt-20 text-lg text-white">
          <p class="md:text-4xl font-light">Contact</p>
          <p class="md:text-4xl font-semibold pt-4">07 81 03 49 34</p>
          <p class="md:text-3xl font-semibold pt-4">homeofchampions@gmail.com</p>
        </div>
      </div>

      <!-- Partie droite - Formulaire -->
      <div class="flex flex-col justify-center bg-white p-8 shadow-md">
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-lg font-semibold text-black">Nom</label>
            <input id="name" v-model="name" type="text" class="w-full h-12 px-4 text-gray-700" />
            <div class="w-full h-[2px] bg-black mt-2"></div>
          

          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-lg font-semibold text-black">Email</label>
            <input id="email" v-model="email" type="email" class="w-full h-12 px-4 text-gray-700" />
            <div class="w-full h-[2px] bg-black mt-2"></div>
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-lg font-semibold text-black">Message</label>
            <textarea id="message" v-model="message" rows="4" class="w-full  px-4 py-2 text-gray-700"></textarea>
            <div class="w-full h-[2px] bg-black mt-2"></div>
          </div>

          <!-- Bouton d'envoi -->
           <div class="flex justify-center">
          <button type="submit" :disabled="isLoading" class="md:w-72 w-48 h-12 bg-purple-600 text-white text-lg md:text-2xl font-semibold  hover:bg-purple-700 disabled:opacity-50">
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer le message' }}
          </button></div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  if (!name.value || !email.value || !message.value) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '1fa547ea-6606-4b5f-afd6-48d1c7208389',
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    if (response.ok) {
      alert('Message envoyé avec succès.');
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  } catch (error) {
    console.error(error);
    alert('Erreur de connexion.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.fond_auth {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>
