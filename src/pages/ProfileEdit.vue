<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Modifier mon profil</h1>
    <form @submit.prevent="submit" class="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label for="avatar" class="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
        <input type="file" @change="onFileChange" />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Mettre à jour
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import { pb } from '@/backend'

const form = ref({
  username: '',
  email: '',
  avatar: null
})

const router = useRouter()

// Charger les données de l'utilisateur actuel
const user = pb.authStore.model
form.value.username = user.username
form.value.email = user.email

const onFileChange = (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  if (fileInput.files && fileInput.files[0]) {
    form.value.avatar = fileInput.files[0]
  }
}

const submit = async () => {
  try {
    const formData = new FormData()
    formData.append('username', form.value.username)
    formData.append('email', form.value.email)
    if (form.value.avatar) {
      formData.append('avatar', form.value.avatar)
    }
    
    await pb.collection('users').update(user.id, formData)
    router.push('/profile') // Redirection après la mise à jour
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>
