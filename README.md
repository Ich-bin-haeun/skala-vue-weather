# SKALA Vue Weather

Vue 3 종합실습으로 제작하는 날씨 대시보드 프로젝트입니다.

## 기술 스택

- Vue 3
- Vite
- Vue Router
- Pinia
- ESLint
- Prettier

## 실행 방법

```bash
npm install
npm run dev

## 실습 진행 기록
1. 프로젝트 초기 설정
- Vue 3와 Vite 기반 프로젝트 생성
- Vue Router와 Pinia 설정
- ESLint와 Prettier 설정
- 개발 서버 및 HMR 동작 확인
2. Weather Mockup
Vue 기본 문법을 활용하여 도시별 날씨 대시보드 Mockup을 구현했습니다.
구현 내용
- ref를 이용한 반응형 날씨 데이터 관리
- v-for와 :key를 이용한 날씨 카드 반복 출력
- v-if, v-else를 이용한 온도별 상태 표시
- :value, @input을 이용한 한글 도시 검색어 입력
- 카드 클릭 시 선택된 도시 상태 표시
- click.stop을 이용한 상세보기 이벤트 버블링 방지
- 반응형 카드 레이아웃 구현
개인화 내용
- 제주 날씨 데이터 추가
- 날씨 상태별 아이콘 추가
- 도시별 습도와 풍속 정보 추가
- 모바일 환경을 고려한 반응형 레이아웃 적용
```

### 3. Weather Composition API

Composition API를 활용하여 도시 검색과 반응형 상태 감시 기능을 구현했습니다.

#### 구현 내용

- `computed`를 이용한 도시 검색 결과 필터링
- 검색어가 없을 때 전체 도시 표시
- 검색 결과가 없을 때 안내 화면 표시
- `watch`를 이용한 선택 도시 상태 변경 감시
- `watchEffect`를 이용한 검색어 변경 감시
- 검색 필터와 온도 필터 동시 적용

#### 개인화 내용

- `showOnlyHot` 반응형 상태 추가
- 25℃ 이상인 도시만 표시하는 필터 추가
- `computed`를 이용한 전체 도시 평균 온도 계산
- `watch`를 이용한 온도 필터 활성화 상태 추적

### 4. Weather Components

기존 날씨 대시보드의 기능을 유지하면서 역할별 Vue 컴포넌트로 분리했습니다.

#### 컴포넌트 구조

```text
HomeView.vue
└── WeatherParent.vue
    ├── BaseDashboardCard.vue
    ├── SearchBar.vue
    ├── WeatherSummary.vue
    └── WeatherCard.vue
```

### 5. Weather Router

Vue Router를 활용하여 날씨 애플리케이션을 여러 페이지로 구성했습니다.

#### Route 구성

| 경로               | 페이지            | 설명                    |
| ------------------ | ----------------- | ----------------------- |
| `/`                | WeatherHomeView   | 메인 날씨 대시보드      |
| `/weather/:cityId` | WeatherDetailView | 도시별 동적 상세 페이지 |
| `/guide`           | WeatherGuideView  | 날씨 생활 가이드        |
| `/about`           | WeatherAboutView  | 서비스 소개             |
| `/:pathMatch(.*)*` | NotFoundView      | 404 페이지              |

#### 구현 내용

- `RouterLink`를 이용한 상단 내비게이션
- `RouterView`를 이용한 페이지 렌더링
- 동적 경로 매개변수 `:cityId` 적용
- `useRoute`를 이용한 도시 ID 조회
- `useRouter`와 `router.push()`를 이용한 상세 페이지 이동
- Route Lazy Loading 적용
- Catch-all Route와 404 페이지 구현
- 잘못된 도시 ID 안내 화면 구현

#### 개인화 내용

- 날씨 상황별 생활 정보를 제공하는 `WeatherGuideView` 추가
- 날씨 상세 화면에 습도와 풍속 정보 표시
