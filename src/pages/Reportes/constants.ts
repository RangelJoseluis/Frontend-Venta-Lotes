// Constantes para la página de Reportes

export const TABS = {
  ESTADISTICAS: 'estadisticas',
  HISTORIAL: 'historial',
  COBRANZA: 'cobranza',
  ALERTAS: 'alertas',
} as const;

export const COLORES_GRAFICO = {
  DISPONIBLE: '#10b981', // Verde
  EN_CUOTAS: '#f59e0b',  // Ámbar
  VENDIDO: '#ef4444',    // Rojo
  EFECTIVO: '#3b82f6',   // Azul
  TRANSFERENCIA: '#8b5cf6', // Violeta
  CHEQUE: '#ec4899',     // Rosa
  TARJETA: '#14b8a6',    // Teal
};

export const METODOS_PAGO = [
  'efectivo',
  'transferencia',
  'cheque',
  'tarjeta',
] as const;

export const MENSAJES = {
  CARGANDO: 'Cargando reportes...',
  ERROR_CARGA: 'Error al cargar los datos',
  SIN_DATOS: 'No hay datos disponibles',
  SIN_HISTORIAL: 'No hay cambios de estado registrados',
  SIN_CUOTAS_VENCIDAS: 'No hay cuotas vencidas',
  SIN_CUOTAS_PROXIMAS: 'No hay cuotas que venzan en los próximos 7 días',
} as const;
