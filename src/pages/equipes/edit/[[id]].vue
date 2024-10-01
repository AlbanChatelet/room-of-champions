<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Créer une nouvelle équipe</h1>
    <form @submit="submit" class="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom de l'équipe</label>
        <input
          v-model="form.nom"
          type="text"
          id="nom"
          name="nom"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <!-- Utilisation du composant QuillEditor pour la description -->
        <QuillEditor v-model="form.description" />
      </div>
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
import QuillEditor from '@/components/QuillEditor.vue' // Importer le composant QuillEditor

const router = useRouter()

// Variables pour le formulaire
const form = ref({
  nom: '',
  description: '' // La description sera remplie via le QuillEditor
})

// Fonction de soumission du formulaire
const submit = async (event: Event) => {
  event.preventDefault()

  // Validation des champs
  if (!form.value.nom || !form.value.description) {
    console.error('Tous les champs doivent être remplis')
    return
  }

  // Récupérer l'ID de l'utilisateur connecté
  const userId = pb.authStore.model.id // Assurez-vous que l'utilisateur est connecté

  try {
    const newEquipe = await pb.collection('equipes').create({
      nom: form.value.nom,
      description: form.value.description,
      chef_equipe: userId, // Définit l'utilisateur comme chef de l'équipe
      'membres': [userId] // Ajoute l'utilisateur comme membre de l'équipe
    })
    
    router.push({ name: '/equipes/[id]', params: { id: newEquipe.id } })
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe :', error)
  }
}
</script>
