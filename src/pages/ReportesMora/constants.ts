// Constantes para Reportes de Mora

// ============================================================================
// TIPOS DE REPORTE
// ============================================================================

export const TIPOS_REPORTE = {
    cliente: 'Por Cliente',
    periodo: 'Por Período',
    detallado: 'Detallado',
    top: 'Top 10'
} as const;

// ============================================================================
// MENSAJES
// ============================================================================

export const MENSAJES_ERROR = {
    CARGAR_REPORTE: 'Error al cargar el reporte',
    EXPORTAR_REPORTE: 'Error al exportar el reporte',
    SESION_EXPIRADA: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
    NO_DATOS: 'No hay datos disponibles para exportar'
} as const;

export const MENSAJES_EXITO = {
    EXPORTAR_REPORTE: 'Reporte exportado exitosamente',
    ACTUALIZAR_REPORTE: 'Reporte actualizado correctamente'
} as const;

// ============================================================================
// CONFIGURACIÓN DE TABLAS
// ============================================================================

export const COLUMNAS_CLIENTE = [
    'Cliente',
    'Documento',
    'Cuotas con Mora',
    'Mora Acumulada',
    'Mora Pendiente',
    'Días Promedio'
] as const;

export const COLUMNAS_PERIODO = [
    'Período',
    'Cuotas Vencidas',
    'Con Mora',
    'Mora Generada',
    'Mora Pagada',
    'Efectividad'
] as const;

export const COLUMNAS_DETALLADO = [
    'Cliente',
    'Lote',
    'Cuota',
    'Vencimiento',
    'Días Mora',
    'Mora Acumulada',
    'Mora Pagada',
    'Mora Pendiente',
    'Tasa'
] as const;

export const COLUMNAS_TOP = [
    '#',
    'Cliente',
    'Documento',
    'Cuotas',
    'Mora Pendiente',
    'Días Promedio'
] as const;

// ============================================================================
// CONFIGURACIÓN DE FECHAS
// ============================================================================

export const FECHA_CONFIG = {
    MESES_ATRAS_DEFAULT: 6,
    FORMATO_DISPLAY: 'es-CO'
} as const;

// ============================================================================
// TIMEOUTS
// ============================================================================

export const TIMEOUTS = {
    MENSAJE_EXITO: 5000,
    MENSAJE_ERROR: 8000
} as const;
