/**
 * UTILIDADES DE FORMATEO - REGISTRO DE PAGOS
 * 
 * Funciones para formatear valores (moneda, fechas, etc.)
 * 
 * NOTA IMPORTANTE:
 * El frontend trabaja SIEMPRE en PESOS (valores directos).
 * El backend se encarga automáticamente de la conversión a centavos (×100)
 * mediante transformers en los DTOs. NO se requieren conversiones manuales.
 */

/**
 * Formatea un número a formato de moneda colombiana
 * @param value Valor numérico en pesos (puede incluir decimales: .00, .50, .75)
 * @returns String formateado con símbolo de pesos y separadores de miles
 * @example formatCurrency(833333.75) → "$833.333,75"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formatea una fecha a formato legible colombiano
 * @param date Fecha (string o Date)
 * @returns String en formato dd/mm/aaaa
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('es-CO');
}


