/**
 * UTILIDADES: FORMATTERS
 * 
 * Funciones para formatear valores y obtener estilos
 * para los elementos del mapa.
 */

import { COLORES_MAPA } from '../../../types/mapa';

/**
 * Formatear precio en formato COP
 * @param precio - Precio a formatear
 * @returns String con formato de moneda colombiana
 */
export const formatearPrecio = (precio: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
};

/**
 * Obtener estilo del polígono según estado
 * @param estado - Estado del lote ('disponible', 'en_cuotas', 'vendido')
 * @returns Objeto con estilos para el polígono de Leaflet
 */
export const getEstiloPoligono = (estado: string) => {
  const color = COLORES_MAPA[estado as keyof typeof COLORES_MAPA] || '#6b7280';
  
  return {
    color: color,
    fillColor: color,
    fillOpacity: 0.3,
    weight: 3,
    opacity: 0.8
  };
};
