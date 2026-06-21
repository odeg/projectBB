<template>
  <v-container class="hero-container py-10 px-4 text-center d-flex flex-column align-center justify-center">
    <!-- Contenedor de la Imagen o Placeholder -->
    <v-card
      elevation="4"
      max-width="500"
      class="invitation-card overflow-hidden"
      color="background"
    >
      <!-- Intentar cargar la imagen real, con fallback al placeholder si falla -->
      <div v-if="!imageError" class="image-wrapper">
        <v-img
          src="/images/invitacion.png"
          alt="Invitación Revelación de Sexo"
          max-height="650"
          contain
          @error="handleImageError"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>

      <!-- Diseño Visual Placeholder Elegante (Si no existe invitacion.png) -->
      <div v-else class="placeholder-invitation py-12 px-6 d-flex flex-column align-center justify-center">
        <!-- Ilustración / Icono Tierno -->
        <div class="baby-illustration mb-6">
          <v-icon size="80" color="primary" class="floating-icon">mdi-baby-carriage</v-icon>
        </div>
        
        <span class="text-overline font-weight-bold text-textSecondary letter-spacing-2">¡ESTÁS INVITADO!</span>
        
        <h1 class="text-h3 font-serif font-weight-bold mt-2 mb-4 color-primary text-glow">
          Revelación de Sexo
        </h1>
        
        <div class="divider-line my-4"></div>
        
        <p class="text-h6 font-italic text-textSecondary font-weight-light mb-8 max-w-xs">
          ¿Será un príncipe o una princesa? Acompáñanos a descubrir el misterio más dulce de nuestras vidas.
        </p>

        <!-- Detalle decorativo de nube/corazón -->
        <div class="d-flex justify-center align-center gap-4 mb-4">
          <v-icon color="ninoDark" size="28" class="pulse-icon">mdi-heart</v-icon>
          <span class="font-serif text-h6 font-weight-medium text-textPrimary">¿Niño o Niña?</span>
          <v-icon color="ninaDark" size="28" class="pulse-icon">mdi-heart</v-icon>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const imageError = ref(false)

const handleImageError = () => {
  console.log('Imagen public/images/invitacion.png no encontrada, usando placeholder elegante.')
  imageError.value = true
}
</script>

<style scoped>
.hero-container {
  min-height: 80vh;
}

.invitation-card {
  border-radius: 24px !important;
  border: 1px solid rgba(142, 115, 85, 0.15);
  background: radial-gradient(circle, #FFFDF9 0%, #FAF6F0 100%) !important;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.invitation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(142, 115, 85, 0.15) !important;
}

.image-wrapper {
  background-color: #FAF6F0;
}

.placeholder-invitation {
  position: relative;
  min-height: 500px;
}

.divider-line {
  width: 60px;
  height: 2px;
  background-color: #8E7355;
  border-radius: 2px;
}

.letter-spacing-2 {
  letter-spacing: 0.15em !important;
}

/* Efectos y animaciones premium */
.floating-icon {
  animation: float 4s ease-in-out infinite;
}

.pulse-icon {
  animation: pulse 2s infinite alternate;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.15); opacity: 1; }
}

.color-primary {
  color: #8E7355;
}

.max-w-xs {
  max-width: 350px;
}

.gap-4 {
  gap: 16px;
}
</style>
