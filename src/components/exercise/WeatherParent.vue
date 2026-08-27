<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const router = useRouter()
const configStore = useConfigStore()

const searchQuery = ref('')

const showOnlyHot = ref(false)

const selectedCityInfo = ref('카드를 클릭하거나 도시를 검색해 보세요.')

const selectCity = (city) => {
  selectedCityInfo.value = `${city.name}이(가) 선택되었습니다.`
}

const showDetail = (city) => {
  router.push({
    name: 'weather-detail',
    params: {
      cityId: city.id,
    },
  })
}

watch(selectedCityInfo, (newMessage, oldMessage) => {
  console.log('[선택 도시 변경]')
  console.log('이전:', oldMessage)
  console.log('현재:', newMessage)
})

watchEffect(() => {
  console.log(`[도시 검색어 변경] ${searchQuery.value}`)
})

watch(showOnlyHot, (isEnabled) => {
  console.log(`[더운 도시 필터] ${isEnabled ? '활성화' : '비활성화'}`)
})
const weatherList = ref([
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
])

const averageTemperature = computed(() => {
  if (weatherList.value.length === 0) {
    return 0
  }

  const totalTemperature = weatherList.value.reduce((total, city) => total + city.temp, 0)

  return Math.round(totalTemperature / weatherList.value.length)
})

const displayAverageTemperature = computed(() => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((averageTemperature.value * 9) / 5 + 32)
  }

  return averageTemperature.value
})

const hotCityCount = computed(() => {
  return weatherList.value.filter((city) => city.temp >= 25).length
})

const filteredWeatherList = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return weatherList.value.filter((city) => {
    const matchesSearch = city.name.toLowerCase().includes(normalizedQuery)

    const matchesTemperature = !showOnlyHot.value || city.temp >= 25

    return matchesSearch && matchesTemperature
  })
})
</script>

<template>
  <main class="weather-page">
    <BaseDashboardCard title="오늘의 날씨" description="도시별 현재 날씨를 확인해 보세요.">
      <section class="search-section">
        <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />

        <div class="custom-controls">
          <label class="hot-filter">
            <input
              type="checkbox"
              :checked="showOnlyHot"
              @change="showOnlyHot = $event.target.checked"
            />
            25℃ 이상인 도시만 보기
          </label>
        </div>
      </section>

      <WeatherSummary
        :total-cities="weatherList.length"
        :average-temperature="displayAverageTemperature"
        :unit-symbol="configStore.unitSymbol"
        :hot-city-count="hotCityCount"
      />

      <section class="weather-list">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city-item="city"
          @select-card="selectCity"
          @click-detail="showDetail"
        />

        <p v-if="filteredWeatherList.length === 0" class="empty-message">
          검색 결과와 일치하는 도시가 없습니다.
        </p>
      </section>

      <div class="status-bar">
        {{ selectedCityInfo }}
      </div>
    </BaseDashboardCard>
  </main>
</template>

<style scoped>
.weather-page {
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 48px 24px;
}

.weather-page h1 {
  margin-bottom: 8px;
  color: #1e3a8a;
}

.weather-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 32px;
}

.weather-card {
  padding: 24px;
  border: 1px solid #dbeafe;
  border-radius: 16px;
  background: #eff6ff;
}

.weather-card h2 {
  margin: 0 0 16px;
}

.weather-card strong {
  font-size: 32px;
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

.search-section {
  margin-top: 28px;
}

.search-section label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
  font-weight: 700;
}

.search-section input {
  width: min(420px, 100%);
  padding: 12px 16px;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  background: white;
  outline: none;
}

.search-section input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
}

.search-result {
  margin-top: 12px;
  color: #475569;
}
.weather-card {
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.weather-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgb(30 64 175 / 12%);
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

.status-bar {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  color: #1e3a8a;
  background: #dbeafe;
  text-align: center;
  font-weight: 700;
}

.empty-message {
  grid-column: 1 / -1;
  padding: 48px 24px;
  border: 1px dashed #93c5fd;
  border-radius: 16px;
  color: #475569;
  background: white;
  text-align: center;
}

.custom-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
  margin-top: 20px;
}

.hot-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
}

.hot-filter input {
  width: 18px;
  height: 18px;
}

.average-temperature {
  margin: 0;
  color: #475569;
}

@media (max-width: 700px) {
  .weather-list {
    grid-template-columns: 1fr;
  }
}
</style>
