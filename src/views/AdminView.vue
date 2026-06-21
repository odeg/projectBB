<template>
  <div class="admin-view-container py-8 px-4">
    <!-- Barra superior -->
    <v-container class="px-2">
      <div class="d-flex align-center justify-space-between mb-6">
        <div>
          <h2 class="text-h4 font-serif font-weight-bold text-textPrimary">
            Panel de Control
          </h2>
          <p class="text-caption text-textSecondary mt-1">
            Administra las respuestas de los invitados y los regalos del Baby Shower.
          </p>
        </div>
        
        <div class="d-flex align-center gap-3">
          <!-- Botón Recargar -->
          <v-btn
            icon="mdi-refresh"
            variant="outlined"
            color="primary"
            density="comfortable"
            :loading="cargandoDatos"
            @click="cargarTodo"
          ></v-btn>

          <!-- Cerrar Sesión -->
          <v-btn
            color="primary"
            variant="outlined"
            rounded="xl"
            class="text-none font-weight-bold"
            prepend-icon="mdi-logout"
            @click="handleLogout"
          >
            Cerrar Sesión
          </v-btn>
        </div>
      </div>

      <!-- Pantalla de Carga Inicial -->
      <div v-if="loadingInicial" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" size="48" class="mb-4"></v-progress-circular>
        <p class="text-subtitle-1 text-textSecondary">Cargando información del panel...</p>
      </div>

      <!-- Error al Cargar -->
      <v-alert
        v-else-if="errorDatos"
        type="error"
        variant="tonal"
        class="mb-6 font-weight-medium"
      >
        {{ errorDatos }}
        <template v-slot:append>
          <v-btn variant="text" size="small" @click="cargarTodo">Reintentar</v-btn>
        </template>
      </v-alert>

      <!-- Panel de Datos -->
      <div v-else>
        <!-- Resumen de Estadísticas -->
        <section class="mb-6">
          <AdminSummary
            :total-invitados="totalInvitados"
            :total-nino="totalNino"
            :total-nina="totalNina"
            :regalos-seleccionados="regalosSeleccionados"
            :regalos-disponibles="regalosDisponibles"
          />
        </section>

        <v-row class="ma-0">
          <!-- Tabla de Invitados -->
          <v-col cols="12" md="8" class="pa-2">
            <AdminInvitadosTable :invitados="invitados" />
          </v-col>

          <!-- Bloque de Sorteo -->
          <v-col cols="12" md="4" class="pa-2">
            <SorteoBlock :invitados="invitados" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminService } from '../services/adminService'
import { useAdminAuth } from '../composables/useAdminAuth'
import AdminSummary from '../components/AdminSummary.vue'
import AdminInvitadosTable from '../components/AdminInvitadosTable.vue'
import SorteoBlock from '../components/SorteoBlock.vue'

const { logout } = useAdminAuth()

const invitados = ref([])
const regalos = ref([])
const loadingInicial = ref(true)
const cargandoDatos = ref(false)
const errorDatos = ref(null)

// Cargar toda la información desde el servicio
const cargarTodo = async () => {
  cargandoDatos.value = true
  errorDatos.value = null
  try {
    const [datosInvitados, datosRegalos] = await Promise.all([
      adminService.obtenerInvitados(),
      adminService.obtenerTodosLosRegalos()
    ])
    invitados.value = datosInvitados
    regalos.value = datosRegalos
  } catch (err) {
    errorDatos.value = err.message || 'Error al conectar con la base de datos de Supabase.'
    console.error(err)
  } finally {
    loadingInicial.value = false
    cargandoDatos.value = false
  }
}

onMounted(() => {
  cargarTodo()
})

const handleLogout = async () => {
  await logout()
}

// Estadísticas computadas
const totalInvitados = computed(() => invitados.value.length)
const totalNino = computed(() => invitados.value.filter(i => i.team === 'nino').length)
const totalNina = computed(() => invitados.value.filter(i => i.team === 'nina').length)

// Se considera regalo seleccionado si el invitado tiene asociado un producto_id
const regalosSeleccionados = computed(() => {
  return invitados.value.filter(i => i.productos_regalo !== null).length
})

// Sumatoria de stock disponible de regalos activos
const regalosDisponibles = computed(() => {
  return regalos.value
    .filter(r => r.activo)
    .reduce((acumulador, regalo) => acumulador + (regalo.cantidad_disponible || 0), 0)
})
</script>

<style scoped>
.admin-view-container {
  background: #FDFBF7;
  min-height: 100vh;
  position: relative;
}

.admin-view-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.02;
  pointer-events: none;
  background-image: radial-gradient(#8E7355 1px, transparent 0), radial-gradient(#8E7355 1px, transparent 0);
  background-size: 24px 24px;
  background-position: 0 0, 12px 12px;
}

.gap-3 {
  gap: 12px;
}

section, .v-row {
  position: relative;
  z-index: 1;
}
</style>
