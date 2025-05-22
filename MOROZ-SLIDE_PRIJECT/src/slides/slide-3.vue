<template>
  <div class="slide-content" :class="{ 'active-slide': isActive }">
    <div class="gridImage" :class="{ 'animate-image': isActive }">
      <img src="@/img/jacket.png" alt="slide-3" class="rotate-slightly" />
    </div>
    <div class="gridInfo">
      <h2>
        Ты
        <span
          class="compliment"
          :class="{ 'animate-compliment': complimentAnimation }"
        >
          {{ compliment }}</span
        >
      </h2>
      <p>
        И это абсолютная, стопроцентная правда! Ого, как интересно! А давай
        посмотрим, какая ты ещё — может, удивительная, загадочная, неповторимая,
        обаятельная?
      </p>
      <br />
      <p>
        <strong :class="{ 'animate-image': isActive }"
          >Жми скорее на сердечко!</strong
        >
      </p>

      <div id="main-content">
        <div>
          <input type="checkbox" id="checkbox" @click="setRandomCompliment" />
          <label class="heart" for="checkbox">
            <svg
              id="heart-svg"
              viewBox="467 392 58 57"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Group"
                fill="none"
                fill-rule="evenodd"
                transform="translate(467 392)"
              >
                <path
                  d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                  id="heart"
                  fill="#AAB8C2"
                />
                <circle
                  id="main-circ"
                  fill="#e1e1e1;"
                  opacity="0"
                  cx="29.5"
                  cy="29.5"
                  r="8"
                />

                <g id="grp7" opacity="0" transform="translate(7 6)">
                  <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                  <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                </g>

                <g id="grp6" opacity="0" transform="translate(0 28)">
                  <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                  <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                </g>

                <g id="grp3" opacity="0" transform="translate(52 28)">
                  <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                  <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                </g>

                <g id="grp2" opacity="0" transform="translate(44 6)">
                  <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                  <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                </g>

                <g id="grp5" opacity="0" transform="translate(14 50)">
                  <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                  <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                </g>

                <g id="grp4" opacity="0" transform="translate(35 50)">
                  <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                  <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                </g>

                <g id="grp1" opacity="0" transform="translate(24)">
                  <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                  <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                </g>
              </g>
            </svg>
          </label>
        </div>
      </div>
    </div>
    <div class="link">
      <p>
        <a href="http://irinamoroz.ru">www.irinamoroz.ru</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Определяем проп isActive
const props = defineProps({
  isActive: Boolean,
});

// Список комплиментов
const compliments = [
  "самая красивая",
  "самая умная",
  "самая добрая",
  "самая талантливая",
  "самая обаятельная",
  "самая лучшая",
  "самая заботливая",
  "самая нежная",
  "самая весёлая",
  "самая искренняя",
  "самая мудрая",
  "самая стильная",
  "самая энергичная",
  "самая привлекательная",
  "самая внимательная",
  "самая щедрая",
  "самая чуткая",
  "самая решительная",
  "самая уверенная",
  "самая душевная",
  "самая страстная",
  "самая смелая",
  "самая грациозная",
  "самая загадочная",
  "самая вдохновляющая",
  "самая обаятельная",
  "самая артистичная",
  "самая гармоничная",
  "самая позитивная",
  "самая солнечная",
  "самая терпеливая",
  "самая утончённая",
  "самая отзывчивая",
  "самая неповторимая",
  "самая радостная",
  "самая очаровательная",
  "самая элегантная",
  "самая искристая",
  "самая чувственная",
  "самая сердечная",
  "самая интеллигентная",
  "самая романтичная",
  "самая яркая",
  "самая доброжелательная",
  "самая светлая",
  "самая женственная",
  "самая честная",
  "самая ласковая",
];

// Реактивная переменная для текущего комплимента
const compliment = ref("");

// Реактивная переменная для анимации
const complimentAnimation = ref(false);

// Функция для выбора случайного комплимента
const setRandomCompliment = () => {
  const randomIndex = Math.floor(Math.random() * compliments.length);
  compliment.value = compliments[randomIndex];
  complimentAnimation.value = true;
  setTimeout(() => (complimentAnimation.value = false), 300);
  const checkbox = document.getElementById("checkbox");
  if (checkbox) {
    setTimeout(() => {
      checkbox.checked = false;
    }, 500);
  }
};

// Запускаем комплимент только при активации слайда
watch(
  () => props.isActive,
  (newValue) => {
    if (newValue) {
      setRandomCompliment();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Стилизация div за картинкой  */
.gridImage {
  border-radius: 24% 76% 59% 41% / 79% 72% 28% 21% !important;
  background: -webkit-linear-gradient(201deg, #5400c7, #9c0ec4, #fb7743);
  background: linear-gradient(201deg, #5400c7, #9c0ec4, #fb7743);
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
