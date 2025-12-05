// Utilidades de formato para GestionDeUsuariosCliente
import type { Usuario } from '../types';

/**
 * Formatea el nombre completo de un usuario
 */
export const formatearNombreCompleto = (usuario: Usuario): string => {
  return `${usuario.nombres} ${usuario.apellidos}`.trim();
};

/**
 * Formatea la cédula con separadores
 */
export const formatearCedula = (cedula: string): string => {
  if (!cedula) return '';
  
  // Remover caracteres no numéricos
  const cedulaLimpia = cedula.replace(/\D/g, '');
  
  // Formatear con puntos cada 3 dígitos
  return cedulaLimpia.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Formatea el teléfono con formato colombiano
 */
export const formatearTelefono = (telefono: string): string => {
  if (!telefono) return '';
  
  // Remover caracteres no numéricos
  const telefonoLimpio = telefono.replace(/\D/g, '');
  
  // Formatear según longitud
  if (telefonoLimpio.length === 10) {
    // Celular: 300 123 4567
    return telefonoLimpio.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  } else if (telefonoLimpio.length === 7) {
    // Fijo: 123 4567
    return telefonoLimpio.replace(/(\d{3})(\d{4})/, '$1 $2');
  }
  
  return telefonoLimpio;
};

/**
 * Formatea el rol del usuario
 */
export const formatearRol = (roles: string[]): string => {
  if (!roles || roles.length === 0) return 'Sin rol';
  
  // Capitalizar primera letra
  const rolPrincipal = roles[0];
  return rolPrincipal.charAt(0).toUpperCase() + rolPrincipal.slice(1);
};

/**
 * Obtiene las iniciales del usuario para el avatar
 */
export const obtenerIniciales = (usuario: Usuario): string => {
  const inicialNombre = usuario.nombres.charAt(0).toUpperCase();
  const inicialApellido = usuario.apellidos.charAt(0).toUpperCase();
  return `${inicialNombre}${inicialApellido}`;
};

/**
 * Formatea el estado del usuario
 */
export const formatearEstado = (activo: boolean): string => {
  return activo ? 'Activo' : 'Inactivo';
};

/**
 * Obtiene la clase CSS para el badge del rol
 */
export const obtenerClaseRol = (roles: string[]): string => {
  if (!roles || roles.length === 0) return 'badge-secondary';
  
  const rolPrincipal = roles[0];
  switch (rolPrincipal) {
    case 'admin':
      return 'badge-warning';
    case 'cliente':
      return 'badge-primary';
    default:
      return 'badge-secondary';
  }
};

/**
 * Obtiene la clase CSS para el badge del estado
 */
export const obtenerClaseEstado = (activo: boolean): string => {
  return activo ? 'badge-success' : 'badge-danger';
};

/**
 * Limpia y formatea un input de cédula mientras se escribe
 */
export const formatearInputCedula = (valor: string): string => {
  // Solo permitir números
  const soloNumeros = valor.replace(/\D/g, '');
  
  // Limitar a 12 dígitos
  return soloNumeros.slice(0, 12);
};

/**
 * Limpia y formatea un input de teléfono mientras se escribe
 */
export const formatearInputTelefono = (valor: string): string => {
  // Solo permitir números
  const soloNumeros = valor.replace(/\D/g, '');
  
  // Limitar a 10 dígitos
  return soloNumeros.slice(0, 10);
};

/**
 * Capitaliza la primera letra de cada palabra
 */
export const capitalizarPalabras = (texto: string): string => {
  if (!texto) return '';
  
  return texto
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
};

/**
 * Trunca un texto si es muy largo
 */
export const truncarTexto = (texto: string, maxLength: number = 50): string => {
  if (!texto || texto.length <= maxLength) return texto;
  
  return texto.slice(0, maxLength) + '...';
};
