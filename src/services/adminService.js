import { supabase } from './supabase'

export const adminService = {
  /**
   * Obtiene la lista completa de invitados confirmados junto con el regalo seleccionado.
   * Requiere sesión de administrador autenticado según políticas RLS.
   */
  async obtenerInvitados() {
    const { data, error } = await supabase
      .from('invitados_revelacion')
      .select(`
        id,
        nombre,
        telefono,
        team,
        created_at,
        productos_regalo (
          id,
          nombre
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error en adminService.obtenerInvitados:', error)
      throw new Error('No se pudo cargar la lista de invitados.')
    }
    return data
  },

  /**
   * Obtiene todos los regalos para calcular estadísticas completas (con stock total y disponible).
   * Requiere sesión de administrador autenticado según políticas RLS.
   */
  async obtenerTodosLosRegalos() {
    const { data, error } = await supabase
      .from('productos_regalo')
      .select('*')
      .order('nombre', { ascending: true })

    if (error) {
      console.error('Error en adminService.obtenerTodosLosRegalos:', error)
      throw new Error('No se pudo cargar la lista de regalos.')
    }
    return data
  }
}
