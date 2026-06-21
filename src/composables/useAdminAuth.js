import { ref } from 'vue'
import { supabase } from '../services/supabase'
import { useRouter } from 'vue-router'

export function useAdminAuth() {
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)
  const router = useRouter()

  // Verificar estado actual al cargar
  const obtenerUsuarioActual = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user || null
    return user.value
  }

  const login = async () => {
    loading.value = true
    error.value = null
    try {
      // 1. Autenticar usando Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (authError) {
        throw new Error(authError.message === 'Invalid login credentials'
          ? 'Credenciales incorrectas. Verifica el correo y contraseña.'
          : authError.message)
      }

      const userEmail = (data.user?.email ?? '').trim()

      // const userEmail = data.user?.email
      // if (!userEmail) {
      //   await supabase.auth.signOut()
      //   throw new Error('No se pudo identificar tu dirección de correo.')
      // }

      // 2. Verificar si el correo está autorizado en admin_emails
      // const { data: adminData, error: dbError } = await supabase
      //   .from('admin_emails')
      //   .select('email')
      //   .eq('email', userEmail)
      //   .single()
      const { data: adminData, error: dbError } = await supabase
        .from('admin_emails')
        .select('email')
        .ilike('email', userEmail)
        .single()

      if (dbError || !adminData) {
        await supabase.auth.signOut()
        throw new Error('Este correo electrónico no está autorizado como administrador.')
      }

      user.value = data.user
      // Redirigir al panel
      router.push({ name: 'Admin' })
    } catch (err) {
      error.value = err.message || 'Error al iniciar sesión'
      console.error('Login error:', err)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await supabase.auth.signOut()
      user.value = null
      router.push({ name: 'AdminLogin' })
    } catch (err) {
      console.error('Error al cerrar sesión:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    loading,
    error,
    user,
    obtenerUsuarioActual,
    login,
    logout
  }
}
