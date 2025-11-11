// Funciones de formato para reportes

/**
 * Formatea un número como moneda colombiana
 * @param value - Valor numérico a formatear
 * @returns String formateado como moneda (ej: "$1.234.567")
 */
export const formatCurrency = (value: number): string => {
  if (value === 0) return '$0';
  if (!value) return '$0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formatea un número como porcentaje
 * @param value - Valor numérico (0-100)
 * @returns String formateado como porcentaje (ej: "45.67%")
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

/**
 * Formatea una fecha en formato legible
 * @param date - Fecha a formatear
 * @returns String formateado (ej: "15 Nov 2025")
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Formatea fecha y hora completa
 * @param date - Fecha a formatear
 * @returns String formateado (ej: "15 Nov 2025, 3:45 PM")
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
