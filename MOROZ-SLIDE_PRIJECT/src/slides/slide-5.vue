<template>
  <div class="slide-content" :class="{ 'active-slide': isActive }">
    <!-- Блок с изображениями, которые сменяются -->
    <div
      class="gridImage"
      :class="[{ 'animate-image': isActive }, 'slide-5-image-wrapper']"
    >
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :class="['slide-image', { active: index === currentIndex }]"
        alt="slide-5"
      />
      <!-- Перебираем изображения и отображаем текущее -->
    </div>
    <div class="gridInfo">
      <h2>О тех, кто рядом</h2>
      <p>
        Иногда, чтобы справиться со страхами, достаточно рядом оказаться тому,
        кто просто понимает — и внутри наступает тишина и спокойствие.
      </p>
      <p>
        Порой одно тёплое слово или внимательный взгляд способны напомнить, кто
        ты есть и сколько силы в тебе на самом деле.
      </p>
    </div>
    <div class="link">
      <p>
        <a href="http://irinamoroz.ru">www.irinamoroz.ru</a>
      </p>
    </div>
  </div>
</template>

<script setup>
// Импортируем необходимые функции и изображения
import { ref, onMounted, onUnmounted } from "vue";
import img1 from "@/img/slide5-1.png";
import img2 from "@/img/slide5-2.png";

// Получаем пропс для управления активным слайдом
defineProps({
  isActive: Boolean,
});

const images = [img2, img1];
const currentIndex = ref(0);
let intervalId = null;

// Хук при монтировании компонента
onMounted(() => {
  // Предзагружаем изображения, чтобы не было задержек
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Запускаем интервал для смены изображения
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 7000);
});

// Очищаем интервал при размонтировании
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
/* Анимация лёгкого покачивания изображения */
@keyframes slight-rotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(1.5deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

/* Класс для вращения изображений */
.rotate-slightly {
  animation: slight-rotate 6s ease-in-out infinite; /* Ускоряем вращение */
  transform-origin: center bottom;
  width: 100%; /* Убедимся, что изображение адаптируется */
  height: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease; /* Ускоряем переход до 0.5s */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Контейнер для анимированных изображений */
.gridImage {
  position: relative;
  overflow: hidden;
}

/* Стили для каждого изображения */
.slide-image {
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  z-index: 1;
}

/* Стили для активного (отображаемого) изображения */
.slide-image.active {
  opacity: 1;
  z-index: 1;
}
</style>
