<template>
  <div class="login-view-container d-flex align-center justify-center py-12 px-4">
    <v-card class="login-card w-100 py-8 px-6" max-width="450" elevation="3">
      <!-- Botón de regreso a la invitación -->
      <div class="text-left mb-4">
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          color="primary"
          class="text-none font-weight-bold"
          to="/"
        >
          Volver a la invitación
        </v-btn>
      </div>

      <div class="text-center mb-6">
        <v-avatar color="accent" size="64" class="mb-4">
          <v-icon color="primary" size="32">mdi-lock-outline</v-icon>
        </v-avatar>
        <h3 class="text-h5 font-serif font-weight-bold text-textPrimary">
          Acceso Administrador
        </h3>
        <p class="text-caption text-textSecondary mt-1">
          Inicia sesión para gestionar los invitados y regalos.
        </p>
      </div>

      <!-- Alerta de no autorizado -->
      <v-alert
        v-if="isUnauthorized"
        type="warning"
        variant="tonal"
        class="mb-4 text-caption font-weight-medium"
      >
        Tu cuenta no cuenta con permisos de administrador o tu sesión ha expirado.
      </v-alert>

      <!-- Formulario -->
      <v-form @submit.prevent="handleLogin" class="text-left">
        <!-- Correo Electrónico -->
        <div class="mb-4">
          <label class="d-block text-subtitle-2 font-weight-bold text-textPrimary mb-1">
            Correo Electrónico
          </label>
          <v-text-field
            v-model="email"
            placeholder="juanperez@gmail.com"
            type="email"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            color="primary"
            bg-color="background"
            class="custom-input"
            required
          ></v-text-field>
        </div>

        <!-- Contraseña -->
        <div class="mb-6">
          <label class="d-block text-subtitle-2 font-weight-bold text-textPrimary mb-1">
            Contraseña
          </label>
          <v-text-field
            v-model="password"
            placeholder="••••••••"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            color="primary"
            bg-color="background"
            class="custom-input"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            required
          ></v-text-field>
        </div>

        <!-- Mensaje de Error de Auth -->
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          class="mb-4 font-weight-medium text-caption"
        >
          {{ error }}
        </v-alert>

        <!-- Botón de Entrar -->
        <v-btn
          type="submit"
          color="primary"
          size="large"
          rounded="xl"
          block
          :loading="loading"
          class="login-btn text-none font-weight-bold py-3 elevation-2"
        >
          Iniciar Sesión
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminAuth } from '../composables/useAdminAuth'

const route = useRoute()
const showPassword = ref(false)

const {
  email,
  password,
  loading,
  error,
  login
} = useAdminAuth()

const isUnauthorized = computed(() => route.query.unauthorized === 'true')

const handleLogin = async () => {
  await login()
}
</script>

<style scoped>
.login-view-container {
  background: #FDFBF7;
  min-height: 100vh;
  position: relative;
}

.login-view-container::before {
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

.login-card {
  border-radius: 24px !important;
  border: 1px solid rgba(142, 115, 85, 0.1) !important;
  background: #FAF6F0 !important;
  z-index: 1;
}

.text-primary {
  color: #8E7355 !important;
}

.custom-input :deep(.v-field) {
  border-radius: 12px !important;
  border-color: rgba(142, 115, 85, 0.2) !important;
}

.login-btn {
  background-color: #8E7355 !important;
  color: #FAF6F0 !important;
  letter-spacing: 0.5px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(142, 115, 85, 0.3) !important;
}
</style>
