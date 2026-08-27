import axios from 'axios'

const locationApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  timeout: 10000,
})

export const searchLocation = async (cityName) => {
  const response = await locationApi.get('/search', {
    params: {
      name: cityName,
      count: 1,
      language: 'ko',
      format: 'json',
    },
  })

  const location = response.data.results?.[0]

  if (!location) {
    throw new Error('검색한 도시를 찾을 수 없습니다.')
  }

  return {
    id: `location_${location.id}`,
    name: location.name,
    lat: location.latitude,
    lon: location.longitude,
    country: location.country,
  }
}
