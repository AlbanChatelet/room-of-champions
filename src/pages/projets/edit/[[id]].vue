<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Créer un nouveau projet</h1>
    <form @submit="submit" class="bg-white p-6 rounded-lg shadow-md space-y-4">
      <!-- Nom du projet (description) -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
        <input
          v-model="form.description"
          type="text"
          id="description"
          name="description"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Ajout d'un champ pour l'image du projet -->
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Image du projet</label>
        <input
          type="file"
          id="image"
          @change="onFileChange"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Bouton de soumission -->
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Créer
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'

const router = useRouter()

// Variables pour le formulaire
const form = ref({
  description: '', // Nom du projet, utilisé comme description
  image: null,     // Image du projet
})

// Fonction pour gérer le changement de fichier (image)
const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    form.value.image = files[0] // Stocke le fichier image dans la variable form
  }
}

// Fonction de soumission du formulaire
const submit = async (event: Event) => {
  event.preventDefault()

  // Vérification de l'authentification de l'utilisateur
  const userId = pb.authStore.model?.id
  if (!userId) {
    console.error('Utilisateur non connecté.')
    return
  }

  // Préparation des données pour la création du projet
  const formData = new FormData()
  formData.append('description', form.value.description)
  formData.append('chef_projet', userId)
  
  // Ajoute l'image au FormData si elle existe
  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  try {
    // Création du projet dans PocketBase
    const newProjet = await pb.collection('projets').create(formData)

    // Redirection vers la page du projet créé
    router.push(`/projets/${newProjet.id}`)

  } catch (error) {
    console.error('Erreur lors de la création du projet :', error)
  }
}
</script>
