import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Iconos de Material Design
import '@mdi/font/css/materialdesignicons.css'

// Tema personalizado: elegante, cálido, familiar
const babyRevealTheme = {
  dark: false,
  colors: {
    background: '#FDFBF7', // Crema muy claro / blanco cálido
    surface: '#FAF6F0',    // Crema suave para tarjetas
    primary: '#8E7355',    // Marrón suave elegante
    secondary: '#D5BDAF',  // Beige/marrón claro para botones/bordes
    accent: '#E3D5CA',     // Color crema/café con leche suave
    nino: '#B9E2EC',       // Celeste muy suave para Team Niño
    nina: '#F8C8DC',       // Rosado muy suave para Team Niña
    ninoDark: '#3A86C8',   // Celeste/Azul para botones y texto de niño
    ninaDark: '#D87093',   // Rosado oscuro para botones y texto de niña
    textPrimary: '#4A3B32', // Marrón oscuro para textos legibles
    textSecondary: '#7A6B62', // Marrón medio para subtítulos
    success: '#6D8C74',    // Verde seco suave
    error: '#D32F2F',      // Rojo suave para alertas
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'babyRevealTheme',
    themes: {
      babyRevealTheme,
    }
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
