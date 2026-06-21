<template>
  <div class="gift-selector-container">
    <!-- Encabezado con label del equipo elegido -->
    <div class="d-flex align-center mb-3">
      <v-avatar :color="team === 'nino' ? 'nino' : 'nina'" size="32" class="mr-2">
        <v-icon :color="team === 'nino' ? 'ninoDark' : 'ninaDark'" size="18">
          {{ team === 'nino' ? 'mdi-gender-male' : 'mdi-gender-female' }}
        </v-icon>
      </v-avatar>
      <div>
        <div class="text-subtitle-2 font-weight-bold text-textPrimary">
          Elegí un regalo para llevar *
        </div>
        <div class="text-caption text-textSecondary">
          Mostrando opciones para
          <span :class="team === 'nino' ? 'text-ninoDark' : 'text-ninaDark'" class="font-weight-bold">
            {{ team === 'nino' ? 'Team Niño' : 'Team Niña' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Indicador de carga -->
    <div v-if="loading" class="text-center py-6">
      <v-progress-circular indeterminate color="primary" size="32"></v-progress-circular>
      <p class="text-caption text-textSecondary mt-2">Cargando regalos disponibles...</p>
    </div>

    <!-- Error al cargar -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      density="compact"
      class="mb-3"
    >
      {{ error }}
      <template v-slot:append>
        <v-btn size="x-small" variant="text" @click="recargar">Reintentar</v-btn>
      </template>
    </v-alert>

    <!-- Lista vacía -->
    <v-card
      v-else-if="regalos.length === 0"
      variant="outlined"
      class="no-gifts-card text-center py-5 px-4"
    >
      <v-icon size="32" color="textSecondary" class="mb-2">mdi-gift-off-outline</v-icon>
      <p class="text-body-2 text-textSecondary font-italic">
        Todos los regalos de este equipo ya fueron reservados.
        ¡Tu presencia igual nos alegra mucho!
      </p>
    </v-card>

    <!-- Listado interactivo de regalos -->
    <div v-else class="gifts-list">
      <v-card
        v-for="regalo in regalos"
        :key="regalo.id"
        :class="['gift-card mb-2 cursor-pointer', { 'selected-card': modelValue === regalo.id }]"
        elevation="1"
        @click="selectGift(regalo.id)"
      >
        <div class="d-flex align-center pa-3">
          <!-- Icono/Check de selección -->
          <v-avatar
            :color="modelValue === regalo.id ? (team === 'nino' ? 'ninoDark' : 'ninaDark') : 'accent'"
            size="40"
            class="mr-3 flex-shrink-0"
          >
            <v-icon :color="modelValue === regalo.id ? 'white' : 'primary'" size="18">
              {{ modelValue === regalo.id ? 'mdi-check-bold' : 'mdi-gift-outline' }}
            </v-icon>
          </v-avatar>

          <!-- Detalles del Regalo -->
          <div class="flex-grow-1 min-width-0">
            <div class="gift-name font-weight-bold text-body-2 text-textPrimary">
              {{ regalo.nombre }}
            </div>
            <div v-if="regalo.descripcion" class="gift-desc text-caption text-textSecondary mt-0.5">
              {{ regalo.descripcion }}
            </div>
          </div>

          <!-- Stock disponible -->
          <v-chip
            size="x-small"
            :color="getStockColor(regalo.cantidad_disponible)"
            variant="tonal"
            class="ml-2 flex-shrink-0 font-weight-bold"
          >
            {{ regalo.cantidad_disponible === 1 ? '¡Último!' : `${regalo.cantidad_disponible} disp.` }}
          </v-chip>
        </div>
      </v-card>
    </div>

    <!-- Indicador de selección activa -->
    <v-slide-y-transition>
      <div
        v-if="modelValue && selectedName"
        class="selected-badge mt-3 pa-2 rounded-lg d-flex align-center"
      >
        <v-icon size="16" color="success" class="mr-2">mdi-check-circle</v-icon>
        <span class="text-caption font-weight-bold text-success">
          Seleccionaste: {{ selectedName }}
        </span>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script setup>
import { watch, computed } from 'vue'
import { useRegalos } from '../composables/useRegalos'

const props = defineProps({
  modelValue: {
    type: [Number, null],
    default: null
  },
  team: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const { regalos, loading, error, cargarRegalos } = useRegalos()

// Cuando cambia el equipo, limpiar la selección actual y recargar los regalos del equipo
watch(() => props.team, (newTeam) => {
  if (newTeam) {
    emit('update:modelValue', null) // Limpiar selección al cambiar de equipo
    cargarRegalos(newTeam)
  }
}, { immediate: true })

const selectGift = (id) => {
  emit('update:modelValue', id)
}

const recargar = () => {
  if (props.team) cargarRegalos(props.team)
}

const selectedName = computed(() => {
  if (!props.modelValue) return null
  const regalo = regalos.value.find(r => r.id === props.modelValue)
  return regalo?.nombre || null
})

const getStockColor = (stock) => {
  if (stock === 1) return 'warning'
  if (stock <= 3) return 'ninoDark'
  return 'success'
}
</script>

<style scoped>
.gift-selector-container {
  width: 100%;
}

.gifts-list {
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;
}

/* Scrollbar estilizado */
.gifts-list::-webkit-scrollbar {
  width: 5px;
}
.gifts-list::-webkit-scrollbar-track {
  background: transparent;
}
.gifts-list::-webkit-scrollbar-thumb {
  background-color: #D5BDAF;
  border-radius: 4px;
}

.gift-card {
  border-radius: 12px !important;
  border: 1.5px solid transparent !important;
  background: #FDFBF7 !important;
  transition: all 0.2s ease;
}

.gift-card:hover {
  border-color: rgba(142, 115, 85, 0.3) !important;
  background-color: #F5EBE0 !important;
}

.selected-card {
  background-color: #F5EBE0 !important;
  border-color: #8E7355 !important;
  box-shadow: 0 3px 10px rgba(142, 115, 85, 0.12) !important;
}

.gift-name {
  line-height: 1.3;
}

.gift-desc {
  line-height: 1.2;
}

.cursor-pointer {
  cursor: pointer;
}

.no-gifts-card {
  border-radius: 12px !important;
  border: 1px dashed rgba(142, 115, 85, 0.3) !important;
  background: #FAF6F0 !important;
}

.min-width-0 {
  min-width: 0;
}

.selected-badge {
  background-color: rgba(109, 140, 116, 0.08);
  border: 1px solid rgba(109, 140, 116, 0.2);
}

.text-ninoDark { color: #3A86C8 !important; }
.text-ninaDark { color: #D87093 !important; }
</style>
