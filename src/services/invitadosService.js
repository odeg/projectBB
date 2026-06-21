import { supabase } from './supabase'

export const invitadosService = {
  /**
   * Confirma la asistencia de un invitado llamando a la función RPC segura de Supabase.
   * Esto descuenta automáticamente el stock y registra al invitado de forma atómica.
   * 
   * @param {Object} datos
   * @param {string} datos.nombre - Nombre del invitado
   * @param {string} [datos.telefono] - Teléfono (opcional)
   * @param {string} datos.team - Equipo ('nino' o 'nina')
   * @param {number|null} datos.productoId - ID del regalo seleccionado (puede ser null)
   */
  async confirmarAsistencia({ nombre, telefono, team, productoId }) {
    const { data, error } = await supabase.rpc('confirmar_invitado', {
      p_nombre: nombre,
      p_telefono: telefono || null,
      p_team: team,
      p_producto_id: productoId || null
    })

    if (error) {
      console.error('Error al ejecutar RPC confirmar_invitado:', error)
      throw new Error(error.message || 'Error de red o comunicación con el servidor.')
    }

    // La función RPC retorna un JSONB con la forma { success: boolean, message: string }
    if (data && !data.success) {
      throw new Error(data.message || 'No se pudo completar el registro.')
    }

    return data
  }
}
