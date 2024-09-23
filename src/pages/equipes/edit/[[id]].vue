<template>
    <div>
        <h1 class="text-2xl">Créer une nouvelle équipe</h1>
        <form method="post" @submit="submit">
            <div>
            <label for="nom">Nom de l'équipe</label>
            <input type="text" id="nom" name="nom" />
            </div>
            <div>
            <label for="description">Description</label>
            <textarea type="text" id="description" name="description"></textarea>
            </div>
            <button type="submit">Créer</button>
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

