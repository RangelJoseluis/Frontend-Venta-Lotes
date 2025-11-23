// Utilidades de formateo para Reportes de Mora

import { FECHA_CONFIG } from '../constants';

/**
 * Formatear moneda a formato colombiano (COP)
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Formatear fecha a formato colombiano
 */
export const formatFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString(FECHA_CONFIG.FORMATO_DISPLAY);
};

/**
 * Formatear porcentaje
 */
export const formatPorcentaje = (valor: number, decimales: number = 1): string => {
    return `${valor.toFixed(decimales)}%`;
};

/**
 * Redondear días
 */
export const redondearDias = (dias: number): number => {
    return Math.round(dias);
};

/**
 * Obtener fecha hace N meses
 */
export const obtenerFechaHaceMeses = (meses: number): string => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - meses);
    return fecha.toISOString().split('T')[0];
};

/**
 * Obtener fecha actual en formato ISO
 */
export const obtenerFechaActual = (): string => {
    return new Date().toISOString().split('T')[0];
};
