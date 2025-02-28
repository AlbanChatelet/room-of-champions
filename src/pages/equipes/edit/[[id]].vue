<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { JeuxResponse } from '@/pocketbase-types'

const router = useRouter()

const form = ref({
  nom: '',
  description: '',
  jeuxAssocies: [] as string[], // Tableau pour stocker les jeux associés
})

const iconeFile = ref<File | null>(null)
const jeux = ref<JeuxResponse[]>([]) // Liste des jeux récupérés

// Récupérer les jeux disponibles
onMounted(async () => {
  try {
    const response = await pb.collection('jeux').getFullList<JeuxResponse>()
    jeux.value = response
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
    console.error('Le nom et la description doivent être remplis')
    return
  }

  // Créer un objet FormData vide
  const formData = new FormData()

  // Ajouter les champs principaux
  formData.append('nom', form.value.nom)
  formData.append('description', form.value.description)
  formData.append('chef_equipe', userId)  // Le créateur devient chef
  formData.append('membres', [userId])  // Membres par défaut

  // Ajouter les jeux associés sous la forme de relations
  formData.append('jeu_associe', JSON.stringify(form.value.jeuxAssocies.map(id => ({ id })))) 

  // Vérifier si un fichier a été sélectionné pour l'icône
  if (iconeFile.value) {
    formData.append('icone', iconeFile.value)  // Envoi de l'icône si un fichier est choisi
  }

  // Log des données envoyées avant l'envoi
  console.log('Données envoyées à PocketBase :')
  console.log('Nom:', form.value.nom)
  console.log('Description:', form.value.description)
  console.log('Chef équipe:', userId)
  console.log('Membres:', JSON.stringify([userId]))
  console.log('Icône:', iconeFile.value)
  console.log('Jeux associés:', JSON.stringify(form.value.jeuxAssocies))

  try {
    // Essayer de créer l'équipe dans PocketBase
    const newEquipe = await pb.collection('equipes').create(formData)
    router.push(`/equipes/${newEquipe.id}`)
  } catch (error) {
    console.error('Erreur lors de la création de l’équipe', error, error?.data)
  }
}
</script>




<template>
  <main class="min-h-screen flex items-center justify-center bg-[#000011] text-white">
    <form @submit="submit" class="bg-[#012E40] p-8 rounded-lg shadow-md space-y-6 w-full max-w-3xl">
      <h1 class="text-3xl font-bold">Créer une équipe</h1>

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
        <select
          id="jeuxAssocies"
          v-model="form.jeuxAssocies"
          multiple
          class="w-full px-3 py-2 border border-gray-600 bg-gray-800 rounded-md"
        >
          <option v-for="jeu in jeux" :key="jeu.id" :value="jeu.id">
            {{ jeu.nom_jeux }}
          </option>
        </select>
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


