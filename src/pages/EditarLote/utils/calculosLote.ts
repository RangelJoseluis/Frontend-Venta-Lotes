/**
 * UTILIDADES: CÁLCULOS DE LOTE
 * 
 * Funciones auxiliares para cálculos relacionados con lotes
 */

/**
 * Calcular superficie en m² a partir de ancho y largo
 */
export const calcularSuperficie = (anchoM: number, largoM: number): number => {
  if (!anchoM || !largoM || anchoM <= 0 || largoM <= 0) {
    return 0;
  }
  return Number((anchoM * largoM).toFixed(2));
};

/**
 * Validar que los valores de dimensiones sean positivos
 */
export const validarDimensiones = (anchoM: number, largoM: number): boolean => {
  return anchoM > 0 && largoM > 0;
};

/**
 * Formatear precio en formato COP
 */
export const formatearPrecio = (precio: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio);
};
