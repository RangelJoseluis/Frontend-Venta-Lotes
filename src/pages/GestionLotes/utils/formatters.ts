// Utilidades de formateo para Gestión de Lotes

import { ESTADOS_LOTE, CLASES_ESTADO, COLORES_ESTADO } from '../constants';

/**
 * Formatear precio a formato colombiano (COP)
 */
export const formatearPrecio = (precio: string | number): string => {
    const numero = typeof precio === 'string' ? parseFloat(precio) : precio;
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(numero);
};

/**
 * Formatear fecha a formato colombiano
 */
export const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Formatear superficie con decimales
 */
export const formatearSuperficie = (superficie: string | number): string => {
    const numero = typeof superficie === 'string' ? parseFloat(superficie) : superficie;
    return `${numero.toFixed(2)} m²`;
};

/**
 * Obtener nombre legible del estado
 */
export const obtenerNombreEstado = (estado: string): string => {
    return ESTADOS_LOTE[estado as keyof typeof ESTADOS_LOTE] || estado;
};

/**
 * Obtener clase CSS del estado
 */
export const obtenerClaseEstado = (estado: string): string => {
    return CLASES_ESTADO[estado as keyof typeof CLASES_ESTADO] || '';
};

/**
 * Obtener color del estado
 */
export const obtenerColorEstado = (estado: string): string => {
    return COLORES_ESTADO[estado as keyof typeof COLORES_ESTADO] || '#6b7280';
};
