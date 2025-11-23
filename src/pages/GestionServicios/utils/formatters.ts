// Utilidades de formateo para Gestión de Servicios

/**
 * Formatear monto como moneda colombiana
 */
export const formatearMoneda = (monto: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(monto);
};

/**
 * Obtener nombre legible de categoría
 */
export const obtenerNombreCategoria = (categoria: string): string => {
    const categorias: Record<string, string> = {
        utilities: 'Utilities',
        comunicaciones: 'Comunicaciones',
        seguridad: 'Seguridad',
        transporte: 'Transporte',
        recreacion: 'Recreación',
        otros: 'Otros'
    };
    return categorias[categoria] || categoria;
};

/**
 * Obtener nombre legible de tipo
 */
export const obtenerNombreTipo = (tipo: string): string => {
    const tipos: Record<string, string> = {
        publico: 'Público',
        privado: 'Privado',
        opcional: 'Opcional',
        basico: 'Básico'
    };
    return tipos[tipo] || tipo;
};

/**
 * Obtener clase CSS para categoría
 */
export const obtenerClaseCategoria = (categoria: string): string => {
    const clases: Record<string, string> = {
        utilities: 'utilities',
        comunicaciones: 'comunicaciones',
        seguridad: 'seguridad',
        transporte: 'transporte',
        recreacion: 'recreacion',
        otros: 'otros'
    };
    return clases[categoria] || 'otros';
};

/**
 * Obtener clase CSS para tipo
 */
export const obtenerClaseTipo = (tipo: string): string => {
    const clases: Record<string, string> = {
        publico: 'publico',
        privado: 'privado',
        opcional: 'opcional',
        basico: 'basico'
    };
    return clases[tipo] || 'publico';
};

/**
 * Obtener clase CSS para estado
 */
export const obtenerClaseEstado = (estado: string): string => {
    const clases: Record<string, string> = {
        activo: 'activo',
        inactivo: 'inactivo'
    };
    return clases[estado] || 'activo';
};
