// Constantes para Gestión de Mora

// ============================================================================
// MENSAJES
// ============================================================================

export const MENSAJES_ERROR = {
    CARGAR_DATOS: 'Error al cargar datos de mora',
    CALCULAR_MORA: 'Error al calcular mora masiva',
    SESION_EXPIRADA: 'Sesión expirada. Por favor, inicia sesión nuevamente.'
} as const;

export const MENSAJES_EXITO = {
    MORA_CALCULADA: 'Mora calculada exitosamente'
} as const;

// ============================================================================
// CONFIGURACIÓN DE TABLA
// ============================================================================

export const COLUMNAS_TABLA = [
    'Cliente',
    'Lote',
    'Cuota',
    'Vencimiento',
    'Días Mora',
    'Mora Acumulada',
    'Tasa Aplicada',
    'Estado',
    'Acciones'
] as const;

// ============================================================================
// TIPOS DE ESTADÍSTICAS
// ============================================================================

export const TIPOS_ESTADISTICA = {
    primary: 'primary',
    danger: 'danger',
    warning: 'warning',
    info: 'info'
} as const;

// ============================================================================
// TIMEOUTS
// ============================================================================

export const TIMEOUTS = {
    MENSAJE_EXITO: 5000,
    MENSAJE_ERROR: 8000
} as const;
