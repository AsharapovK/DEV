<template>
  <div class="slide-content" :class="{ 'active-slide': isActive }">
    <div class="gridImage" :class="{ 'animate-image': isActive }">
      <img src="@/img/klass3.png" alt="slide-2" class="rotate-slightly" />
    </div>
    <div class="gridInfo">
      <Transition name="fade-slide" mode="out-in">
        <h2 :key="currentTitle">{{ currentTitle }}</h2>
      </Transition>
      <p>
        Фильм “Классная” — для тебя это не просто достижение, а смелый шаг к
        преодолению страхов и настоящая работа над собой! А с 18 сентября еще и
        повод для гордости.
      </p>
      <p>
        Не забывай, что <strong>ты классная</strong> не только в кино, но и в
        жизни: ты — невероятный человек, заботливая мать и верный друг.
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
import { ref, onMounted } from "vue";

const titles = [
  "-Садись! Два!",
  "-Родителей в школу!",
  "-Ты вообще уроки учил?",
  "-Где твой дневник?",
  "-Ты сейчас договоришься!",
  "-Что за каракули?",
  "-Это тебе не детский сад!",
  "-Ты за кого меня держишь?",
  "-Хватит баловаться!",
  "-Я всё расскажу родителям!",
  "-Ты на уроке или где?",
  "-Не нравится — дверь вон там!",
];

const currentTitle = ref(titles[0]);
let titleIndex = 0;

onMounted(() => {
  setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    currentTitle.value = titles[titleIndex];
  }, 6000);
});

// Определяем проп isActive
defineProps({
  isActive: Boolean,
});
</script>

<style scoped>
/* Стилизация div за картинкой  */
.gridImage {
  border-radius: 72% 28% 35% 65% / 85% 72% 28% 15% !important;
  background: -webkit-linear-gradient(30deg, #ff4013, #ff6a00, #7b219f);
  background: linear-gradient(30deg, #ff4013, #ff6a00, #7b219f);
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
    transform: rotateZ(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateZ(2deg) rotateY(10deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
}

.rotate-slightly {
  animation: slight-rotate 10s ease-in-out infinite;
  transform-origin: center bottom;
}
</style>
