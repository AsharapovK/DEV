Vue.createApp({
  data: () => ({
    myHtml: `<h1>Я есть Грут</h1>`,
    title: `Я есть Грут`,
    person: {
      name: `Грут`,
      age: 23,
      lastName: `Смит`,
    },
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  }),
  computed: {
    eventItems() {
      return this.items.filter((i) => i % 2 === 0);
    },
  },
}).mount(`#app`);
