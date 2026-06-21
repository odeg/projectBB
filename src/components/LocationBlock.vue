<template>
  <v-container class="py-8 px-4 text-center">
    <v-card class="location-card mx-auto py-8 px-6" max-width="500" elevation="2">
      <h3 class="text-h5 font-serif font-weight-medium mb-6 text-primary">
        ¿Dónde será el evento?
      </h3>

      <v-avatar color="accent" size="56" class="mb-4">
        <v-icon color="primary" size="28">mdi-map-marker-radius</v-icon>
      </v-avatar>

      <div class="text-h6 font-weight-bold text-textPrimary mb-1">
        {{ EVENTO_CONFIG.lugarNombre }}
      </div>
      
      <p class="text-body-2 text-textSecondary mb-6 px-4">
        {{ EVENTO_CONFIG.lugarDireccion }}
      </p>

      <!-- Botón para Google Maps -->
      <v-btn
        color="primary"
        size="large"
        rounded="xl"
        class="text-none px-8 font-weight-bold elevation-2 maps-btn"
        :href="EVENTO_CONFIG.googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        prepend-icon="mdi-navigation"
      >
        ¿Cómo llegar?
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { EVENTO_CONFIG } from '../config/evento'
</script>

<style scoped>
.location-card {
  border-radius: 20px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
}

.text-primary {
  color: #8E7355 !important;
}

.maps-btn {
  letter-spacing: 0.5px;
  background-color: #8E7355 !important;
  color: #FAF6F0 !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

.maps-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 15px rgba(142, 115, 85, 0.3) !important;
}
</style>
