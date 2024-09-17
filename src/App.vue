<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router/auto'
import LogInOut from './components/LogInOut.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <h1 class="text-2xl bg-slate-400">Template principale</h1>
      <LogInOut/>
      <nav>
        <ul>
          <RouterLink to="/">Accueil</RouterLink>
          <RouterLink to="/About">About</RouterLink>
          <RouterLink to="/equipes">Équipes</RouterLink>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

