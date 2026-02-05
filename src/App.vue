<template>
  <div class="app-shell">
    <header class="top-bar">
      <h1>Tropas Control</h1>
      <nav>
        <RouterLink to="/mobile" class="nav-link">Mobile App</RouterLink>
        <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
