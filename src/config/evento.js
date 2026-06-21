// Configuración general del evento de Revelación de Sexo
export const EVENTO_CONFIG = {
  titulo: 'Baby Shower & Revelación de Sexo',
  padres: 'Mamá & Papá',
  // La fecha debe estar en un formato que Date pueda parsear
  // Usamos una fecha en el futuro (ej. 14 de Noviembre de 2026)
  fechaTarget: '2026-07-11T17:00:00-03:00', // Formato ISO con timezone
  fechaFormateada: 'Sábado 11 de Julio, 2026',
  horaFormateada: '17:00 Hs',
  lugarNombre: 'Residencia Familiar',
  lugarDireccion: 'Félix de Azara 2500, Itauguá, Paraguay',
  googleMapsUrl: 'https://maps.app.goo.gl/CQfwPmGS6myoR6UFA', // Enlace representativo
  contactoTelefono: '+595981810613',
  vestimentaPrompt: 'Color Blanco',
  galeriaPlaceholder: [
    { id: 1, title: 'Nuestra dulce espera', text: 'Un nuevo capítulo comienza y estamos felices de compartirlo.' },
    { id: 2, title: '¿Niño o Niña?', text: 'El misterio se revelará pronto. ¿Cuál es tu palpito?' },
    { id: 3, title: 'Compartiendo momentos', text: 'Esperando con ansias el gran día junto a nuestra familia y amigos.' }
  ]
}
