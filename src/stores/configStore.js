import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    unit: 'celsius',
    showExtraInfo: true,
  }),

  getters: {
    unitSymbol: (state) => {
      return state.unit === 'celsius' ? '℃' : '℉'
    },

    extraInfoLabel: (state) => {
      return state.showExtraInfo ? '상세정보 숨기기' : '상세정보 보기'
    },
  },

  actions: {
    toggleUnit() {
      this.unit = this.unit === 'celsius' ? 'fahrenheit' : 'celsius'
    },

    toggleExtraInfo() {
      this.showExtraInfo = !this.showExtraInfo
    },
  },
})
