<script setup>
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <article class="weather-card" @click="emit('select-card', cityItem)">
    <div class="city-header">
      <h2>{{ cityItem.name }}</h2>

      <span class="weather-icon" aria-hidden="true">
        {{ cityItem.icon }}
      </span>
    </div>

    <strong class="temperature"> {{ cityItem.temp }}℃ </strong>

    <p>{{ cityItem.status }}</p>

    <div class="weather-metrics">
      <span>💧 습도 {{ cityItem.humidity }}%</span>
      <span>💨 풍속 {{ cityItem.windSpeed }}m/s</span>
    </div>

    <p v-if="cityItem.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</p>

    <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>

    <button type="button" class="detail-button" @click.stop="emit('click-detail', cityItem)">
      상세보기
    </button>
  </article>
</template>

<style scoped>
.weather-card {
  padding: 24px;
  border: 1px solid #dbeafe;
  border-radius: 16px;
  background: #eff6ff;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgb(30 64 175 / 12%);
}

.city-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-header h2 {
  margin: 0 0 16px;
}

.weather-icon {
  font-size: 36px;
}

.temperature {
  font-size: 32px;
}

.weather-metrics {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
  color: #475569;
  font-size: 14px;
}

.temperature-label {
  width: fit-content;
  margin-top: 16px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
}

.temperature-label.hot {
  color: #b91c1c;
  background: #fee2e2;
}

.temperature-label.cool {
  color: #1d4ed8;
  background: #dbeafe;
}

.detail-button {
  margin-top: 16px;
  padding: 8px 14px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #2563eb;
  cursor: pointer;
}

.detail-button:hover {
  background: #1d4ed8;
}
</style>
