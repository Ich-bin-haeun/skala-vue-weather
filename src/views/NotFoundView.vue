<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found-page">
    <section>
      <strong>404</strong>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>요청한 주소가 없거나 이동되었습니다.</p>

      <RouterLink to="/"> 메인 대시보드로 돌아가기 </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.not-found-page {
  display: grid;
  min-height: calc(100vh - 70px);
  padding: 24px;
  place-items: center;
}

.not-found-page section {
  text-align: center;
}

.not-found-page strong {
  color: #93c5fd;
  font-size: 96px;
}

.not-found-page h1 {
  margin: 8px 0;
  color: #1e3a8a;
}

.not-found-page p {
  margin-bottom: 28px;
  color: #64748b;
}

.not-found-page a {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 10px;
  color: white;
  background: #2563eb;
  text-decoration: none;
}
</style>
