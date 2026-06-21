<template>
  <div class="home-view-container">

    <!-- =============================================
         FASE 1: ANTES DE CONFIRMAR
         Muestra el Hero, Countdown y Formulario
    ============================================== -->
    <template v-if="!confirmado">
      <!-- Portada / Invitación -->
      <section>
        <AppHero />
      </section>

      <!-- Contador Regresivo -->
      <section class="py-2">
        <CountdownBlock />
      </section>

      <!-- Formulario de Confirmación RSVP -->
      <section class="py-2 pb-10" id="confirmacion">
        <RsvpForm @registro-exitoso="onRegistroExitoso" />
      </section>
    </template>

    <!-- =============================================
         FASE 2: DESPUÉS DE CONFIRMAR
         Muestra el agradecimiento, el evento y la ubicación
    ============================================== -->
    <template v-else>
      <!-- Portada / Invitación (siempre visible) -->
      <section>
        <AppHero />
      </section>

      <!-- Tarjeta de Agradecimiento y Confirmación -->
      <section class="py-6 px-4">
        <v-container>
          <v-card
            class="thank-you-card mx-auto text-center py-8 px-6"
            max-width="500"
            elevation="2"
          >
            <!-- Avatar de bienvenida según equipo -->
            <v-avatar
              :color="teamGuardado === 'nino' ? 'nino' : teamGuardado === 'nina' ? 'nina' : 'accent'"
              size="72"
              class="mb-4 pulse-avatar"
            >
              <v-icon
                :color="teamGuardado === 'nino' ? 'ninoDark' : teamGuardado === 'nina' ? 'ninaDark' : 'primary'"
                size="36"
              >
                {{ teamGuardado === 'nino' ? 'mdi-gender-male' : teamGuardado === 'nina' ? 'mdi-gender-female' : 'mdi-check-bold' }}
              </v-icon>
            </v-avatar>

            <h3 class="text-h5 font-serif font-weight-bold text-textPrimary mb-2">
              {{ nombreGuardado ? `¡Ya estás confirmado, ${nombreGuardado}!` : '¡Ya estás confirmado!' }}
            </h3>

            <p class="text-body-2 text-textSecondary mb-4 px-4">
              Te esperamos con muchas ganas. Mirá los detalles del evento acá abajo.
            </p>

            <div class="team-badge py-2 px-4 rounded-xl d-inline-flex align-center">
              <v-icon
                :color="teamGuardado === 'nino' ? 'ninoDark' : 'ninaDark'"
                size="18"
                class="mr-1"
              >
                {{ teamGuardado === 'nino' ? 'mdi-gender-male' : 'mdi-gender-female' }}
              </v-icon>
              <span
                class="text-caption font-weight-bold"
                :class="teamGuardado === 'nino' ? 'text-ninoDark' : 'text-ninaDark'"
              >
                {{ teamGuardado === 'nino' ? 'Team Niño' : 'Team Niña' }}
              </span>
            </div>

            <!-- Información del sorteo -->
            <div class="raffle-info mt-4 py-3 px-4 rounded-xl d-flex align-center justify-center">
              <v-icon color="primary" size="18" class="mr-2">mdi-ticket-percent</v-icon>
              <span class="text-caption text-textPrimary">
                ¡Participás en el sorteo de "Quién será el siguiente papá/mamá"!
              </span>
            </div>
          </v-card>
        </v-container>
      </section>

      <!-- Contador Regresivo (también disponible tras confirmar) -->
      <section class="py-2">
        <CountdownBlock />
      </section>

      <!-- Información del Evento -->
      <section class="py-4">
        <EventInfo />
      </section>

      <!-- Ubicación y Google Maps -->
      <section class="py-4">
        <LocationBlock />
      </section>

      <!-- Galería de Fotos -->
      <section class="py-4">
        <GalleryBlock />
      </section>

      <!-- Pie de página con frase tierna -->
      <footer class="footer-invitation text-center py-10 px-4 mt-6">
        <p class="font-serif text-h5 font-italic text-textPrimary mb-2">
          "Con cada latido nace un sueño..."
        </p>
        <p class="text-caption text-textSecondary">
          ¡Gracias por ser parte de nuestra historia!
        </p>
      </footer>
    </template>

    <!-- Patrón de fondo puntual -->
    <div class="bg-pattern" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHero from '../components/AppHero.vue'
import CountdownBlock from '../components/CountdownBlock.vue'
import EventInfo from '../components/EventInfo.vue'
import LocationBlock from '../components/LocationBlock.vue'
import GalleryBlock from '../components/GalleryBlock.vue'
import RsvpForm from '../components/RsvpForm.vue'

// ──────────────────────────────────────────────
// Estado de confirmación (persiste en localStorage)
// ──────────────────────────────────────────────
const getLocalStorageBoolean = (key) => {
  try {
    return localStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

const getLocalStorageValue = (key) => {
  try {
    return localStorage.getItem(key) || null
  } catch {
    return null
  }
}

const confirmado = ref(getLocalStorageBoolean('asistencia_confirmada'))
const nombreGuardado = ref(getLocalStorageValue('asistencia_nombre'))
const teamGuardado = ref(getLocalStorageValue('asistencia_team'))

const onRegistroExitoso = () => {
  // Actualizar el estado reactivo leyendo desde localStorage
  // (useConfirmacion ya lo escribió allí antes de emitir el evento)
  confirmado.value = true
  nombreGuardado.value = getLocalStorageValue('asistencia_nombre')
  teamGuardado.value = getLocalStorageValue('asistencia_team')

  // Scroll suave hacia arriba para mostrar el agradecimiento
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.home-view-container {
  background: #FDFBF7;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Patrón de fondo decorativo */
.bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(#8E7355 1px, transparent 0), radial-gradient(#8E7355 1px, transparent 0);
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
}

section {
  position: relative;
  z-index: 1;
}

/* Tarjeta de agradecimiento post-confirmación */
.thank-you-card {
  border-radius: 24px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
  animation: fadeIn 0.5s ease-out;
}

.pulse-avatar {
  animation: pulse-ring 3s infinite;
}

.team-badge {
  background-color: rgba(142, 115, 85, 0.06);
  border: 1px solid rgba(142, 115, 85, 0.12);
}

.raffle-info {
  background-color: rgba(142, 115, 85, 0.06);
  border: 1px solid rgba(142, 115, 85, 0.12);
}

.footer-invitation {
  background: linear-gradient(to top, #FAF6F0 0%, transparent 100%);
  border-top: 1px solid rgba(142, 115, 85, 0.05);
  position: relative;
  z-index: 1;
}

.text-ninoDark { color: #3A86C8 !important; }
.text-ninaDark { color: #D87093 !important; }

.font-italic { font-style: italic; }

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(142, 115, 85, 0.3); }
  70% { box-shadow: 0 0 0 14px rgba(142, 115, 85, 0); }
  100% { box-shadow: 0 0 0 0 rgba(142, 115, 85, 0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
