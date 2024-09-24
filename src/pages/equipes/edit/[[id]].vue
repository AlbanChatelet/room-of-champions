<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Créer une nouvelle équipe</h1>
    <form method="post" @submit="submit" class="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom de l'équipe</label>
        <input
          type="text"
          id="nom"
          name="nom"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
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
import { pb } from '@/backend'
import { useRouter } from 'vue-router/auto'

const router = useRouter()

const submit = async (event: Event) => {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const newEquipe = await pb.collection('equipes').create(formData)
  router.push({ name: '/equipes/[id]', params: { id: newEquipe.id } })
}
</script>
