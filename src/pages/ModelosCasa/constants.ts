// Constantes para ModelosCasa

// Estados de modelo de casa
export const ESTADOS_MODELO = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo',
} as const;

// Textos para estados
export const TEXTOS_ESTADO = {
  [ESTADOS_MODELO.ACTIVO]: 'Activo',
  [ESTADOS_MODELO.INACTIVO]: 'Inactivo',
} as const;

// Colores para estados
export const COLORES_ESTADO = {
  [ESTADOS_MODELO.ACTIVO]: '#10b981',
  [ESTADOS_MODELO.INACTIVO]: '#6b7280',
} as const;

// Valores por defecto para formulario
export const FORMULARIO_INICIAL = {
  nombre: '',
  descripcion: '',
  amueblado: false,
  metrosCubiertos: 0,
  ambientes: 1,
  banos: 1,
  pisos: 1,
  estado: ESTADOS_MODELO.ACTIVO,
  precioBase: 0,
  imagenUrl: '',
  observaciones: '',
} as const;

// Mensajes del sistema
export const MENSAJES = {
  CARGANDO: 'Cargando modelos de casa...',
  ERROR_CARGAR: 'Error al cargar modelos',
  ERROR_CREAR: 'No se pudo crear el modelo',
  ERROR_ACTUALIZAR: 'No se pudo actualizar el modelo',
  ERROR_ELIMINAR: 'No se pudo eliminar el modelo',
  CONFIRMAR_ELIMINAR: '¿Estás seguro de eliminar el modelo',
  SIN_MODELOS: 'No hay modelos de casa registrados',
  MODELO_CREADO: 'Modelo creado exitosamente',
  MODELO_ACTUALIZADO: 'Modelo actualizado exitosamente',
  MODELO_ELIMINADO: 'Modelo eliminado exitosamente',
} as const;

// Configuración de imágenes
export const CONFIG_IMAGENES = {
  PLACEHOLDER: '/placeholder-house.jpg',
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

// Límites de validación
export const LIMITES = {
  NOMBRE_MIN: 2,
  NOMBRE_MAX: 100,
  DESCRIPCION_MAX: 500,
  OBSERVACIONES_MAX: 500,
  METROS_MIN: 1,
  METROS_MAX: 10000,
  AMBIENTES_MIN: 1,
  AMBIENTES_MAX: 20,
  BANOS_MIN: 1,
  BANOS_MAX: 10,
  PISOS_MIN: 1,
  PISOS_MAX: 5,
  PRECIO_MIN: 1000,
  PRECIO_MAX: 10000000000,
} as const;
