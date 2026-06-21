<template>
  <v-container class="py-8 px-4 text-center">
    <v-card class="info-card mx-auto py-8 px-6" max-width="500" elevation="2">
      <h3 class="text-h5 font-serif font-weight-medium mb-6 text-primary">
        Detalles del Evento
      </h3>

      <div class="d-flex flex-column align-center gap-6">
        <!-- Fecha -->
        <div class="d-flex align-center flex-column">
          <v-avatar color="accent" size="48" class="mb-2">
            <v-icon color="primary" size="24">mdi-calendar-heart</v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold text-textPrimary">¿Cuándo?</div>
          <div class="text-body-1 text-textSecondary">{{ EVENTO_CONFIG.fechaFormateada }}</div>
        </div>

        <!-- Hora -->
        <div class="d-flex align-center flex-column">
          <v-avatar color="accent" size="48" class="mb-2">
            <v-icon color="primary" size="24">mdi-clock-outline</v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold text-textPrimary">¿A qué hora?</div>
          <div class="text-body-1 text-textSecondary">{{ EVENTO_CONFIG.horaFormateada }}</div>
        </div>

        <!-- Sugerencia de Vestimenta -->
        <div class="d-flex align-center flex-column" v-if="EVENTO_CONFIG.vestimentaPrompt">
          <v-avatar color="accent" size="48" class="mb-2">
            <v-icon color="primary" size="24">mdi-hanger</v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold text-textPrimary">Sugerencia de vestimenta:</div>
          <div class="text-body-2 text-textSecondary font-italic px-4">{{ EVENTO_CONFIG.vestimentaPrompt }}</div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { EVENTO_CONFIG } from '../config/evento'
</script>

<style scoped>
.info-card {
  border-radius: 20px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
}

.text-primary {
  color: #8E7355 !important;
}

.gap-6 {
  gap: 24px;
}
</style>
