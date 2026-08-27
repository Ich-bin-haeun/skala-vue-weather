<script setup>
defineProps({
  query: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <label for="city-search">도시 검색</label>

    <input
      id="city-search"
      type="text"
      placeholder="도시 이름을 입력하세요"
      :value="query"
      @input="handleInput"
    />

    <p v-if="query" class="search-result">
      입력한 도시: <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-bar label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
  font-weight: 700;
}

.search-bar input {
  width: min(420px, 100%);
  padding: 12px 16px;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  background: white;
  outline: none;
}

.search-bar input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
}

.search-result {
  margin-top: 12px;
  color: #475569;
}
</style>
