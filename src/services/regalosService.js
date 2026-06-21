import { supabase } from './supabase'

export const regalosService = {
  /**
   * Obtiene la lista de regalos que están activos y tienen stock disponible (cantidad_disponible > 0)
   */
  async obtenerRegalosDisponibles() {
    const { data, error } = await supabase
      .from('productos_regalo')
      .select('id, nombre, descripcion, cantidad_total, cantidad_disponible')
      .eq('activo', true)
      .gt('cantidad_disponible', 0)
      .order('nombre', { ascending: true })

    if (error) {
      console.error('Error en regalosService.obtenerRegalosDisponibles:', error)
      throw new Error('No se pudieron cargar los regalos disponibles. Inténtalo de nuevo.')
    }
    return data
  }
}
