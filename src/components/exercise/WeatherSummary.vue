<script setup>
defineProps({
  totalCities: {
    type: Number,
    required: true,
  },
  averageTemperature: {
    type: Number,
    required: true,
  },
  hotCityCount: {
    type: Number,
    required: true,
  },
  unitSymbol: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="weather-summary">
    <div class="summary-item">
      <span>등록 도시</span>
      <strong>{{ totalCities }}곳</strong>
    </div>

    <div class="summary-item">
      <span>평균 온도</span>
      <strong> {{ averageTemperature }}{{ unitSymbol }} </strong>
    </div>

    <div class="summary-item">
      <span>더운 도시</span>
      <strong>{{ hotCityCount }}곳</strong>
    </div>
  </section>
</template>

<style scoped>
.weather-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 24px 0;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: 12px;
  background: #f1f5f9;
}

.summary-item span {
  color: #64748b;
  font-size: 14px;
}

.summary-item strong {
  color: #1e3a8a;
  font-size: 22px;
}

@media (max-width: 600px) {
  .weather-summary {
    grid-template-columns: 1fr;
  }
}
</style>
