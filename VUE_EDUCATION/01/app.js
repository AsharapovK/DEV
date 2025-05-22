const App = {
  // Данные для реактива
  data() {
    return {
      title: "Список заметок",
      placeholderString: "Введите название заметки",
      inputValue: "",
      notes: [`Заметка1`, `Заметка2`, `Заметка3`],
    };
  },

  // Методы
  methods: {
    addNote() {
      this.notes.push(this.inputValue);
      this.inputValue = "";
    },
    deleteNote(idx) {
      this.notes.splice(idx, 1);
    },
    toUpperCase(str) {
      return str.toUpperCase();
    },
  },

  // Вычисляемые свойства
  computed: {
    doubleCount() {
      return this.notes.length * 2;
    },
  },
};

Vue.createApp(App).mount("#app");
