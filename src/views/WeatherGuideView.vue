<script setup>
import { RouterLink } from 'vue-router'

const guideList = [
  {
    id: 'guide_01',
    icon: '🔥',
    title: '더운 날씨',
    condition: '25℃ 이상',
    description: '물을 자주 마시고 한낮의 야외활동을 줄이세요.',
  },
  {
    id: 'guide_02',
    icon: '🌧️',
    title: '비 오는 날씨',
    condition: '강수 예보',
    description: '우산을 준비하고 미끄러운 길을 주의하세요.',
  },
  {
    id: 'guide_03',
    icon: '🌬️',
    title: '바람이 강한 날씨',
    condition: '풍속 7m/s 이상',
    description: '야외 물건을 고정하고 보행 시 주변을 살펴보세요.',
  },
]
</script>

<template>
  <main class="guide-page">
    <header>
      <p class="eyebrow">WEATHER GUIDE</p>
      <h1>날씨 생활 가이드</h1>
      <p>기상 상황에 맞는 생활 정보를 확인하세요.</p>
    </header>

    <section class="guide-list">
      <article v-for="guide in guideList" :key="guide.id" class="guide-card">
        <span class="guide-icon">{{ guide.icon }}</span>

        <div>
          <h2>{{ guide.title }}</h2>
          <strong>{{ guide.condition }}</strong>
          <p>{{ guide.description }}</p>
        </div>
      </article>
    </section>

    <RouterLink class="home-link" to="/"> 메인 대시보드로 돌아가기 </RouterLink>
  </main>
</template>

<style scoped>
.guide-page {
  width: min(900px, 100%);
  margin: 0 auto;
  padding: 48px 24px;
}

.guide-page header {
  margin-bottom: 32px;
}

.eyebrow {
  margin-bottom: 8px;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1 {
  margin: 0 0 8px;
  color: #1e3a8a;
}

header > p:last-child {
  color: #64748b;
}

.guide-list {
  display: grid;
  gap: 16px;
  margin-bottom: 32px;
}

.guide-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border: 1px solid #dbeafe;
  border-radius: 18px;
  background: white;
}

.guide-icon {
  font-size: 42px;
}

.guide-card h2 {
  margin: 0 0 6px;
}

.guide-card strong {
  color: #2563eb;
}

.guide-card p {
  margin-bottom: 0;
  color: #64748b;
}

.home-link {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 10px;
  color: white;
  background: #2563eb;
  text-decoration: none;
}
</style>
