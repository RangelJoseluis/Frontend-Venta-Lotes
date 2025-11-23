// Constantes para Gestión de Lotes

// ============================================================================
// ESTADOS DE LOTE
// ============================================================================

export const ESTADOS_LOTE = {
    disponible: 'Disponible',
    en_cuotas: 'En Cuotas',
    vendido: 'Vendido'
} as const;

// ============================================================================
// CLASES CSS
// ============================================================================

export const CLASES_ESTADO = {
    disponible: 'lote-estado-disponible',
    en_cuotas: 'lote-estado-cuotas',
    vendido: 'lote-estado-vendido'
} as const;

// ============================================================================
// COLORES
// ============================================================================

export const COLORES_ESTADO = {
    disponible: '#10b981',
    en_cuotas: '#f59e0b',
    vendido: '#ef4444'
} as const;

// ============================================================================
// MENSAJES
// ============================================================================

export const MENSAJES_EXITO = {
    ELIMINAR_LOTE: 'Lote eliminado exitosamente',
    CARGAR_LOTES: 'Lotes cargados correctamente'
} as const;

export const MENSAJES_ERROR = {
    CARGAR_LOTES: 'Error al cargar los lotes',
    ELIMINAR_LOTE: 'Error al eliminar el lote',
    SESION_EXPIRADA: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
    NO_AUTENTICADO: 'No estás autenticado'
} as const;

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

export const TABLA_CONFIG = {
    COLUMNAS: [
        'Código',
        'Ubicación',
        'Superficie',
        'Precio',
        'Estado',
        'Modelo Casa',
        'Actualizado',
        'Acciones'
    ]
} as const;

export const BUSQUEDA_CONFIG = {
    PLACEHOLDER: 'Buscar por código, dirección, manzana...',
    MIN_CARACTERES: 0
} as const;

export const TIMEOUTS = {
    MENSAJE_EXITO: 5000,
    MENSAJE_ERROR: 8000
} as const;
