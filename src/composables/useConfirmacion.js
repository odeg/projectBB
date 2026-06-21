import { ref } from 'vue'
import { invitadosService } from '../services/invitadosService'

export function useConfirmacion() {
  const nombre = ref('')
  const telefono = ref('')
  const team = ref(null) // 'nino' o 'nina'
  const productoId = ref(null) // ID del regalo seleccionado (OBLIGATORIO)

  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)
  const message = ref('')

  const validarFormulario = () => {
    error.value = null

    if (!nombre.value || nombre.value.trim().length < 2) {
      error.value = 'Por favor, escribí tu nombre completo (mínimo 2 letras).'
      return false
    }
    if (!team.value) {
      error.value = '¿Cuál es tu palpito? Elegí Team Niño o Team Niña para continuar.'
      return false
    }
    if (!productoId.value) {
      error.value = 'Seleccionar un regalo es obligatorio para confirmar tu asistencia. ¡Hay muchas opciones!'
      return false
    }
    return true
  }

  const enviarConfirmacion = async () => {
    error.value = null
    success.value = false
    message.value = ''

    if (!validarFormulario()) return false

    loading.value = true
    try {
      const response = await invitadosService.confirmarAsistencia({
        nombre: nombre.value,
        telefono: telefono.value,
        team: team.value,
        productoId: productoId.value
      })

      success.value = true
      message.value = response.message || '¡Gracias por confirmar tu asistencia!'

      // Persistir en localStorage para recordar al usuario que ya confirmó
      try {
        localStorage.setItem('asistencia_confirmada', 'true')
        localStorage.setItem('asistencia_nombre', nombre.value.trim())
        localStorage.setItem('asistencia_team', team.value)
      } catch (e) {
        // Si el localStorage falla (modo privado extremo), no es crítico
        console.warn('No se pudo guardar en localStorage:', e)
      }

      // Limpiar formulario tras éxito
      nombre.value = ''
      telefono.value = ''
      team.value = null
      productoId.value = null

      return true
    } catch (err) {
      error.value = err.message || 'Ocurrió un error inesperado al procesar la confirmación.'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    nombre,
    telefono,
    team,
    productoId,
    loading,
    error,
    success,
    message,
    enviarConfirmacion
  }
}
