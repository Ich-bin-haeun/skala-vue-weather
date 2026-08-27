import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

export const fetchCurrentWeather = async ({ lat, lon }) => {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API 키가 설정되지 않았습니다.')
  }

  const response = await weatherApi.get('/weather', {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  return response.data
}
export const getKoreanWeatherStatus = (condition) => {
  const id = condition?.id

  if (!id) {
    return '정보 없음'
  }

  if (id >= 200 && id < 300) {
    return '뇌우'
  }

  if (id >= 300 && id < 400) {
    return '이슬비'
  }

  if (id === 500) {
    return '약한 비'
  }

  if (id === 501) {
    return '비'
  }

  if (id >= 502 && id <= 504) {
    return '강한 비'
  }

  if (id === 511) {
    return '어는 비'
  }

  if (id >= 520 && id < 600) {
    return '소나기'
  }

  if (id === 600) {
    return '약한 눈'
  }

  if (id === 601) {
    return '눈'
  }

  if (id === 602) {
    return '폭설'
  }

  if (id >= 611 && id <= 616) {
    return '진눈깨비'
  }

  if (id >= 620 && id < 700) {
    return '소낙눈'
  }

  const atmosphereStatus = {
    701: '박무',
    711: '연기',
    721: '연무',
    731: '먼지바람',
    741: '안개',
    751: '모래',
    761: '먼지',
    762: '화산재',
    771: '돌풍',
    781: '토네이도',
  }

  if (atmosphereStatus[id]) {
    return atmosphereStatus[id]
  }

  const cloudStatus = {
    800: '맑음',
    801: '구름 조금',
    802: '구름 많음',
    803: '흐림',
    804: '매우 흐림',
  }

  return cloudStatus[id] ?? condition.main ?? '정보 없음'
}
