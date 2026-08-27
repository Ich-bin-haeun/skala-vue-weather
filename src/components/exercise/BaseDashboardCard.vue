<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="dashboard-card">
    <header class="dashboard-header">
      <p class="eyebrow">SKALA WEATHER</p>
      <h1>{{ title }}</h1>
      <p v-if="description" class="description">
        {{ description }}
      </p>
    </header>

    <div class="dashboard-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 32px;
  border: 1px solid #dbeafe;
  border-radius: 24px;
  background: white;
  box-shadow: 0 16px 40px rgb(30 64 175 / 8%);
}

.dashboard-header {
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.dashboard-header h1 {
  margin: 0 0 8px;
  color: #1e3a8a;
  font-size: 40px;
}

.description {
  margin: 0;
  color: #64748b;
}

.dashboard-content {
  min-width: 0;
}

@media (max-width: 600px) {
  .dashboard-card {
    padding: 20px;
  }

  .dashboard-header h1 {
    font-size: 32px;
  }
}
</style>
