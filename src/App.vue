<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <header class="app-header">
    <a class="logo" href="/"> SKALA Weather </a>

    <div class="header-actions">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/guide">Guide</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <UnitToggler />
    </div>
  </header>

  <RouterView v-slot="{ Component }">
    <KeepAlive include="WeatherHomeView">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
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

@media (max-width: 700px) {
  .app-header {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    padding: 16px 20px;
  }

  .header-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  nav {
    flex-wrap: wrap;
  }
}
</style>
