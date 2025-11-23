// Utilidades de formateo para Gestión de Mora

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
    return new Date(fecha).toLocaleDateString('es-CO');
};

/**
 * Formatear porcentaje
 */
export const formatPorcentaje = (valor: number, decimales: number = 3): string => {
    return `${valor.toFixed(decimales)}%`;
};
