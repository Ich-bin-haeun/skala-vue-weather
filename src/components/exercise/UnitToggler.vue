<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>화면 설정</span>

    <button
      type="button"
      :aria-label="`온도 단위를 ${configStore.unit === 'celsius' ? '화씨' : '섭씨'}로 변경`"
      @click="configStore.toggleUnit"
    >
      {{ configStore.unitSymbol }}
    </button>

    <button type="button" @click="configStore.toggleExtraInfo">
      {{ configStore.extraInfoLabel }}
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
}

.unit-toggler span {
  color: #64748b;
  font-size: 13px;
}

.unit-toggler button {
  min-width: 42px;
  padding: 7px 10px;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  color: #1d4ed8;
  background: #eff6ff;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
}

.unit-toggler button:hover {
  color: white;
  background: #2563eb;
}
</style>
