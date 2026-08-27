<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update-query', 'search-city'])

const handleInput = (event) => {
  emit('update-query', event.target.value)
}

const handleSubmit = () => {
  emit('search-city')
}
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <label for="city-search">도시 검색 및 추가</label>

    <div class="search-controls">
      <input
        id="city-search"
        type="text"
        placeholder="예: 대전, Berlin, Paris"
        :value="query"
        :disabled="isLoading"
        @input="handleInput"
      />

      <button type="submit" :disabled="isLoading || !query.trim()">
        {{ isLoading ? '검색 중...' : '도시 추가' }}
      </button>
    </div>

    <p v-if="query" class="search-result">
      입력한 도시: <strong>{{ query }}</strong>
    </p>
  </form>
</template>

<style scoped>
.search-bar label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
  font-weight: 700;
}

.search-controls {
  display: flex;
  gap: 8px;
}

.search-controls input {
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  background: white;
  outline: none;
}

.search-controls input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
}

.search-controls button {
  padding: 12px 18px;
  border: 0;
  border-radius: 10px;
  color: white;
  background: #2563eb;
  white-space: nowrap;
  cursor: pointer;
}

.search-controls button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.search-result {
  margin-top: 12px;
  color: #475569;
}

@media (max-width: 520px) {
  .search-controls {
    flex-direction: column;
  }
}
</style>
