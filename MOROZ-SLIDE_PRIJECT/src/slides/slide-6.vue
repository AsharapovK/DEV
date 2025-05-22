<template>
  <div class="slide-content" :class="{ 'active-slide': isActive }">
    <div class="balloons-container" ref="balloonsRoot"></div>
    <div class="gridHBR" :class="{ 'animate-image': isActive }">
      <div class="hbr-link1">
        <p>
          <a href="https://t.me/vladimirovichkiril">Поблагодарить</a>
        </p>
      </div>

      <div class="hbrImage">
        <img src="@/img/buket.png" alt="slide-2" class="rotate-slightly" />
      </div>
      <div class="header">
        <h1 class="hbr">С ДНЕМ РОЖДЕНИЯ!</h1>
      </div>

      <div class="hbr-button">
        <button v-if="isActive" @click="launchBalloons" class="balloons-button">
          Запуск!
        </button>
      </div>

      <div class="hbr-link4">
        <p>
          <a href="http://irinamoroz.ru">www.irinamoroz.ru</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { balloons } from "@/components/Balloons";
import birthdayMusic from "@/assets/audio/happy-birthday.mp3"; // Путь к аудиофайлу

defineProps({
  isActive: Boolean,
});

const balloonsRoot = ref(null);
const audio = new Audio(birthdayMusic);
const canPlayMusic = ref(true);

const launchBalloons = () => {
  if (balloonsRoot.value) {
    balloons(balloonsRoot.value, () => {}, {
      elementCount: 5,
      elementSize: 60,
      lifetime: 3000,
      spread: 60,
      startVelocity: 4,
      zIndex: 50,
      position: "absolute",
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"],
      onAnimationComplete: () => {
        console.log("Анимация шариков завершена!");
      },
    });
  }

  if (canPlayMusic.value) {
    audio.currentTime = 0;
    audio
      .play()
      .catch((err) => console.warn("Не удалось воспроизвести музыку:", err));
    canPlayMusic.value = false;
    setTimeout(() => {
      canPlayMusic.value = true;
    }, 10000); // блокировка на 11 секунд
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.gridHBR {
  display: grid;
  grid-template-rows: 60px 3fr 1fr 1fr 30px;
}

.balloons-container {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translateX(-50%);
  pointer-events: none;
}

.hbr-link1 {
  grid-row: 1;
  margin: 0 5px 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.hbr-link1 a {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 2s ease-in 2.3s forwards;
  color: rgb(175, 175, 175);
  text-decoration: none;
}

.hbr-link1 a:visited {
  color: rgb(198, 198, 198);
}

.hbr-link1 a:hover,
.hbr-link1 a:active {
  color: rgb(175, 175, 175);
}

.hbr-link4 {
  grid-row: 6;
  margin: 0 5px 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.hbr-link4 a {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 2s ease-in 2.3s forwards;
  color: rgb(175, 175, 175);
  text-decoration: none;
}

.hbr-link4 a:visited {
  color: rgb(198, 198, 198);
}

.hbr-link4 a:hover,
.hbr-link4 a:active {
  color: rgb(175, 175, 175);
}

.hbrImage {
  border-radius: 45% 55% 40% 60% / 67% 43% 57% 33%;
  background-image: linear-gradient(20deg, #345b63 10%, #2398af 100%);
  grid-row: 2;
  width: 100%;
  display: flex;
  justify-content: center;
}

.hbrImage img {
  width: 100%;
  object-fit: cover;
  opacity: 1;
}

.header {
  grid-row: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hbr {
  margin: 20px 0;
  font-family: "Pacifico", cursive;
  color: #345b63;
  font-weight: 700;
  font-size: 25px;
}

.hbrText {
  grid-row: 4;
  margin: 20px 0;
  font-family: "Pacifico", regular;
  color: rgb(54, 54, 54);
  font-size: 18px;
  padding: 0 0 0 10px;
}

.hbr-button {
  margin-top: 20px;
  grid-row: 4;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.balloons-button {
  background-image: linear-gradient(180deg, #345b63 10%, #2398af 100%);
  width: 200px;
  height: 60px;
  padding: 10px 20px;
  font-family: "Pacifico", cursive;
  font-size: 20px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, width 0.3s ease, height 0.3s ease;
  pointer-events: auto;
  user-select: none;
}

.balloons-button:hover {
  user-select: none;
  background-image: linear-gradient(180deg, #345b63 10%, #2398af 100%);
}

.balloons-button:active {
  user-select: none;
  background-image: linear-gradient(180deg, #345b63 10%, #2398af 100%);
  width: 190px;
  height: 60px;
  transition: background-color 0.3s ease, width 0.3s ease, height 0.3s ease;
}

@keyframes slight-rotate {
  0% {
    transform: rotateZ(-2deg) rotateY(-2deg);
  }
  50% {
    transform: rotateZ(-4deg) rotateY(-4deg);
  }
  100% {
    transform: rotateZ(-2deg) rotateY(-2deg);
  }
}

.rotate-slightly {
  animation: slight-rotate 10s ease-in-out infinite;
  transform-origin: center bottom;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
