<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <button class="btn" @click="open">Открыть</button>
    <p v-if="isNewsOpen">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo commodi
      doloribus praesentium numquam tempora impedit earum, nulla rerum qui est
      fugit dolores nobis ipsa officiis enim quam animi ducimus architecto?
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
      validator: (value) => {
        console.log(`value`, value);
        return true;
      },
    },
  },
  data() {
    return {
      isNewsOpen: false,
    };
  },
  methods: {
    open() {
      this.isNewsOpen = !this.isNewsOpen;
      if (this.isNewsOpen) {
        this.$emit("open-news", this.id);
      }
    },
  },
};
</script>
