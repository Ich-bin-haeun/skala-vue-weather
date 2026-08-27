<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="about-page">
    <section class="about-card">
      <p class="eyebrow">ABOUT</p>
      <h1>SKALA Weather 소개</h1>

      <p class="description">
        SKALA Weather는 Vue 3 종합실습을 통해 제작한 도시별 날씨 대시보드입니다.
      </p>

      <section class="feature-list">
        <article>
          <span>🔍</span>
          <div>
            <h2>도시 검색</h2>
            <p>원하는 도시의 날씨 정보를 빠르게 검색합니다.</p>
          </div>
        </article>

        <article>
          <span>🌡️</span>
          <div>
            <h2>온도 정보</h2>
            <p>도시별 온도와 기상 상태를 확인합니다.</p>
          </div>
        </article>

        <article>
          <span>📊</span>
          <div>
            <h2>날씨 요약</h2>
            <p>전체 도시의 평균 온도와 요약 정보를 제공합니다.</p>
          </div>
        </article>
      </section>

      <RouterLink class="home-link" to="/"> 메인 대시보드로 돌아가기 </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  width: min(800px, 100%);
  margin: 0 auto;
  padding: 48px 24px;
}

.about-card {
  padding: 40px;
  border: 1px solid #dbeafe;
  border-radius: 24px;
  background: white;
  box-shadow: 0 16px 40px rgb(30 64 175 / 8%);
}

.eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1 {
  margin: 0 0 16px;
  color: #1e3a8a;
}

.description {
  color: #64748b;
  line-height: 1.7;
}

.feature-list {
  display: grid;
  gap: 16px;
  margin: 32px 0;
}

.feature-list article {
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: #f1f5f9;
}

.feature-list article > span {
  font-size: 28px;
}

.feature-list h2 {
  margin: 0 0 6px;
  font-size: 18px;
}

.feature-list p {
  margin: 0;
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
