<template>
  <v-card class="table-card pa-4" elevation="2">
    <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between mb-4 gap-4">
      <h3 class="text-h6 font-serif font-weight-bold text-textPrimary">
        Lista de Invitados Confirmados
      </h3>
      <!-- Buscador -->
      <v-text-field
        v-model="search"
        placeholder="Buscar por nombre, teléfono o regalo..."
        variant="outlined"
        density="compact"
        hide-details
        prepend-inner-icon="mdi-magnify"
        clearable
        color="primary"
        class="search-input"
        bg-color="background"
      ></v-text-field>
    </div>

    <!-- Tabla Responsiva -->
    <v-table class="guests-table" hover>
      <thead>
        <tr>
          <th class="text-left font-weight-bold">Nombre</th>
          <th class="text-left font-weight-bold">Palpito</th>
          <th class="text-left font-weight-bold">Regalo Elegido</th>
          <th class="text-left font-weight-bold">Teléfono</th>
          <th class="text-left font-weight-bold">Fecha Confirmación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredInvitados.length === 0">
          <td colspan="5" class="text-center py-6 text-textSecondary font-italic">
            No se encontraron invitados confirmados.
          </td>
        </tr>
        <tr v-for="invitado in paginatedInvitados" :key="invitado.id">
          <td class="font-weight-bold text-textPrimary">{{ invitado.nombre }}</td>
          <td>
            <v-chip
              size="small"
              :color="invitado.team === 'nino' ? 'ninoDark' : 'ninaDark'"
              variant="tonal"
              class="font-weight-bold"
            >
              <v-icon size="14" class="mr-1">
                {{ invitado.team === 'nino' ? 'mdi-gender-male' : 'mdi-gender-female' }}
              </v-icon>
              {{ invitado.team === 'nino' ? 'Niño' : 'Niña' }}
            </v-chip>
          </td>
          <td class="text-truncate" style="max-width: 200px;">
            <div v-if="invitado.productos_regalo">
              <v-icon size="16" color="primary" class="mr-1">mdi-gift</v-icon>
              <span class="text-body-2 font-weight-medium text-textPrimary">
                {{ invitado.productos_regalo.nombre }}
              </span>
            </div>
            <span v-else class="text-caption text-textSecondary font-italic">Ninguno</span>
          </td>
          <td>
            <span v-if="invitado.telefono" class="text-body-2 text-textPrimary">
              {{ invitado.telefono }}
            </span>
            <span v-else class="text-caption text-textSecondary font-italic">Sin teléfono</span>
          </td>
          <td class="text-caption text-textSecondary">
            {{ formatFecha(invitado.created_at) }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Paginación Simple -->
    <div v-if="filteredInvitados.length > itemsPerPage" class="d-flex align-center justify-end mt-4 gap-2">
      <span class="text-caption text-textSecondary mr-4">
        Mostrando {{ startIndex + 1 }}-{{ endIndex }} de {{ filteredInvitados.length }}
      </span>
      <v-btn
        icon="mdi-chevron-left"
        variant="text"
        density="comfortable"
        color="primary"
        :disabled="currentPage === 1"
        @click="currentPage--"
      ></v-btn>
      <v-btn
        icon="mdi-chevron-right"
        variant="text"
        density="comfortable"
        color="primary"
        :disabled="currentPage >= totalPages"
        @click="currentPage++"
      ></v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  invitados: {
    type: Array,
    default: () => []
  }
})

const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 8

// Resetear página al buscar
watch(search, () => {
  currentPage.value = 1
})

const filteredInvitados = computed(() => {
  if (!search.value) return props.invitados

  const query = search.value.toLowerCase().trim()
  return props.invitados.filter(inv => {
    const matchNombre = inv.nombre.toLowerCase().includes(query)
    const matchTelefono = inv.telefono ? inv.telefono.toLowerCase().includes(query) : false
    const matchRegalo = inv.productos_regalo ? inv.productos_regalo.nombre.toLowerCase().includes(query) : false
    return matchNombre || matchTelefono || matchRegalo
  })
})

const totalPages = computed(() => Math.ceil(filteredInvitados.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredInvitados.value.length))

const paginatedInvitados = computed(() => {
  return filteredInvitados.value.slice(startIndex.value, startIndex.value + itemsPerPage)
})

const formatFecha = (isoString) => {
  if (!isoString) return ''
  const fecha = new Date(isoString)
  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.table-card {
  border-radius: 20px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
}

.search-input {
  max-width: 350px;
}

.guests-table {
  background: transparent !important;
}

.guests-table :deep(th) {
  background-color: rgba(142, 115, 85, 0.05) !important;
  color: #4A3B32 !important;
  border-bottom: 2px solid rgba(142, 115, 85, 0.15) !important;
}

.guests-table :deep(td) {
  border-bottom: 1px solid rgba(142, 115, 85, 0.08) !important;
  color: #7A6B62;
}

.text-ninoDark {
  color: #3A86C8 !important;
}

.text-ninaDark {
  color: #D87093 !important;
}

.gap-4 {
  gap: 16px;
}

.gap-2 {
  gap: 8px;
}
</style>
