// Constantes para GestionDeUsuariosCliente
import type { FormularioUsuarioData } from './types';

// Estado inicial del formulario
export const FORMULARIO_INICIAL: FormularioUsuarioData = {
  email: '',
  password: '',
  nombres: '',
  apellidos: '',
  cedula: '',
  telefono: '',
  direccion: ''
};

// Mensajes de validación
export const MENSAJES_VALIDACION = {
  EMAIL_REQUERIDO: 'El email es requerido',
  EMAIL_INVALIDO: 'El email no tiene un formato válido',
  PASSWORD_REQUERIDO: 'La contraseña es requerida',
  PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 6 caracteres',
  NOMBRES_REQUERIDO: 'Los nombres son requeridos',
  NOMBRES_MIN_LENGTH: 'Los nombres deben tener al menos 2 caracteres',
  APELLIDOS_REQUERIDO: 'Los apellidos son requeridos',
  APELLIDOS_MIN_LENGTH: 'Los apellidos deben tener al menos 2 caracteres',
  CEDULA_REQUERIDA: 'La cédula es requerida',
  CEDULA_INVALIDA: 'La cédula debe tener entre 6 y 12 dígitos',
  TELEFONO_REQUERIDO: 'El teléfono es requerido',
  TELEFONO_INVALIDO: 'El teléfono debe tener al menos 7 dígitos',
  DIRECCION_REQUERIDA: 'La dirección es requerida',
  DIRECCION_MIN_LENGTH: 'La dirección debe tener al menos 10 caracteres'
};

// Mensajes de éxito
export const MENSAJES_EXITO = {
  USUARIO_CREADO: '✅ Usuario creado exitosamente',
  USUARIO_ACTUALIZADO: '✅ Usuario actualizado exitosamente',
  USUARIO_ELIMINADO: '✅ Usuario eliminado exitosamente'
};

// Mensajes de error
export const MENSAJES_ERROR = {
  CARGAR_USUARIOS: 'Error al cargar usuarios',
  CREAR_USUARIO: 'Error al crear usuario',
  ACTUALIZAR_USUARIO: 'Error al actualizar usuario',
  ELIMINAR_USUARIO: 'Error al eliminar usuario',
  SESION_EXPIRADA: '🔒 Tu sesión ha expirado. Redirigiendo al login...',
  NO_AUTENTICADO: '⚠️ No estás autenticado. Por favor, inicia sesión primero.'
};

// Configuración de timeouts
export const TIMEOUTS = {
  MENSAJE_AUTO_HIDE: 5000, // 5 segundos
  REDIRECT_LOGIN: 2000     // 2 segundos
};

// Roles de usuario
export const ROLES_USUARIO = {
  ADMIN: 'admin',
  CLIENTE: 'cliente'
} as const;

// Estados de usuario
export const ESTADOS_USUARIO = {
  ACTIVO: 'activo',
  INACTIVO: 'inactivo'
} as const;

// Configuración de tabla
export const TABLA_CONFIG = {
  COLUMNAS: [
    'Nombre Completo',
    'Email',
    'Cédula',
    'Teléfono',
    'Rol',
    'Estado',
    'Acciones'
  ],
  NO_DATA_MESSAGE: 'No hay usuarios registrados',
  NO_RESULTS_MESSAGE: 'No se encontraron usuarios'
};

// Configuración de búsqueda
export const BUSQUEDA_CONFIG = {
  PLACEHOLDER: 'Buscar por nombre, email o cédula...',
  MIN_CHARS: 0,
  DEBOUNCE_MS: 300
};

// Configuración de validaciones
export const VALIDACIONES_CONFIG = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CEDULA_MIN_LENGTH: 6,
  CEDULA_MAX_LENGTH: 12,
  TELEFONO_MIN_LENGTH: 7,
  PASSWORD_MIN_LENGTH: 6,
  NOMBRES_MIN_LENGTH: 2,
  APELLIDOS_MIN_LENGTH: 2,
  DIRECCION_MIN_LENGTH: 10
};
