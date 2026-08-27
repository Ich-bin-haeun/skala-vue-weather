<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <RouterLink class="logo" to="/">SKALA Weather</RouterLink>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-bottom: 1px solid #dbeafe;
  background: white;
}

.logo {
  color: #1e3a8a;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: #475569;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #2563eb;
  font-weight: 700;
}
</style>
