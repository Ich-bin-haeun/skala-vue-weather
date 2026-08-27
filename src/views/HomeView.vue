<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 도시를 검색해 보세요.')

const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이(가) 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

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
</script>

<template>
  <main class="weather-page">
    <h1>오늘의 날씨</h1>
    <p>도시별 현재 날씨를 확인해 보세요.</p>
    <section class="search-section">
      <label for="city-search">도시 검색</label>

      <input
        id="city-search"
        type="text"
        placeholder="도시 이름을 입력하세요"
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
      />

      <p v-if="searchQuery" class="search-result">
        입력한 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="weather-list">
      <article
        v-for="city in weatherList"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city.name)"
      >
        <div class="city-header">
          <h2>{{ city.name }}</h2>
          <span class="weather-icon" aria-hidden="true">
            {{ city.icon }}
          </span>
        </div>

        <strong>{{ city.temp }}℃</strong>
        <p>{{ city.status }}</p>

        <div class="weather-metrics">
          <span>💧 습도 {{ city.humidity }}%</span>
          <span>💨 풍속 {{ city.windSpeed }}m/s</span>
        </div>
        <p v-if="city.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</p>

        <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>
        <button
          type="button"
          class="detail-button"
          @click.stop="showDetail(city.name, city.status)"
        >
          상세보기
        </button>
      </article>
    </section>
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
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

@media (max-width: 700px) {
  .weather-list {
    grid-template-columns: 1fr;
  }
}
</style>
