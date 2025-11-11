// Funciones de formato para DetalleLote

/**
 * Formatea un valor como moneda colombiana
 * @param precio - Valor numérico o string a formatear
 * @returns String formateado como moneda (ej: "$1.234.567")
 */
export const formatearPrecio = (precio: string | number): string => {
  const valor = typeof precio === 'string' ? parseFloat(precio) : precio;
  
  if (isNaN(valor)) return '$0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
};

/**
 * Formatea una fecha en formato legible
 * @param fecha - Fecha a formatear (string o Date)
 * @returns String formateado (ej: "15 Nov 2025")
 */
export const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Obtiene el color asociado a un estado de lote
 * @param estado - Estado del lote
 * @returns Color hexadecimal
 */
export const obtenerColorEstado = (estado: string): string => {
  const colores: Record<string, string> = {
    disponible: '#10b981',
    en_cuotas: '#f59e0b',
    vendido: '#ef4444',
    reservado: '#3b82f6',
  };
  return colores[estado] || '#6b7280';
};

/**
 * Obtiene el texto legible de un estado de lote
 * @param estado - Estado del lote
 * @returns Texto descriptivo
 */
export const obtenerTextoEstado = (estado: string): string => {
  const textos: Record<string, string> = {
    disponible: 'Disponible',
    en_cuotas: 'En Cuotas',
    vendido: 'Vendido',
    reservado: 'Reservado',
  };
  return textos[estado] || estado;
};
