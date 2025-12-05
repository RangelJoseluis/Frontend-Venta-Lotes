// Constantes para GestionPagos

// Métodos de pago
export const METODOS_PAGO = {
    efectivo: 'Efectivo',
    transferencia: 'Transferencia',
    cheque: 'Cheque',
    tarjeta: 'Tarjeta'
} as const;

// Configuración de paginación
export const PAGINACION_CONFIG = {
    LIMITE_POR_PAGINA: 20,
    PAGINA_INICIAL: 1
};

// Mensajes de éxito
export const MENSAJES_EXITO = {
    TICKET_PREVISUALIZADO: '✅ Ticket previsualizado correctamente',
    TICKET_DESCARGADO: '✅ Ticket descargado correctamente'
};

// Mensajes de error
export const MENSAJES_ERROR = {
    CARGAR_PAGOS: 'Error al cargar pagos',
    PREVISUALIZAR_TICKET: 'Error al previsualizar ticket',
    DESCARGAR_TICKET: 'Error al descargar ticket',
    SESION_EXPIRADA: '🔒 Tu sesión ha expirado. Redirigiendo al login...',
    NO_AUTENTICADO: '⚠️ No estás autenticado. Por favor, inicia sesión primero.'
};

// Configuración de timeouts
export const TIMEOUTS = {
    MENSAJE_AUTO_HIDE: 5000, // 5 segundos
    REDIRECT_LOGIN: 2000     // 2 segundos
};

// Configuración de tabla
export const TABLA_CONFIG = {
    COLUMNAS: [
        'Fecha',
        'Venta',
        'Cuota',
        'Monto',
        'Método',
        'Referencia',
        'Acciones'
    ],
    NO_DATA_MESSAGE: 'No se encontraron pagos',
    LOADING_MESSAGE: 'Cargando pagos...'
};

// Configuración de búsqueda
export const BUSQUEDA_CONFIG = {
    PLACEHOLDER: 'Buscar por venta, cuota o referencia...',
    MIN_CHARS: 0,
    DEBOUNCE_MS: 300
};

// Clases CSS para badges de métodos de pago
export const CLASES_METODO_PAGO = {
    efectivo: 'efectivo',
    transferencia: 'transferencia',
    cheque: 'cheque',
    tarjeta: 'tarjeta'
} as const;
