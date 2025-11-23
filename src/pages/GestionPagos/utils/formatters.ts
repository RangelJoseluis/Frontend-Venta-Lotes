// Utilidades de formateo para GestionPagos
import { METODOS_PAGO, CLASES_METODO_PAGO } from '../constants';
import type { MetodoPago } from '../types';

/**
 * Formatear valor monetario a formato colombiano (COP)
 * @param valor - Valor numérico a formatear
 * @returns String formateado como moneda
 */
export const formatearMoneda = (valor: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);
};

/**
 * Formatear fecha a formato colombiano
 * @param fecha - String de fecha ISO
 * @returns String formateado como fecha local
 */
export const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString('es-CO');
};

/**
 * Obtener nombre legible del método de pago
 * @param metodo - Código del método de pago
 * @returns Nombre legible del método
 */
export const obtenerNombreMetodo = (metodo: string): string => {
    return METODOS_PAGO[metodo as MetodoPago] || metodo;
};

/**
 * Obtener clase CSS para el badge del método de pago
 * @param metodo - Código del método de pago
 * @returns Clase CSS para el badge
 */
export const obtenerClaseMetodo = (metodo: string): string => {
    return CLASES_METODO_PAGO[metodo as MetodoPago] || '';
};
