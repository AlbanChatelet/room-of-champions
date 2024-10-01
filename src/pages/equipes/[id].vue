<script setup lang="ts">
import { ref } from 'vue'
import { user } from '@/backend'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import type { EquipesResponse, UsersResponse } from '@/pocketbase-types'
import sanitizeHtml from 'sanitize-html'

const route = useRoute('/equipes/[id]')
const router = useRouter()

const equipe = ref<EquipesResponse>(await pb.collection<EquipesResponse<{chef: UsersResponse, membres: UsersResponse}>>('equipes').getOne(route.params.id, {
  expand: 'chef_equipe, membres'
}))
const listUsers = ref<UsersResponse[]>(await pb.collection('users').getFullList())

async function updateMembres(id: string) {
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    'membres+': id
  }, {expand: 'chef_equipe, membres'})
}

async function deleteMembre(id: string) {
  equipe.value = await pb.collection('equipes').update(route.params.id, {
    'membres-': id
  }, {expand: 'chef_equipe, membres'})
}

function deleteEquipe(id: string) {
  pb.collection('equipes').delete(id)
  router.push({ name: '/equipes/' })
}

</script>

<template>
  <div v-if="equipe" class="container mx-auto py-10">
    <h1 class="text-2xl">{{ equipe.nom }}</h1>
    <div v-html="sanitizeHtml(equipe.description)"></div>
    <h2>Nom du chef d'équipe : {{ equipe.expand?.chef_equipe.username }}</h2>
    <button class="text-red" @click="deleteEquipe(equipe.id)">Supprimer l'équipe</button>
    
    <div class="mt-6" v-if="user?.id === equipe.chef_equipe">
      <RouterLink :to="{ name: '/equipes/edit/[[id]]', params: { id: equipe.id } }" class="text-blue-600">Modifier</RouterLink>
    </div>

    <div>
      <h2>Liste des membres</h2>
      <ul>
        <li v-for="utilisateur in equipe.expand?.membres" :key="utilisateur.id">{{ utilisateur.name || utilisateur.username }} <button class="text-red-500" @click="deleteMembre(utilisateur.id)">Supprimer</button></li>
      </ul>
    </div>
    
    <select v-if="user?.id === equipe.chef_equipe" @change="updateMembres(($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''">
      <option value="" selected disabled>Sélectionnez un membre</option>
      <option v-for="utilisateur in listUsers" :key="utilisateur.id" :value="utilisateur.id">{{ utilisateur.name || utilisateur.email || utilisateur.username }}</option>
    </select>
  </div>
</template>
