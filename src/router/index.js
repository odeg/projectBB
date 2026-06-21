import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminView from '../views/AdminView.vue'
import { supabase } from '../services/supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  // Redirigir cualquier otra ruta a la página principal
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para proteger la ruta de administración
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!session) {
      next({ name: 'AdminLogin' })
    } else {
      // Verificar si el usuario realmente tiene rol de administrador en la base de datos
      const email = session.user?.email
      if (!email) {
        await supabase.auth.signOut()
        next({ name: 'AdminLogin' })
        return
      }

      // Verificamos si el email está en la tabla de admin_emails
      const { data, error } = await supabase
        .from('admin_emails')
        .select('email')
        .eq('email', email)
        .single()

      if (error || !data) {
        // No es admin, cerramos sesión y mandamos al login
        await supabase.auth.signOut()
        next({ name: 'AdminLogin', query: { unauthorized: 'true' } })
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (session) {
      // Si ya está autenticado, redirigir directo al admin
      next({ name: 'Admin' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
