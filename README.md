# SKALA Vue Weather

Vue 수업에서 배운 내용을 활용해 만든 날씨 대시보드입니다.

처음에는 Mock Data를 보여주는 화면으로 시작했고, 수업 진도에 맞춰 컴포넌트, Router, Pinia, Axios를 하나씩 적용했습니다. 현재는 실제 날씨 조회와 국내외 도시 검색이 가능합니다.

## 사용 기술

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Element Plus
- ESLint
- Prettier

## 실행 방법

### 패키지 설치

```bash
npm install
```

### 환경변수 설정

프로젝트 최상위 폴더에 `.env.local` 파일 생성

```env
VITE_OPENWEATHER_API_KEY=발급받은_API_KEY
```

OpenWeather API 키는 [OpenWeather](https://openweathermap.org/)에서 발급할 수 있습니다.

### 개발 서버 실행

```bash
npm run dev
```

기본 접속 주소

```text
http://localhost:5173
```

### 프로덕션 빌드

```bash
npm run build
```

## 주요 기능

### 날씨 대시보드

- 서울, 수원, 부산, 제주의 실제 날씨 조회
- 온도, 날씨 상태, 습도, 풍속 표시
- 전체 도시 수와 평균 온도 계산
- 30℃ 이상인 도시 수 표시
- 날씨 상태에 맞는 아이콘 표시

### 도시 검색과 필터

- 국내외 도시 검색
- 검색한 도시를 날씨 카드로 추가
- 도시 이름과 국가명 검색
- 30℃ 이상인 도시만 보기
- 전체·한국·해외 지역 필터
- 검색 결과가 없을 때 안내 화면 표시

### 상세 페이지

- 도시별 실제 상세 날씨 조회
- 현재 온도와 체감온도 표시
- 최저·최고 온도 표시
- 습도와 풍속 표시
- 검색으로 추가한 해외 도시의 상세 페이지 지원
- 섭씨·화씨 단위 변경 적용

### 화면 설정

- 섭씨·화씨 단위 전환
- 상세 기상정보 표시·숨기기
- 상세 페이지 이동 후 추가 도시 상태 유지
- 모바일 화면 대응
- 존재하지 않는 주소의 404 화면 처리

## 사용 API

### OpenWeather Current Weather API

위도와 경도를 기준으로 실제 날씨 조회

- 현재 온도
- 체감온도
- 최저·최고 온도
- 날씨 상태
- 습도
- 풍속

### Open-Meteo Geocoding API

사용자가 입력한 도시 이름을 위도와 경도로 변환

```text
도시 이름 입력
→ Open-Meteo에서 도시 좌표 검색
→ OpenWeather에 위도·경도 전달
→ 실제 날씨 조회
→ 새로운 날씨 카드 추가
```

OpenWeather에서 받은 일부 한국어 날씨 설명이 자연스럽지 않아 condition ID를 기준으로 문구를 다시 변환했습니다.

```text
튼구름 → 흐림
온흐림 → 매우 흐림
```

## 페이지 구성

| 경로               | 페이지            | 기능               |
| ------------------ | ----------------- | ------------------ |
| `/`                | WeatherHomeView   | 메인 날씨 대시보드 |
| `/weather/:cityId` | WeatherDetailView | 도시별 상세 날씨   |
| `/guide`           | WeatherGuideView  | 날씨 생활 가이드   |
| `/about`           | WeatherAboutView  | 프로젝트 소개      |
| `/:pathMatch(.*)*` | NotFoundView      | 404 페이지         |

## 컴포넌트 구조

```text
src/
├── components/
│   └── exercise/
│       ├── BaseDashboardCard.vue
│       ├── SearchBar.vue
│       ├── UnitToggler.vue
│       ├── WeatherCard.vue
│       ├── WeatherParent.vue
│       └── WeatherSummary.vue
├── services/
│   ├── locationApi.js
│   └── weatherApi.js
├── stores/
│   └── configStore.js
└── views/
    ├── WeatherHomeView.vue
    ├── WeatherDetailView.vue
    ├── WeatherGuideView.vue
    ├── WeatherAboutView.vue
    └── NotFoundView.vue
```

## 실습 과정

### 1. Weather Mockup

Vue 기본 문법을 이용한 날씨 카드 화면 구현

- `ref`로 날씨 데이터 관리
- `v-for`와 `:key`로 카드 반복 출력
- `v-if`, `v-else`로 온도 상태 구분
- 한글 검색어 입력 처리
- 카드 선택 이벤트 구현
- `.stop`으로 상세보기 버튼의 이벤트 버블링 방지

### 2. Composition API

검색과 필터 기능을 Composition API 방식으로 변경

- `computed`로 도시 검색 결과 필터링
- `computed`로 평균 온도 계산
- `watch`로 선택 도시 변경 확인
- `watchEffect`로 검색어 변경 확인
- 검색 결과가 없을 때 안내 화면 표시

### 3. 컴포넌트 분리

`HomeView.vue`에 있던 기능을 역할별 컴포넌트로 분리

- 검색: `SearchBar.vue`
- 날씨 카드: `WeatherCard.vue`
- 요약 정보: `WeatherSummary.vue`
- 상태와 이벤트: `WeatherParent.vue`
- 공통 레이아웃: `BaseDashboardCard.vue`

적용 문법

- Props
- Emits
- Slot
- `<style scoped>`

### 4. Vue Router

화면을 페이지 단위로 분리

- `RouterLink`와 `RouterView` 적용
- 동적 경로 `/weather/:cityId` 구현
- `router.push()`를 이용한 상세 페이지 이동
- Route Lazy Loading 적용
- Catch-all Route와 404 페이지 구현
- `KeepAlive`를 이용한 메인 화면 상태 유지

상세보기 기능은 처음에 `window.alert()`로 구현한 뒤 Router 상세 페이지 방식으로 변경했습니다.

### 5. Pinia

여러 화면에서 함께 사용하는 설정을 Store로 분리

- 섭씨·화씨 상태 관리
- 현재 온도 단위 기호 반환
- 단위 변경 Action 구현
- 상세정보 표시 여부 관리
- 상세정보 버튼 문구 Getter 구현

### 6. Axios와 외부 API

Mock Data를 실제 날씨 데이터로 변경

- 페이지 진입 시 국내 네 도시의 실제 날씨 요청
- Open-Meteo를 이용한 국내외 도시 좌표 검색
- 검색 좌표를 이용한 OpenWeather 요청
- 검색 도시의 날씨 카드 추가
- 검색 도시의 상세 페이지 연결
- 로딩, 오류, 재시도 처리

### 7. UI Library

Element Plus를 이용한 일부 버튼과 로딩 UI 적용

## 환경변수 관리

실제 API 키가 포함된 파일은 GitHub에 업로드하지 않습니다.

```gitignore
.env
.env.local
.env.*.local
```

공유용 파일인 `.env.example`에는 필요한 환경변수 이름만 작성합니다.

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

## 코드 검사

```bash
npm run format
npm run lint
npm run build
```

## 배포

Vercel을 이용한 정적 웹 배포

```text
배포 주소: 배포 후 추가
```

## 추가로 구현해 보고 싶은 기능

- 5일 날씨 예보
- 한국과 해외 도시 날씨 비교
- 날씨에 따른 음식 추천
- 날씨에 따른 여행 준비물 추천
