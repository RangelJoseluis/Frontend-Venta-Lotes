// ============================================================================
// UTILIDADES DE FORMATO PARA GESTIÓN DE VENTAS
// ============================================================================

/**
 * Formatear moneda en pesos colombianos
 */
export const formatearMoneda = (valor: number): string => {
  if (isNaN(valor) || valor === null || valor === undefined) {
    return '$ 0';
  }
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
};

/**
 * Formatear fecha en formato colombiano
 */
export const formatearFecha = (fecha: string | Date): string => {
  if (!fecha) return 'No disponible';
  
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  
  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }
  
  return fechaObj.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Formatear estado de venta
 */
export const formatearEstadoVenta = (estado: string): string => {
  const estados: Record<string, string> = {
    'activa': 'Activa',
    'pendiente': 'Pendiente',
    'cancelada': 'Cancelada',
    'completada': 'Completada'
  };
  
  return estados[estado] || estado;
};

/**
 * Formatear modalidad de pago
 */
export const formatearModalidadPago = (modalidad: string): string => {
  const modalidades: Record<string, string> = {
    'contado': 'Contado',
    'cuotas': 'Cuotas',
    'financiado': 'Financiado'
  };
  
  return modalidades[modalidad] || modalidad;
};

/**
 * Obtener color para el estado de venta
 */
export const obtenerColorEstado = (estado: string): string => {
  const colores: Record<string, string> = {
    'activa': '#10b981',      // Verde
    'pendiente': '#f59e0b',   // Amarillo
    'cancelada': '#ef4444',   // Rojo
    'completada': '#6366f1'   // Azul
  };
  
  return colores[estado] || '#6b7280'; // Gris por defecto
};
