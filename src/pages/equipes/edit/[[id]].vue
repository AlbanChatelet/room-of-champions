<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { JeuxResponse } from '@/pocketbase-types'

const router = useRouter()

const form = ref({
  nom: '',
  description: '',
  jeuxAssocies: [] as string[], // Stockage des jeux sélectionnés
})

const iconeFile = ref<File | null>(null)
const jeux = ref<JeuxResponse[]>([]) // Liste des jeux récupérés

onMounted(async () => {
  try {
    jeux.value = await pb.collection('jeux').getFullList<JeuxResponse>()
  } catch (error) {
    console.error('Erreur lors de la récupération des jeux:', error)
  }
})

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    iconeFile.value = target.files[0]
  }
}

const submit = async (event: Event) => {
  event.preventDefault()

  const userId = pb.authStore.model?.id
  if (!userId) {
    console.error('Utilisateur non connecté')
    return
  }

  if (!form.value.nom || !form.value.description) {
    console.error('Le nom et la description sont requis')
    return
  }

  const formData = new FormData()
  formData.append('nom', form.value.nom)
  formData.append('description', form.value.description)
  formData.append('chef_equipe', userId)

  // ✅ Correction : envoyer les IDs directement
  formData.append('membres', userId) // Si "membres" est une relation unique

  form.value.jeuxAssocies.forEach(id => formData.append('jeu_associe', id)) // Correction ici

  if (iconeFile.value) {
    formData.append('icone', iconeFile.value)
  }

  console.log("Données envoyées :", Object.fromEntries(formData.entries()))

  try {
    const newEquipe = await pb.collection('equipes').create(formData)
    console.log("Équipe créée avec succès :", newEquipe)
    router.push(`/equipes/${newEquipe.id}`)
  } catch (error: any) {
    console.error('Erreur lors de la création de l’équipe', error, error?.data)
  }
}
</script>


<template>
  <main class="min-h-screen flex items-center justify-center fond_equipe text-white py-12 px-12">
    <form @submit="submit" class="bg-white bg-opacity-10 rounded-tl-[80px] p-8">
      <h1 class="text-3xl md:text-7xl font-bold mb-4 text-white">Créer une équipe</h1>

      <div>
        <label for="nom" class="block text-sm font-medium mb-1">Nom de l’équipe</label>
        <input
          type="text"
          id="nom"
          v-model="form.nom"
          required
          class="w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          rows="3"
          class="w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md"
        ></textarea>
      </div>

      <div>
        <label for="icone" class="block text-sm font-medium mb-1">Icône de l’équipe (optionnel)</label>
        <input
          type="file"
          id="icone"
          @change="onFileChange"
          accept="image/*"
          class="w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md"
        />
      </div>

      <!-- Sélection des jeux associés -->
      <div>
        <label for="jeuxAssocies" class="block text-sm font-medium mb-1">Jeux associés à l’équipe</label>
        <div class="flex flex-wrap gap-2">
          <label v-for="jeu in jeux" :key="jeu.id" class="flex items-center space-x-2">
            <input
              type="checkbox"
              :value="jeu.id"
              v-model="form.jeuxAssocies"
              class="w-4 h-4"
            />
            <span>{{ jeu.nom_jeux }}</span>
            
          </label>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <button type="button" @click="router.push('/equipes')" class="px-4 py-2 bg-gray-600 rounded-md">
          Annuler
        </button>
        <button type="submit" class="px-4 py-2 bg-[#00C9C6] text-black font-bold rounded-md">
          Créer
        </button>
      </div>
    </form>
  </main>
</template>

<style>
.fond_equipe {
  background-image: url('@/assets/fond_de_con.webp');
  background-size: cover;
}
</style>