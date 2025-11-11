// Constantes para la página de DetalleLote

export const COLORES_ESTADO = {
  disponible: '#10b981',  // Verde
  en_cuotas: '#f59e0b',   // Ámbar
  vendido: '#ef4444',     // Rojo
  reservado: '#3b82f6',   // Azul
} as const;

export const TEXTOS_ESTADO = {
  disponible: 'Disponible',
  en_cuotas: 'En Cuotas',
  vendido: 'Vendido',
  reservado: 'Reservado',
} as const;

export const CENTRO_MAPA_DEFAULT: [number, number] = [4.570868, -74.297333]; // Bogotá por defecto
export const ZOOM_DEFAULT = 15;
export const ZOOM_POLIGONO = 18;

export const MENSAJES = {
  CARGANDO: 'Cargando detalles del lote...',
  ERROR: 'Error al cargar el lote',
  NO_ENCONTRADO: 'Lote no encontrado',
  SIN_VENTA: 'No se encontró información de venta asociada a este lote.',
  SIN_CUOTAS: 'No hay cuotas registradas para esta venta.',
} as const;
