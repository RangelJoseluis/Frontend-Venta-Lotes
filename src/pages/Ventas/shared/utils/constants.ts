// ============================================================================
// CONSTANTES COMPARTIDAS DEL MÓDULO VENTAS
// ============================================================================

// Configuración de paginación
export const PAGINACION_CONFIG = {
  LIMITE_DEFAULT: 20,
  LIMITE_OPCIONES: [10, 20, 50, 100]
};

// Estados de venta disponibles
export const ESTADOS_VENTA = {
  ACTIVA: 'activa',
  PAGADA: 'pagada',
  CANCELADA: 'cancelada',
  EN_MORA: 'en_mora'
} as const;

// Modalidades de pago
export const MODALIDADES_PAGO = {
  CONTADO: 'contado',
  CUOTAS: 'cuotas'
} as const;

// Opciones de cuotas disponibles
export const OPCIONES_CUOTAS = [
  { value: 6, label: '6 cuotas' },
  { value: 12, label: '12 cuotas' },
  { value: 18, label: '18 cuotas' },
  { value: 24, label: '24 cuotas' },
  { value: 36, label: '36 cuotas' },
  { value: 48, label: '48 cuotas' }
];

// Mensajes de confirmación
export const MENSAJES = {
  CONFIRMAR_ELIMINAR: (codigo: string) => `¿Está seguro de eliminar la venta "${codigo}"?`,
  VENTA_ELIMINADA: 'Venta eliminada exitosamente',
  ERROR_CARGAR_VENTAS: 'Error al cargar ventas',
  ERROR_ELIMINAR_VENTA: 'Error al eliminar venta',
  ERROR_PREVISUALIZAR_FACTURA: 'Error al previsualizar factura',
  ERROR_DESCARGAR_FACTURA: 'Error al descargar factura'
};

// Placeholders para inputs
export const PLACEHOLDERS = {
  BUSCAR_VENTA: 'Buscar por lote o cliente...',
  OBSERVACIONES: 'Observaciones adicionales (opcional)...'
};

// Títulos de columnas para la tabla
export const COLUMNAS_TABLA = {
  LOTE: 'Lote',
  CLIENTE: 'Cliente',
  FECHA: 'Fecha',
  PRECIO_VENTA: 'Precio Venta',
  MODALIDAD: 'Modalidad',
  ESTADO: 'Estado',
  PENDIENTE: 'Pendiente',
  ACCIONES: 'Acciones'
};

// Configuración de validaciones
export const VALIDACIONES = {
  PRECIO_MIN: 1000000, // 1 millón mínimo
  PRECIO_MAX: 10000000000, // 10 mil millones máximo
  CUOTAS_MIN: 1,
  CUOTAS_MAX: 60,
  MONTO_INICIAL_MIN: 0
};
