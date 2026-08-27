<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { useConfigStore } from '@/stores/configStore'
import { fetchCurrentWeather, getKoreanWeatherStatus } from '@/services/weatherApi'
import { searchLocation } from '@/services/locationApi'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'

const router = useRouter()
const configStore = useConfigStore()

const searchQuery = ref('')
const isSearchingCity = ref(false)
const showOnlyHot = ref(false)
const countryFilter = ref('all')

const selectedCityInfo = ref('카드를 클릭하거나 도시를 검색해 보세요.')

const weatherList = ref([])
const isLoadingWeather = ref(false)
const weatherError = ref('')

const cityTargets = [
  {
    id: 'city_01',
    name: '서울',
    country: '대한민국',
    lat: 37.5665,
    lon: 126.978,
  },
  {
    id: 'city_02',
    name: '수원',
    country: '대한민국',
    lat: 37.2636,
    lon: 127.0286,
  },
  {
    id: 'city_03',
    name: '부산',
    country: '대한민국',
    lat: 35.1796,
    lon: 129.0756,
  },
  {
    id: 'city_04',
    name: '제주',
    country: '대한민국',
    lat: 33.4996,
    lon: 126.5312,
  },
]

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

const createWeatherItem = (location, weatherData) => {
  const weatherCondition = weatherData.weather?.[0]

  return {
    id: location.id,
    name: location.name,
    country: location.country,
    lat: location.lat,
    lon: location.lon,
    temp: Math.round(weatherData.main.temp),
    status: getKoreanWeatherStatus(weatherCondition),
    icon: getWeatherIcon(weatherCondition?.main),
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed,
  }
}

const loadInitialWeather = async () => {
  isLoadingWeather.value = true
  weatherError.value = ''

  try {
    const results = await Promise.all(
      cityTargets.map(async (city) => {
        const weatherData = await fetchCurrentWeather({
          lat: city.lat,
          lon: city.lon,
        })

        return createWeatherItem(city, weatherData)
      }),
    )

    weatherList.value = results
  } catch (error) {
    console.error('[초기 날씨 요청 실패]', error)

    weatherError.value =
      error.response?.status === 401
        ? 'OpenWeather API 키를 확인해 주세요.'
        : '날씨 정보를 불러오지 못했습니다.'
  } finally {
    isLoadingWeather.value = false
  }
}

const addCityWeather = async () => {
  const cityName = searchQuery.value.trim()

  if (!cityName) {
    return
  }

  isSearchingCity.value = true

  try {
    const location = await searchLocation(cityName)

    const weatherData = await fetchCurrentWeather({
      lat: location.lat,
      lon: location.lon,
    })

    const newCity = createWeatherItem(location, weatherData)

    const existingIndex = weatherList.value.findIndex((city) => city.id === newCity.id)

    if (existingIndex >= 0) {
      weatherList.value[existingIndex] = newCity

      selectedCityInfo.value = `${newCity.name} 날씨를 갱신했습니다.`
    } else {
      weatherList.value.push(newCity)

      selectedCityInfo.value = `${newCity.name} 날씨를 추가했습니다.`
    }

    searchQuery.value = ''
  } catch (error) {
    console.error('[도시 추가 실패]', error)

    selectedCityInfo.value =
      error.response?.status === 401 ? 'OpenWeather API 키를 확인해 주세요.' : error.message
  } finally {
    isSearchingCity.value = false
  }
}

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
  return weatherList.value.filter((city) => city.temp >= 30).length
})

const filteredWeatherList = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return weatherList.value.filter((city) => {
    const searchableText = `${city.name} ${city.country ?? ''}`.toLowerCase()

    const matchesSearch = searchableText.includes(normalizedQuery)

    const matchesTemperature = !showOnlyHot.value || city.temp >= 30

    const isKoreanCity = city.country === '대한민국'

    const matchesCountry =
      countryFilter.value === 'all' ||
      (countryFilter.value === 'korea' && isKoreanCity) ||
      (countryFilter.value === 'overseas' && !isKoreanCity)

    return matchesSearch && matchesTemperature && matchesCountry
  })
})

const selectCity = (city) => {
  selectedCityInfo.value = `${city.name}이(가) 선택되었습니다.`
}

const showDetail = (city) => {
  router.push({
    name: 'weather-detail',
    params: {
      cityId: city.id,
    },
    query: {
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      country: city.country,
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

watch(countryFilter, (filter) => {
  console.log(`[지역 필터 변경] ${filter}`)
})

onMounted(() => {
  loadInitialWeather()
})
</script>

<template>
  <main class="weather-page">
    <BaseDashboardCard title="오늘의 날씨" description="도시별 현재 날씨를 확인해 보세요.">
      <section class="search-section">
        <SearchBar
          :query="searchQuery"
          :is-loading="isSearchingCity"
          @update-query="searchQuery = $event"
          @search-city="addCityWeather"
        />

        <div class="custom-controls">
          <label class="hot-filter">
            <input
              type="checkbox"
              :checked="showOnlyHot"
              @change="showOnlyHot = $event.target.checked"
            />
            30℃ 이상인 도시만 보기
          </label>

          <div class="country-filter" role="radiogroup" aria-label="지역 구분">
            <span class="filter-title"> 지역: </span>

            <label>
              <input v-model="countryFilter" type="radio" value="all" />
              전체
            </label>

            <label>
              <input v-model="countryFilter" type="radio" value="korea" />
              한국
            </label>

            <label>
              <input v-model="countryFilter" type="radio" value="overseas" />
              해외
            </label>
          </div>
        </div>
      </section>

      <p v-if="isLoadingWeather" class="api-message loading">실제 날씨를 불러오는 중입니다.</p>

      <div v-else-if="weatherError" class="api-message error">
        <p>{{ weatherError }}</p>

        <el-button type="danger" @click="loadInitialWeather"> 다시 시도 </el-button>
      </div>

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

.search-section {
  margin-top: 12px;
}

.custom-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 20px;
}

.hot-filter {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  color: #334155;
  font-weight: 700;
  cursor: pointer;
}

.hot-filter input {
  width: 16px;
  height: 16px;
  margin: 0;
}

.country-filter {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-title {
  color: #334155;
  font-weight: 700;
}

.country-filter label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  color: #475569;
  font-weight: 500;
  cursor: pointer;
}

.country-filter input {
  width: 16px;
  height: 16px;
  margin: 0;
}

.api-message {
  margin: 24px 0;
  padding: 16px;
  border-radius: 12px;
}

.api-message.loading {
  color: #1d4ed8;
  background: #dbeafe;
}

.api-message.error {
  color: #991b1b;
  background: #fee2e2;
}

.api-message.error p {
  margin-top: 0;
}

.weather-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 20px;
  margin-top: 32px;
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

.status-bar {
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  color: #1e3a8a;
  background: #dbeafe;
  text-align: center;
  font-weight: 700;
}

@media (max-width: 700px) {
  .weather-page {
    padding: 24px 14px;
  }

  .custom-controls {
    align-items: flex-start;
  }

  .country-filter {
    flex-wrap: wrap;
  }

  .weather-list {
    grid-template-columns: 1fr;
  }
}
</style>
