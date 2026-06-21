<template>
  <v-app class="reveal-app">
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
// No se necesita lógica global por ahora
</script>

<style>
/* Importar tipografía moderna de Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.reveal-app {
  font-family: 'Outfit', sans-serif !important;
  color: #4A3B32 !important;
  background-color: #FDFBF7 !important;
}

/* Clases auxiliares para usar fuentes con serifa elegantes en títulos */
.font-serif,
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif !important;
  color: #4A3B32;
}

/* Animación de transición de páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
