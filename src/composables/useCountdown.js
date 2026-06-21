import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useCountdown(targetDateStr) {
  const targetDate = new Date(targetDateStr)
  
  const dias = ref(0)
  const horas = ref(0)
  const minutos = ref(0)
  const segundos = ref(0)
  const finalizado = ref(false)
  
  let timerInterval = null

  const actualizarContador = () => {
    const ahora = new Date()
    const diferenciaMs = targetDate.getTime() - ahora.getTime()

    if (diferenciaMs <= 0) {
      dias.value = 0
      horas.value = 0
      minutos.value = 0
      segundos.value = 0
      finalizado.value = true
      if (timerInterval) clearInterval(timerInterval)
      return
    }

    const unSegundo = 1000
    const unMinuto = unSegundo * 60
    const unaHora = unMinuto * 60
    const unDia = unaHora * 24

    dias.value = Math.floor(diferenciaMs / unDia)
    horas.value = Math.floor((diferenciaMs % unDia) / unaHora)
    minutos.value = Math.floor((diferenciaMs % unaHora) / unMinuto)
    segundos.value = Math.floor((diferenciaMs % unMinuto) / unSegundo)
    finalizado.value = false
  }

  onMounted(() => {
    actualizarContador()
    timerInterval = setInterval(actualizarContador, 1000)
  })

  onUnmounted(() => {
    if (timerInterval) {
      clearInterval(timerInterval)
    }
  })

  return {
    dias,
    horas,
    minutos,
    segundos,
    finalizado
  }
}
