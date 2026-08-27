<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { fetchCurrentWeather, getKoreanWeatherStatus } from '@/services/weatherApi'

const route = useRoute()
const configStore = useConfigStore()

const selectedCity = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const defaultCityLocations = {
  city_01: {
    name: '서울',
    country: '대한민국',
    lat: 37.5665,
    lon: 126.978,
  },
  city_02: {
    name: '수원',
    country: '대한민국',
    lat: 37.2636,
    lon: 127.0286,
  },
  city_03: {
    name: '부산',
    country: '대한민국',
    lat: 35.1796,
    lon: 129.0756,
  },
  city_04: {
    name: '제주',
    country: '대한민국',
    lat: 33.4996,
    lon: 126.5312,
  },
}

const getWeatherIcon = (weatherType) => {
  const iconMap = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '🌨️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️',
  }

  return iconMap[weatherType] ?? '🌤️'
}

const convertTemperature = (temperature) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temperature * 9) / 5 + 32)
  }

  return Math.round(temperature)
}

const displayTemp = computed(() => {
  if (!selectedCity.value) {
    return 0
  }

  return convertTemperature(selectedCity.value.temp)
})

const displayFeelsLike = computed(() => {
  if (!selectedCity.value) {
    return 0
  }

  return convertTemperature(selectedCity.value.feelsLike)
})

const displayTempMin = computed(() => {
  if (!selectedCity.value) {
    return 0
  }

  return convertTemperature(selectedCity.value.tempMin)
})

const displayTempMax = computed(() => {
  if (!selectedCity.value) {
    return 0
  }

  return convertTemperature(selectedCity.value.tempMax)
})

const loadDetailWeather = async () => {
  const defaultLocation = defaultCityLocations[route.params.cityId]

  const lat = Number(route.query.lat ?? defaultLocation?.lat)

  const lon = Number(route.query.lon ?? defaultLocation?.lon)

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    errorMessage.value = '도시 좌표를 찾을 수 없습니다.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const data = await fetchCurrentWeather({
      lat,
      lon,
    })

    const condition = data.weather?.[0]

    selectedCity.value = {
      id: route.params.cityId,
      name: route.query.name ?? defaultLocation?.name ?? data.name,
      country: route.query.country ?? defaultLocation?.country ?? data.sys?.country,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      status: getKoreanWeatherStatus(condition),
      icon: getWeatherIcon(condition?.main),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    }
  } catch (error) {
    console.error('[상세 날씨 요청 실패]', error)

    errorMessage.value =
      error.response?.status === 401
        ? 'OpenWeather API 키를 확인해 주세요.'
        : '상세 날씨를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDetailWeather()
})
</script>

<template>
  <main class="detail-page">
    <p v-if="isLoading" class="loading-message">상세 날씨를 불러오는 중입니다.</p>

    <section v-else-if="selectedCity" class="detail-card">
      <span class="weather-icon" aria-hidden="true">
        {{ selectedCity.icon }}
      </span>

      <p class="eyebrow">WEATHER DETAIL</p>

      <h1>{{ selectedCity.name }}</h1>

      <p v-if="selectedCity.country" class="country">
        {{ selectedCity.country }}
      </p>

      <strong class="temperature"> {{ displayTemp }}{{ configStore.unitSymbol }} </strong>

      <p class="status">
        {{ selectedCity.status }}
      </p>

      <dl class="temperature-information">
        <div>
          <dt>체감온도</dt>
          <dd>{{ displayFeelsLike }}{{ configStore.unitSymbol }}</dd>
        </div>

        <div>
          <dt>최저온도</dt>
          <dd>{{ displayTempMin }}{{ configStore.unitSymbol }}</dd>
        </div>

        <div>
          <dt>최고온도</dt>
          <dd>{{ displayTempMax }}{{ configStore.unitSymbol }}</dd>
        </div>
      </dl>

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

      <p>
        {{ errorMessage }}
      </p>

      <RouterLink to="/"> 대시보드로 돌아가기 </RouterLink>
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
.not-found,
.loading-message {
  padding: 40px;
  border: 1px solid #dbeafe;
  border-radius: 24px;
  background: white;
  box-shadow: 0 16px 40px rgb(30 64 175 / 8%);
  text-align: center;
}

.loading-message {
  color: #1d4ed8;
}

.weather-icon {
  display: block;
  margin-bottom: 12px;
  font-size: 72px;
}

.eyebrow {
  margin-bottom: 8px;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1 {
  margin: 8px 0;
  color: #1e3a8a;
}

.country {
  margin: 0 0 20px;
  color: #64748b;
}

.temperature {
  display: block;
  margin-top: 20px;
  font-size: 56px;
}

.status {
  color: #64748b;
  font-size: 20px;
}

.temperature-information {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 32px 0 16px;
}

.weather-information {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 16px 0 32px;
}

.temperature-information div,
.weather-information div {
  padding: 18px;
  border-radius: 14px;
  background: #f1f5f9;
}

.temperature-information dt,
.weather-information dt {
  color: #64748b;
}

.temperature-information dd,
.weather-information dd {
  margin: 8px 0 0;
  color: #1e3a8a;
  font-size: 20px;
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

.not-found p {
  color: #64748b;
}

.not-found a {
  color: #2563eb;
}

@media (max-width: 600px) {
  .detail-card,
  .not-found,
  .loading-message {
    padding: 28px 20px;
  }

  .temperature-information {
    grid-template-columns: 1fr;
  }
}
</style>
