// ============================================================================
// FORMATTERS COMPARTIDOS DEL MÓDULO VENTAS
// ============================================================================

/**
 * Formatea un valor numérico como moneda colombiana
 */
export const formatearMoneda = (valor: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor);
};

/**
 * Formatea una fecha en formato colombiano
 */
export const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-CO');
};

/**
 * Formatea una fecha con hora
 */
export const formatearFechaHora = (fecha: string): string => {
  return new Date(fecha).toLocaleString('es-CO');
};

/**
 * Formatea la modalidad de pago para mostrar
 */
export const formatearModalidadPago = (modalidad: string, cantidadCuotas?: number): string => {
  if (modalidad === 'contado') {
    return 'Contado';
  }
  return `${cantidadCuotas} Cuotas`;
};

/**
 * Formatea el estado de una venta
 */
export const formatearEstadoVenta = (estado: string): string => {
  const estados: Record<string, string> = {
    'activa': 'Activa',
    'pagada': 'Pagada',
    'cancelada': 'Cancelada',
    'en_mora': 'En Mora'
  };
  return estados[estado] || estado;
};

/**
 * Formatea el monto pendiente
 */
export const formatearMontoPendiente = (montoPendiente: number): string => {
  if (montoPendiente <= 0) {
    return 'Pagado';
  }
  return formatearMoneda(montoPendiente);
};

/**
 * Obtiene la clase CSS para el estado de una venta
 */
export const obtenerClaseEstado = (estado: string): string => {
  const clases: Record<string, string> = {
    'activa': 'badge-estado-activa',
    'pagada': 'badge-estado-pagada',
    'cancelada': 'badge-estado-cancelada',
    'en_mora': 'badge-estado-mora'
  };
  return clases[estado] || 'badge-estado-default';
};

/**
 * Obtiene la clase CSS para la modalidad de pago
 */
export const obtenerClaseModalidad = (modalidad: string): string => {
  return `badge-${modalidad}`;
};
