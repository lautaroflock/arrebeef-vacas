<template>
  <div class="app-shell">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>

    <header class="topbar">
      <div class="brand">
        <img :src="logo" alt="Arrebeef" class="brand-logo" />
      </div>

      <nav class="nav-tabs">
        <RouterLink to="/mobile" class="nav-link">App Movil</RouterLink>
        <RouterLink to="/dashboard" class="nav-link">Tablero</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import logo from './logo-400x126.png'
</script>
