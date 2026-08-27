<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const selectedCity = ref(null)
const configStore = useConfigStore()

const displayTemp = computed(() => {
  if (!selectedCity.value) {
    return 0
  }

  const rawTemp = selectedCity.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})

const weatherList = [
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    icon: '☀️',
    humidity: 55,
    windSpeed: 2.1,
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    icon: '🌧️',
    humidity: 82,
    windSpeed: 3.4,
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    icon: '☁️',
    humidity: 68,
    windSpeed: 4.2,
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 23,
    status: '바람',
    icon: '🌬️',
    humidity: 73,
    windSpeed: 7.5,
  },
]

onMounted(() => {
  selectedCity.value = weatherList.find((city) => city.id === route.params.cityId)
})
</script>

<template>
  <main class="detail-page">
    <section v-if="selectedCity" class="detail-card">
      <span class="weather-icon">
        {{ selectedCity.icon }}
      </span>

      <p class="eyebrow">WEATHER DETAIL</p>
      <h1>{{ selectedCity.name }}</h1>

      <strong class="temperature"> {{ displayTemp }}℃ </strong>

      <p class="status">
        {{ selectedCity.status }}
      </p>

      <dl v-if="configStore.showExtraInfo" class="weather-information">
        <div>
          <dt>습도</dt>
          <dd>{{ selectedCity.humidity }}%</dd>
        </div>

        <div>
          <dt>풍속</dt>
          <dd>{{ selectedCity.windSpeed }}m/s</dd>
        </div>
      </dl>

      <RouterLink class="back-link" to="/"> 대시보드로 돌아가기 </RouterLink>
    </section>

    <section v-else class="not-found">
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <RouterLink to="/">대시보드로 돌아가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.detail-page {
  width: min(680px, 100%);
  margin: 0 auto;
  padding: 48px 24px;
}

.detail-card,
.not-found {
  padding: 40px;
  border: 1px solid #dbeafe;
  border-radius: 24px;
  background: white;
  box-shadow: 0 16px 40px rgb(30 64 175 / 8%);
  text-align: center;
}

.weather-icon {
  display: block;
  margin-bottom: 12px;
  font-size: 72px;
}

.eyebrow {
  color: #2563eb;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1 {
  margin: 8px 0 20px;
  color: #1e3a8a;
}

.temperature {
  font-size: 56px;
}

.status {
  color: #64748b;
  font-size: 20px;
}

.weather-information {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 32px 0;
}

.weather-information div {
  padding: 18px;
  border-radius: 14px;
  background: #f1f5f9;
}

.weather-information dt {
  color: #64748b;
}

.weather-information dd {
  margin: 8px 0 0;
  color: #1e3a8a;
  font-size: 22px;
  font-weight: 700;
}

.back-link {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 10px;
  color: white;
  background: #2563eb;
  text-decoration: none;
}

.not-found a {
  color: #2563eb;
}
</style>
