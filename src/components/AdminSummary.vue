<template>
  <v-row class="ma-0">
    <!-- Total Confirmados -->
    <v-col cols="12" sm="4" md="2.4" class="pa-2">
      <v-card class="stat-card py-4 px-3" elevation="1">
        <div class="d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-textSecondary font-weight-medium">Total Confirmados</div>
            <div class="text-h4 font-weight-bold text-textPrimary mt-1">{{ totalInvitados }}</div>
          </div>
          <v-avatar color="accent" size="48">
            <v-icon color="primary" size="24">mdi-account-group</v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <!-- Team Niño -->
    <v-col cols="6" sm="4" md="2.4" class="pa-2">
      <v-card class="stat-card py-4 px-3 team-nino-stat" elevation="1">
        <div class="d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-ninoDark font-weight-bold">Team Niño</div>
            <div class="text-h4 font-weight-bold text-ninoDark mt-1">{{ totalNino }}</div>
          </div>
          <v-avatar color="nino" size="48">
            <v-icon color="ninoDark" size="24">mdi-gender-male</v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <!-- Team Niña -->
    <v-col cols="6" sm="4" md="2.4" class="pa-2">
      <v-card class="stat-card py-4 px-3 team-nina-stat" elevation="1">
        <div class="d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-ninaDark font-weight-bold">Team Niña</div>
            <div class="text-h4 font-weight-bold text-ninaDark mt-1">{{ totalNina }}</div>
          </div>
          <v-avatar color="nina" size="48">
            <v-icon color="ninaDark" size="24">mdi-gender-female</v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <!-- Regalos Seleccionados -->
    <v-col cols="6" sm="6" md="2.4" class="pa-2">
      <v-card class="stat-card py-4 px-3" elevation="1">
        <div class="d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-textSecondary font-weight-medium">Regalos Elegidos</div>
            <div class="text-h4 font-weight-bold text-textPrimary mt-1">{{ regalosSeleccionados }}</div>
          </div>
          <v-avatar color="secondary" size="48">
            <v-icon color="background" size="24">mdi-gift</v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>

    <!-- Regalos Disponibles -->
    <v-col cols="6" sm="6" md="2.4" class="pa-2">
      <v-card class="stat-card py-4 px-3" elevation="1">
        <div class="d-flex align-center justify-space-between">
          <div>
            <div class="text-caption text-textSecondary font-weight-medium">Regalos Libres</div>
            <div class="text-h4 font-weight-bold text-textPrimary mt-1">{{ regalosDisponibles }}</div>
          </div>
          <v-avatar color="accent" size="48">
            <v-icon color="primary" size="24">mdi-gift-outline</v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  totalInvitados: { type: Number, default: 0 },
  totalNino: { type: Number, default: 0 },
  totalNina: { type: Number, default: 0 },
  regalosSeleccionados: { type: Number, default: 0 },
  regalosDisponibles: { type: Number, default: 0 }
})
</script>

<style scoped>
.stat-card {
  border-radius: 16px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.team-nino-stat {
  background: linear-gradient(135deg, #FAF6F0 0%, #EBF8FC 100%) !important;
}

.team-nina-stat {
  background: linear-gradient(135deg, #FAF6F0 0%, #FFF0F5 100%) !important;
}

.text-ninoDark {
  color: #3A86C8 !important;
}

.text-ninaDark {
  color: #D87093 !important;
}
</style>
