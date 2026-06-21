import { ref } from 'vue'
import { regalosService } from '../services/regalosService'

export function useRegalos() {
  const regalos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const cargarRegalos = async () => {
    loading.value = true
    error.value = null
    try {
      regalos.value = await regalosService.obtenerRegalosDisponibles()
    } catch (err) {
      error.value = err.message || 'Error desconocido al cargar los regalos.'
    } finally {
      loading.value = false
    }
  }

  return {
    regalos,
    loading,
    error,
    cargarRegalos
  }
}
