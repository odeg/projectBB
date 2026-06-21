<template>
  <v-card class="raffle-card pa-6 text-center" elevation="2">
    <h3 class="text-h6 font-serif font-weight-bold text-textPrimary mb-2">
      Sorteo Especial
    </h3>
    <p class="text-caption text-textSecondary mb-6">
      Sortea aleatoriamente quién será el siguiente papá/mamá entre los invitados confirmados.
    </p>

    <!-- Caja de Ganador con Efecto Visual -->
    <div class="winner-display py-8 px-4 mb-6 rounded-xl d-flex flex-column align-center justify-center">
      <div v-if="sorteando" class="spinning-names">
        <span class="text-h5 font-weight-bold text-primary opacity-transition">
          {{ nombreTemporal }}
        </span>
        <div class="text-caption text-textSecondary mt-1">Sorteando.....</div>
      </div>
      
      <div v-else-if="ganador" class="winner-info animate-winner">
        <v-avatar color="success" size="64" class="mb-3">
          <v-icon color="background" size="32">mdi-trophy-variant</v-icon>
        </v-avatar>
        <div class="text-caption text-uppercase font-weight-bold text-success">¡Ganador/a!</div>
        <h4 class="text-h4 font-serif font-weight-bold text-textPrimary mt-1">
          {{ ganador.nombre }}
        </h4>
        <v-chip
          size="small"
          :color="ganador.team === 'nino' ? 'ninoDark' : 'ninaDark'"
          variant="flat"
          class="mt-2 font-weight-bold text-background"
        >
          {{ ganador.team === 'nino' ? 'Team Niño' : 'Team Niña' }}
        </v-chip>
      </div>

      <div v-else class="initial-display">
        <v-icon size="48" color="secondary" class="mb-2">mdi-ticket-confirmation-outline</v-icon>
        <p class="text-body-2 text-textSecondary font-italic">
          Selecciona un equipo para iniciar el sorteo.
        </p>
      </div>
    </div>

    <!-- Botones de Acción -->
    <v-row class="ma-0">
      <!-- Sortear Team Niño -->
      <v-col cols="12" sm="6" class="pa-1">
        <v-btn
          color="ninoDark"
          rounded="xl"
          block
          class="text-none font-weight-bold btn-sorteo text-background"
          prepend-icon="mdi-gender-male"
          :loading="sorteando"
          @click="iniciarSorteo('nino')"
        >
          Sortear Niño
        </v-btn>
      </v-col>

      <!-- Sortear Team Niña -->
      <v-col cols="12" sm="6" class="pa-1">
        <v-btn
          color="ninaDark"
          rounded="xl"
          block
          class="text-none font-weight-bold btn-sorteo text-background"
          prepend-icon="mdi-gender-female"
          :loading="sorteando"
          @click="iniciarSorteo('nina')"
        >
          Sortear Niña
        </v-btn>
      </v-col>
    </v-row>

    <!-- Notificación si no hay participantes -->
    <v-alert
      v-if="alertaNoParticipantes"
      type="info"
      variant="tonal"
      class="mt-4 text-caption font-weight-medium"
      closable
      @click:close="alertaNoParticipantes = false"
    >
      No hay invitados confirmados en el equipo seleccionado todavía.
    </v-alert>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  invitados: {
    type: Array,
    default: () => []
  }
})

const sorteando = ref(false)
const ganador = ref(null)
const nombreTemporal = ref('')
const alertaNoParticipantes = ref(false)

const iniciarSorteo = (equipo) => {
  alertaNoParticipantes.value = false
  ganador.value = null

  // Filtrar invitados del equipo correspondiente
  const participantes = props.invitados.filter(inv => inv.team === equipo)

  if (participantes.length === 0) {
    alertaNoParticipantes.value = true
    return
  }

  sorteando.value = true
  
  // Efecto visual: cambiar nombres rápidamente
  let contador = 0
  const totalCiclos = 15
  const intervaloMs = 120

  const temporizador = setInterval(() => {
    const indiceAleatorio = Math.floor(Math.random() * participantes.length)
    nombreTemporal.value = participantes[indiceAleatorio].nombre
    contador++

    if (contador >= totalCiclos) {
      clearInterval(temporizador)
      sorteando.value = false
      // Definir ganador definitivo
      const indiceFinal = Math.floor(Math.random() * participantes.length)
      ganador.value = participantes[indiceFinal]
    }
  }, intervaloMs)
}
</script>

<style scoped>
.raffle-card {
  border-radius: 20px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
}

.winner-display {
  background-color: #FDFBF7;
  border: 1px dashed rgba(142, 115, 85, 0.25);
  min-height: 180px;
}

.btn-sorteo {
  letter-spacing: 0.5px;
  transition: transform 0.2s;
}

.btn-sorteo:hover {
  transform: translateY(-2px);
}

.ninoDark {
  color: #3A86C8 !important;
}

.ninaDark {
  color: #D87093 !important;
}

.animate-winner {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.opacity-transition {
  transition: opacity 0.1s ease;
}

@keyframes popIn {
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
