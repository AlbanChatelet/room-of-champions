<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'
import { pb } from '@/backend'
import type { EquipesResponse } from '@/pocketbase-types'
import { useHead } from 'unhead'
import QuillEditor from '@/components/QuillEditor.vue' // Importer le composant

const route = useRoute('/equipes/edit/[[id]]')
const router = useRouter()

useHead({
  title: 'équipe' + (route.params.id ? ' - Éditer' : ' - Créer')
})

// Vérifier si l'on est en mode "édition" ou "création"
const isEditMode = ref(!!route.params.id)
const equipeId = ref(route.params.id)

// Variables pour le formulaire
const form = ref({
  nom: '',
  description: ''
})

// Charger les données de l'équipe si on est en mode "édition"
onMounted(async () => {
  if (isEditMode.value && equipeId.value) {
    try {
      const response = await pb.collection('equipes').getOne<EquipesResponse>(equipeId.value)
      form.value.nom = response.nom
      form.value.description = response.description
    } catch (error) {
      console.error('Error fetching team details for editing:', error)
    }
  }
})

// Fonction de soumission du formulaire (création ou mise à jour)
const submit = async () => {
  try {
    if (isEditMode.value && equipeId.value) {
      // Mettre à jour l'équipe existante
      await pb.collection('equipes').update(equipeId.value, form.value)
      router.push({ path: `/equipes/${equipeId.value}` }) // Correction ici
    } else {
      // Créer une nouvelle équipe
      const newEquipe = await pb.collection('equipes').create(form.value)
      router.push({ path: `/equipes/${newEquipe.id}` }) // Correction ici
    }
  } catch (error) {
    console.error('Error submitting team form:', error)
  }
}
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-2xl">{{ isEditMode ? 'Éditer' : 'Créer' }} une équipe</h1>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="nom" class="block text-sm font-medium text-gray-700">Nom de l'équipe</label>
        <input
          type="text"
          id="nom"
          v-model="form.nom"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <QuillEditor v-model="form.description" /> <!-- Utilisation de QuillEditor -->
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {{ isEditMode ? 'Mettre à jour' : 'Créer' }} l'équipe
      </button>
    </form>
  </div>
</template>
