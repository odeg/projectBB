<template>
  <v-container class="py-6 px-4 text-center">
    <v-card class="rsvp-card mx-auto py-8 px-6" max-width="600" elevation="2">

      <!-- Éxito al Confirmar -->
      <v-scale-transition>
        <div v-if="success" class="success-screen py-4">
          <v-avatar color="success" size="72" class="mb-4 pulse-success">
            <v-icon color="white" size="36">mdi-check-bold</v-icon>
          </v-avatar>
          <h4 class="text-h5 font-serif font-weight-bold text-success mb-2">
            ¡Asistencia Confirmada!
          </h4>
          <p class="text-body-2 text-textSecondary px-6 mb-6">
            {{ message }}
          </p>
          <div class="raffle-info py-3 px-4 rounded-xl mb-4">
            <v-icon color="primary" class="mr-2">mdi-ticket-percent</v-icon>
            <span class="text-caption font-weight-bold text-textPrimary">
              ¡Ya estás participando en el sorteo de "Quién será el siguiente papá/mamá"!
            </span>
          </div>
        </div>
      </v-scale-transition>

      <!-- Formulario Principal -->
      <v-form v-if="!success" @submit.prevent="handleSubmit" class="text-left">
        <!-- Encabezado del formulario -->
        <div class="text-center mb-6">
          <h3 class="text-h4 font-serif font-weight-medium mb-2 text-primary">
            Confirmá tu Asistencia
          </h3>
          <p class="text-body-2 text-textSecondary">
            Completá los datos para reservar tu lugar en el evento.
          </p>
        </div>

        <!-- Paso 1: Nombre Completo -->
        <div class="mb-4">
          <label class="d-block text-subtitle-2 font-weight-bold text-textPrimary mb-1">
            Nombre y Apellido *
          </label>
          <v-text-field
            v-model="nombre"
            placeholder="Ej. María Pérez"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            color="primary"
            bg-color="background"
            class="custom-input"
          ></v-text-field>
        </div>

        <!-- Teléfono (Opcional) -->
        <div class="mb-5">
          <label class="d-block text-subtitle-2 font-weight-bold text-textPrimary mb-1">
            Teléfono <span class="font-weight-regular text-textSecondary">(Opcional)</span>
          </label>
          <v-text-field
            v-model="telefono"
            placeholder="Ej. +595981234567"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            color="primary"
            bg-color="background"
            class="custom-input"
            type="tel"
          ></v-text-field>
        </div>

        <v-divider class="mb-5" style="border-color: rgba(142,115,85,0.1)"></v-divider>

        <!-- Paso 2: Selector de Team (Niño o Niña) -->
        <div class="mb-2">
          <div class="text-subtitle-2 font-weight-bold text-textPrimary text-center mb-3">
            ¿Cuál es tu palpito? *
          </div>
          <v-row class="ma-0">
            <!-- Team Niño -->
            <v-col cols="6" class="pa-1">
              <v-card
                :class="['team-card d-flex flex-column align-center justify-center py-5 cursor-pointer', { 'selected-nino': team === 'nino' }]"
                elevation="1"
                @click="onTeamChange('nino')"
              >
                <v-icon size="36" color="ninoDark" class="mb-1">mdi-gender-male</v-icon>
                <span class="text-subtitle-2 font-weight-bold text-ninoDark">TEAM NIÑO</span>
                <v-icon v-if="team === 'nino'" size="16" color="ninoDark" class="selected-check">
                  mdi-check-circle
                </v-icon>
              </v-card>
            </v-col>

            <!-- Team Niña -->
            <v-col cols="6" class="pa-1">
              <v-card
                :class="['team-card d-flex flex-column align-center justify-center py-5 cursor-pointer', { 'selected-nina': team === 'nina' }]"
                elevation="1"
                @click="onTeamChange('nina')"
              >
                <v-icon size="36" color="ninaDark" class="mb-1">mdi-gender-female</v-icon>
                <span class="text-subtitle-2 font-weight-bold text-ninaDark">TEAM NIÑA</span>
                <v-icon v-if="team === 'nina'" size="16" color="ninaDark" class="selected-check">
                  mdi-check-circle
                </v-icon>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Paso 3: Selector de Regalo (aparece solo al elegir equipo) -->
        <v-expand-transition>
          <div v-if="team" class="mt-5">
            <v-divider class="mb-5" style="border-color: rgba(142,115,85,0.1)"></v-divider>
            <GiftSelector v-model="productoId" :team="team" />
          </div>
        </v-expand-transition>

        <!-- Mensaje de Error de Validación -->
        <v-slide-y-transition>
          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            density="compact"
            class="mt-5 font-weight-medium text-caption"
          >
            {{ error }}
          </v-alert>
        </v-slide-y-transition>

        <!-- Botón de Envío -->
        <v-btn
          type="submit"
          color="primary"
          size="large"
          rounded="xl"
          block
          :loading="loading"
          class="submit-btn text-none font-weight-bold mt-6 elevation-2"
        >
          <v-icon class="mr-2">mdi-heart-check</v-icon>
          Confirmar Asistencia
        </v-btn>

        <p class="text-caption text-center text-textSecondary mt-3">
          * Campos obligatorios
        </p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { useConfirmacion } from '../composables/useConfirmacion'
