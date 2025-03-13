<!-- eslint-disable vue/multi-word-component-names -->
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

<template>
  <header class="w-full bg-gradient-to-r from-fond-foncé to-purple-700 py-16 md:py-20">
    <div class="wrapper flex flex-col items-center justify-center text-center text-white">
      <h2 class="font-montserrat text-3xl md:text-5xl font-semibold tracking-wide leading-snug">
        Contactez-moi
      </h2>
      <p class="mt-4 text-lg md:text-xl opacity-80">
        Une question, une idée ou un projet ? N'hésitez pas à me laisser un message.
      </p>
    </div>
  </header>

  <main class="py-12 px-6 md:px-12 bg-fond-clair">
    <section class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nom -->
        <div class="relative">
          <label for="name" class="block text-lg font-semibold text-fond-foncé mb-2">
            Nom
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Entrez votre nom"
            class="w-full h-[50px] text-base md:text-lg font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <!-- Email -->
        <div class="relative">
          <label for="email" class="block text-lg font-semibold text-fond-foncé mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Entrez votre email"
            class="w-full h-[50px] text-base md:text-lg font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <!-- Message -->
        <div class="relative">
          <label for="message" class="block text-lg font-semibold text-fond-foncé mb-2">
            Message
          </label>
          <textarea
            id="message"
            v-model="message"
            placeholder="Entrez votre message"
            rows="5"
            class="w-full text-base md:text-lg font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          ></textarea>
        </div>

        <!-- Bouton d'envoi -->
        <button
          :disabled="isLoading"
          type="submit"
          class="w-full py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Envoi en cours...' : 'Envoyer' }}
        </button>
      </form>
    </section>
  </main>
</template>
