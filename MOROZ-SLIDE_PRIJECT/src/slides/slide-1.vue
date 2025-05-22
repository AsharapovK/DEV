<template>
  <div class="slide-content" :class="{ 'active-slide': isActive }">
    <div class="gridImage" :class="{ 'animate-image': isActive }">
      <img src="@/img/duet2.png" alt="slide-1" class="rotate-slightly" />
    </div>
    <div class="gridInfo">
      <h2>Привет, Ира</h2>
      <p>
        Сегодня — твой особенный день! Тебе 25 — прекрасный возраст для новых
        открытий, смелых мечт и ярких побед. Всё самое удивительное, доброе и
        вдохновляющее уже ждёт тебя впереди. Ты уже многого достигла — и у тебя
        всё отлично получается!
      </p>
      <p>
        <strong :class="{ 'animate-image': isActive }"
          >На старт, внимание… свайп! 🚀</strong
        >
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
// Определяем проп isActive
defineProps({
  isActive: Boolean,
});
</script>

<style scoped>
/* Стилизация div за картинкой  */
.gridImage {
  border-radius: 27% 73% 69% 31% / 45% 32% 68% 55% !important;
  background: -webkit-linear-gradient(32deg, #892afe, #ff2366, #f3c735);
  background: linear-gradient(32deg, #892afe, #ff2366, #f3c735);
  margin: 5px 5px 0 5px;
  border-radius: 20px;
  grid-row: 1;
  background-color: #fdf2e5;

  img {
    object-fit: cover;
    border-radius: 20px;
    display: block;
    width: 100%;
  }
}

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

.rotate-slightly {
  animation: slight-rotate 10s ease-in-out infinite;
  transform-origin: center bottom;
}
</style>
