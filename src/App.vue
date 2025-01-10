<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/auto'

import HeaderPage from './components/HeaderPage.vue';
</script>

<template>
  <header>
    <div class="wrapper bg-[#DEF5FF]">
      <HeaderPage />
    </div>
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />

        <template #fallback>
          <div class="text-center">Loading...</div>
        </template>
      </Suspense>
    </RouterView>
  </main>
</template>
