<template>
  <div class="app-shell">
    <header class="top-bar">
      <h1>Control de Tropas</h1>
      <nav>
        <RouterLink to="/mobile" class="nav-link">App Movil</RouterLink>
        <RouterLink to="/dashboard" class="nav-link">Tablero</RouterLink>
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
