<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

// Шаблон
<template>
  <div class="container" pt-1>
    <div class="card">
      <h2>Актуальные новости {{ now }}</h2>
      <span
        >Открыто: <strong>{{ openNewsCount }}</strong> | Прочитано:
        <strong>{{ readRate }}</strong></span
      >
    </div>
    <AppNews
      v-for="post of news"
      :key="post.id"
      :title="post.newsTitle"
      :text="post.newsText"
      :id="post.id"
      :is-open="post.isOpen"
      @open-news="openNewsCount++"
    />
  </div>
</template>

// Данные
<script>
import AppNews from "./AppNews.vue";
export default {
  data() {
    return {
      now: new Date().toLocaleDateString(),
      openNewsCount: 0,
      readRate: 0,
      news: [
        {
          id: 1,
          isOpen: false,
          newsTitle: "Новость 1",
          newsText: "Информация о новости номер один",
        },
        {
          id: 2,
          isOpen: false,
          newsTitle: "Новость 2",
          newsText: "Информация о новости номер два",
        },
        {
          id: 3,
          isOpen: false,
          newsTitle: "Новость 3",
          newsText: "Информация о новости номер три",
        },
      ],
    };
  },
  components: {
    AppNews,
  },
};
</script>
