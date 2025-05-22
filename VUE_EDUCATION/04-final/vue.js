Vue.createApp({
  data: () => ({
    stepIndex: 0,
    stepsText: [
      {
        stepName: "Основы",
        stepDescription:
          "В блоке вы познакомитесь со всеми основами Vue.js на практике. На протяжении блока мы напишем реактивное приложение, в процессе разработки которого разберем вся базу фреймворка.",
      },
      {
        stepName: "Компоненты",
        stepDescription:
          "Один из самых важных блоков в курсе, где вы узнаете все о компонентах. В блоке мы напишем 2 разных приложения и создадим более 5 различных UI компонентов как в реальной разработке. Блок расскажет про абсолютно все составляющие, которые есть в компонентах: взаимодействие, slots, асинхронные и динамические компоненты и тонна примеров.",
      },
      {
        stepName: "Роутер",
        stepDescription:
          "В данном блоке вы узнаете все о том, как работает мультиязычность во Vue. Мы создадим миниклон Gmail в данном блоке, где вы на практике увидите как работать с динамическим роутером.",
      },
      {
        stepName: "Vuex",
        stepDescription:
          "В блоке вы узнаете абсолютно все про Vuex. Вы узнаете как работать с данными, какие есть лучшие практики по их программированию и структурированию. Все на практике.",
      },
      {
        stepName: "Composition",
        stepDescription:
          "Одним из наиболее важных обновлений в Vue 3 является появление альтернативного синтаксиса Composition API. В этом блоке вы узнаете все, чтобы полностью пользоваться данными синтаксисом на практических примерах. Помимо этого вы узнаете как работать совместно с Vue Router и Vuex.",
      },
    ],
  }),

  methods: {
    renderContent(stepIndex) {
      console.log(`stepIndex`, stepIndex);
      return this.stepsText[stepIndex].stepDescription;
    },
    stepClickUp() {
      if (this.stepIndex >= 0 && this.stepIndex < this.stepsText.length - 1)
        this.stepIndex++;
    },
    stepClickDown() {
      if (this.stepIndex > 0 && this.stepIndex <= this.stepsText.length - 1)
        this.stepIndex--;
    },
  },
}).mount("#app");
