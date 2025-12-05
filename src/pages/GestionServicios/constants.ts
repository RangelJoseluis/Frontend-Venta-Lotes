// Constantes para Gestión de Servicios

// ============================================================================
// CATEGORÍAS DE SERVICIO
// ============================================================================

export const CATEGORIAS_SERVICIO = {
    utilities: 'Utilities',
    comunicaciones: 'Comunicaciones',
    seguridad: 'Seguridad',
    transporte: 'Transporte',
    recreacion: 'Recreación',
    otros: 'Otros'
} as const;

// ============================================================================
// TIPOS DE SERVICIO
// ============================================================================

export const TIPOS_SERVICIO = {
    publico: 'Público',
    privado: 'Privado',
    opcional: 'Opcional',
    basico: 'Básico'
} as const;

// ============================================================================
// ESTADOS DE SERVICIO
// ============================================================================

export const ESTADOS_SERVICIO = {
    activo: 'Activo',
    inactivo: 'Inactivo'
} as const;

// ============================================================================
// CLASES CSS PARA BADGES
// ============================================================================

export const CLASES_CATEGORIA = {
    utilities: 'utilities',
    comunicaciones: 'comunicaciones',
    seguridad: 'seguridad',
    transporte: 'transporte',
    recreacion: 'recreacion',
    otros: 'otros'
} as const;

export const CLASES_TIPO = {
    publico: 'publico',
    privado: 'privado',
    opcional: 'opcional',
    basico: 'basico'
} as const;

export const CLASES_ESTADO = {
    activo: 'activo',
    inactivo: 'inactivo'
} as const;

// ============================================================================
// MENSAJES DE ÉXITO
// ============================================================================

export const MENSAJES_EXITO = {
    SERVICIO_CREADO: '✅ Servicio creado exitosamente',
    SERVICIO_ACTUALIZADO: '✅ Servicio actualizado exitosamente',
    SERVICIO_ELIMINADO: '✅ Servicio eliminado exitosamente'
};

// ============================================================================
// MENSAJES DE ERROR
// ============================================================================

export const MENSAJES_ERROR = {
    CARGAR_SERVICIOS: 'Error al cargar servicios',
    CREAR_SERVICIO: 'Error al crear servicio',
    ACTUALIZAR_SERVICIO: 'Error al actualizar servicio',
    ELIMINAR_SERVICIO: 'Error al eliminar servicio',
    SESION_EXPIRADA: '🔒 Tu sesión ha expirado. Redirigiendo al login...',
    NO_AUTENTICADO: '⚠️ No estás autenticado. Por favor, inicia sesión primero.'
};

// ============================================================================
// CONFIGURACIÓN DE TIMEOUTS
// ============================================================================

export const TIMEOUTS = {
    MENSAJE_AUTO_HIDE: 5000, // 5 segundos
    REDIRECT_LOGIN: 2000     // 2 segundos
};

// ============================================================================
// CONFIGURACIÓN DE PAGINACIÓN
// ============================================================================

export const PAGINACION_CONFIG = {
    LIMITE_POR_PAGINA: 20,
    PAGINA_INICIAL: 1
};

// ============================================================================
// CONFIGURACIÓN DE TABLA
// ============================================================================

export const TABLA_CONFIG = {
    COLUMNAS: [
        'Servicio',
        'Categoría',
        'Tipo',
        'Costo',
        'Estado',
        'Acciones'
    ],
    NO_DATA_MESSAGE: 'No se encontraron servicios',
    LOADING_MESSAGE: 'Cargando servicios...'
};

// ============================================================================
// CONFIGURACIÓN DE BÚSQUEDA
// ============================================================================

export const BUSQUEDA_CONFIG = {
    PLACEHOLDER: 'Buscar por nombre o descripción...',
    MIN_CHARS: 0,
    DEBOUNCE_MS: 300
};
