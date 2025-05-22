// Обновление конфигурации Vite для устранения предупреждений Vue

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Добавляем алиас для использования vue.esm-bundler.js
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  // Оптимизация для продакшена
  build: {
    minify: "esbuild", // Минимизация бандла
    sourcemap: false, // Отключение sourcemap в продакшене для уменьшения размера
  },
});
