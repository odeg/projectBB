<template>
  <v-container class="py-8 px-4 text-center">
    <h2 class="text-h4 font-serif font-weight-medium mb-6 color-primary">
      Falta Muy Poco...
    </h2>
    
    <v-row justify="center" class="ma-0 countdown-grid">
      <!-- Días -->
      <v-col cols="3" sm="2" class="px-2">
        <v-card class="countdown-card py-4" elevation="2">
          <div class="text-h4 text-sm-h3 font-weight-bold text-textPrimary">{{ dias }}</div>
          <div class="text-caption text-uppercase font-weight-medium text-textSecondary mt-1">Días</div>
        </v-card>
      </v-col>
      
      <!-- Horas -->
      <v-col cols="3" sm="2" class="px-2">
        <v-card class="countdown-card py-4" elevation="2">
          <div class="text-h4 text-sm-h3 font-weight-bold text-textPrimary">{{ horas }}</div>
          <div class="text-caption text-uppercase font-weight-medium text-textSecondary mt-1">Horas</div>
        </v-card>
      </v-col>
      
      <!-- Minutos -->
      <v-col cols="3" sm="2" class="px-2">
        <v-card class="countdown-card py-4" elevation="2">
          <div class="text-h4 text-sm-h3 font-weight-bold text-textPrimary">{{ minutos }}</div>
          <div class="text-caption text-uppercase font-weight-medium text-textSecondary mt-1">Min.</div>
        </v-card>
      </v-col>
      
      <!-- Segundos -->
      <v-col cols="3" sm="2" class="px-2">
        <v-card class="countdown-card py-4" elevation="2">
          <div class="text-h4 text-sm-h3 font-weight-bold text-textPrimary">{{ segundos }}</div>
          <div class="text-caption text-uppercase font-weight-medium text-textSecondary mt-1">Seg.</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mensaje cuando el evento ya inició o finalizó -->
    <v-fade-transition>
      <div v-if="finalizado" class="mt-6 text-h6 text-primary font-italic">
        ¡El gran día ha llegado! Nos estamos reuniendo en este momento.
      </div>
    </v-fade-transition>
  </v-container>
</template>

<script setup>
import { useCountdown } from '../composables/useCountdown'
import { EVENTO_CONFIG } from '../config/evento'

const { dias, horas, minutos, segundos, finalizado } = useCountdown(EVENTO_CONFIG.fechaTarget)
</script>

<style scoped>
.color-primary {
  color: #8E7355;
}

.countdown-grid {
  max-width: 600px;
  margin: 0 auto !important;
}

.countdown-card {
  border-radius: 16px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
  box-shadow: 0 4px 12px rgba(142, 115, 85, 0.05) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.countdown-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(142, 115, 85, 0.1) !important;
}
</style>
