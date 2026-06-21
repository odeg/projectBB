<template>
  <v-container class="py-8 px-4 text-center">
    <h2 class="text-h4 font-serif font-weight-medium mb-2 color-primary">
      Nuestra Dulce Espera
    </h2>
    <p class="text-body-2 text-textSecondary mb-8">
      Un viaje lleno de amor, sueños e ilusiones
    </p>

    <!-- Galería en Grid -->
    <v-row justify="center" class="ma-0">
      <v-col
        v-for="foto in EVENTO_CONFIG.galeriaPlaceholder"
        :key="foto.id"
        cols="12"
        sm="4"
        class="pa-2"
      >
        <v-card class="gallery-card h-100 d-flex flex-column" elevation="1">
          <!-- Placeholder de imagen con estilo tierno -->
          <div class="gallery-image-placeholder py-8 d-flex align-center justify-center">
            <v-icon size="48" color="secondary" class="gallery-icon">
              {{ getIcon(foto.id) }}
            </v-icon>
          </div>
          
          <v-card-item class="flex-grow-1 text-left">
            <v-card-title class="font-serif text-subtitle-1 font-weight-bold text-textPrimary">
              {{ foto.title }}
            </v-card-title>
            <v-card-subtitle class="text-body-2 text-textSecondary text-wrap mt-1">
              {{ foto.text }}
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { EVENTO_CONFIG } from '../config/evento'

const getIcon = (id) => {
  switch (id) {
    case 1:
      return 'mdi-baby-bottle-outline'
    case 2:
      return 'mdi-chat-question-outline'
    case 3:
      return 'mdi-heart-multiple-outline'
    default:
      return 'mdi-camera-outline'
  }
}
</script>

<style scoped>
.color-primary {
  color: #8E7355;
}

.gallery-card {
  border-radius: 20px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(142, 115, 85, 0.1) !important;
}

.gallery-image-placeholder {
  background: linear-gradient(135deg, #FAF6F0 0%, #E3D5CA 100%);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 140px;
  position: relative;
  overflow: hidden;
}

.gallery-image-placeholder::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 80%);
}

.gallery-icon {
  animation: pulse-icon 3s infinite alternate;
}

@keyframes pulse-icon {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.1); opacity: 1; }
}
</style>
