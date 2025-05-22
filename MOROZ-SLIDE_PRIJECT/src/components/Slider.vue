<template>
  <!-- Лоадер -->
  <div v-if="isLoading" class="loader-container">
    <div class="loader"></div>
    <span class="loader-text">Загрузка...</span>
  </div>

  <!-- Контейнер для слайдера -->
  <div v-else class="slider-container full-height">
    <swiper
      :space-between="10"
      :slides-per-view="1"
      :initial-slide="0"
      :pagination="{ clickable: true }"
      :speed="1000"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <component
          :is="slide.component"
          :is-active="activeSlideId === slide.id"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { shallowRef, onMounted, onUnmounted, markRaw, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

// Хранилище для слайдов
const slides = shallowRef([]);
const totalSlides = 6;
const activeSlideId = ref(1);
const isLoading = ref(true); // Состояние загрузки
let swiperInstance = null;

// Функция загрузки одного слайда
const loadSlide = async (slideId) => {
  try {
    const component = await import(`@/slides/slide-${slideId}.vue`);
    slides.value.push({
      id: slideId,
      component: markRaw(component.default),
    });
  } catch (error) {
    console.error(`Ошибка загрузки слайда ${slideId}:`, error);
  }
};

// Swiper callbacks
const onSwiper = (swiper) => {
  swiperInstance = swiper;
};

const onSlideChange = () => {
  if (swiperInstance) {
    activeSlideId.value = swiperInstance.activeIndex + 1;
  }
};

// Установка высоты вручную, если 100dvh не поддерживается
const setFullHeight = () => {
  const container = document.querySelector(".full-height");
  if (container) {
    container.style.height = `${window.innerHeight}px`;
  }
};

// Основная инициализация
onMounted(async () => {
  // Стили slide-styles.css
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/slides/css/slide-styles.css";
  document.head.appendChild(link);

  // Мета-тег viewport
  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0";
  document.head.appendChild(metaViewport);

  // Поддержка высоты
  if (!CSS.supports("height", "100dvh")) {
    setFullHeight();
    window.addEventListener("resize", setFullHeight);
  }

  // Загружаем слайды поочерёдно
  for (let i = 1; i <= totalSlides; i++) {
    await loadSlide(i);
  }

  // После загрузки скрываем лоадер
  isLoading.value = false;
});

onUnmounted(() => {
  if (!CSS.supports("height", "100dvh")) {
    window.removeEventListener("resize", setFullHeight);
  }
});
</script>

<style scoped>
/* Лоадер */
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 400px;
  background-color: white;
  color: #232323;
  font-family: sans-serif;
  border-radius: 34% 66% 70% 30% / 53% 49% 51% 47%;
}

.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #42b983;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.loader-text {
  font-size: 16px;
  opacity: 0.9;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Контейнер слайдера */
.slider-container.full-height {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
}

/* Слайдер */
.mySwiper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Пример структуры слайда (если нужно внутри компонентов) */
.slide-content {
  max-width: 550px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  grid-template-rows: 400px 2fr 30px;
}
</style>