import GiftSelector from './GiftSelector.vue'

const emit = defineEmits(['registro-exitoso'])

const {
  nombre,
  telefono,
  team,
  productoId,
  loading,
  error,
  success,
  message,
  enviarConfirmacion
} = useConfirmacion()

// Al cambiar de equipo, limpiar el regalo seleccionado
const onTeamChange = (nuevoTeam) => {
  team.value = nuevoTeam
  productoId.value = null
}

const handleSubmit = async () => {
  const exito = await enviarConfirmacion()
  if (exito) {
    emit('registro-exitoso')
  }
}
</script>

<style scoped>
.rsvp-card {
  border-radius: 24px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
}

.text-primary {
  color: #8E7355 !important;
}

.custom-input :deep(.v-field) {
  border-radius: 12px !important;
  border-color: rgba(142, 115, 85, 0.2) !important;
}

.team-card {
  border-radius: 16px !important;
  border: 2px solid transparent !important;
  background: #FDFBF7 !important;
  position: relative;
  transition: all 0.25s ease;
  min-height: 90px;
}

.team-card:hover {
  transform: translateY(-2px);
  border-color: rgba(142, 115, 85, 0.15) !important;
}

.selected-nino {
  border-color: #B9E2EC !important;
  background-color: #EBF8FC !important;
  box-shadow: 0 4px 12px rgba(58, 134, 200, 0.15) !important;
}

.selected-nina {
  border-color: #F8C8DC !important;
  background-color: #FFF0F5 !important;
  box-shadow: 0 4px 12px rgba(216, 112, 147, 0.15) !important;
}

.text-ninoDark { color: #3A86C8 !important; }
.text-ninaDark { color: #D87093 !important; }

.selected-check {
  position: absolute;
  top: 8px;
  right: 8px;
}

.submit-btn {
  background-color: #8E7355 !important;
  color: #FAF6F0 !important;
  letter-spacing: 0.5px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(142, 115, 85, 0.3) !important;
}

.success-screen {
  animation: fadeIn 0.4s ease-out;
}

.pulse-success {
  animation: pulse-ring 2s infinite;
}

.raffle-info {
  background-color: rgba(142, 115, 85, 0.06);
  border: 1px solid rgba(142, 115, 85, 0.12);
}

.cursor-pointer { cursor: pointer; }

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(109, 140, 116, 0.4); }
  70% { box-shadow: 0 0 0 12px rgba(109, 140, 116, 0); }
  100% { box-shadow: 0 0 0 0 rgba(109, 140, 116, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
