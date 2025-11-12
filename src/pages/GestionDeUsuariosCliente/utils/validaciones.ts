// Utilidades de validación para GestionDeUsuariosCliente
import { MENSAJES_VALIDACION, VALIDACIONES_CONFIG } from '../constants';
import type { FormularioUsuarioData } from '../types';

/**
 * Valida un email
 */
export const validarEmail = (email: string): string => {
  if (!email.trim()) {
    return MENSAJES_VALIDACION.EMAIL_REQUERIDO;
  }
  
  if (!VALIDACIONES_CONFIG.EMAIL_REGEX.test(email)) {
    return MENSAJES_VALIDACION.EMAIL_INVALIDO;
  }
  
  return '';
};

/**
 * Valida una contraseña
 */
export const validarPassword = (password: string, esEdicion: boolean = false): string => {
  // En edición, la contraseña es opcional
  if (esEdicion && !password.trim()) {
    return '';
  }
  
  if (!password.trim()) {
    return MENSAJES_VALIDACION.PASSWORD_REQUERIDO;
  }
  
  if (password.length < VALIDACIONES_CONFIG.PASSWORD_MIN_LENGTH) {
    return MENSAJES_VALIDACION.PASSWORD_MIN_LENGTH;
  }
  
  return '';
};

/**
 * Valida nombres
 */
export const validarNombres = (nombres: string): string => {
  if (!nombres.trim()) {
    return MENSAJES_VALIDACION.NOMBRES_REQUERIDO;
  }
  
  if (nombres.trim().length < VALIDACIONES_CONFIG.NOMBRES_MIN_LENGTH) {
    return MENSAJES_VALIDACION.NOMBRES_MIN_LENGTH;
  }
  
  return '';
};

/**
 * Valida apellidos
 */
export const validarApellidos = (apellidos: string): string => {
  if (!apellidos.trim()) {
    return MENSAJES_VALIDACION.APELLIDOS_REQUERIDO;
  }
  
  if (apellidos.trim().length < VALIDACIONES_CONFIG.APELLIDOS_MIN_LENGTH) {
    return MENSAJES_VALIDACION.APELLIDOS_MIN_LENGTH;
  }
  
  return '';
};

/**
 * Valida cédula
 */
export const validarCedula = (cedula: string): string => {
  if (!cedula.trim()) {
    return MENSAJES_VALIDACION.CEDULA_REQUERIDA;
  }
  
  // Solo números
  const cedulaLimpia = cedula.replace(/\D/g, '');
  
  if (cedulaLimpia.length < VALIDACIONES_CONFIG.CEDULA_MIN_LENGTH || 
      cedulaLimpia.length > VALIDACIONES_CONFIG.CEDULA_MAX_LENGTH) {
    return MENSAJES_VALIDACION.CEDULA_INVALIDA;
  }
  
  return '';
};

/**
 * Valida teléfono
 */
export const validarTelefono = (telefono: string): string => {
  if (!telefono.trim()) {
    return MENSAJES_VALIDACION.TELEFONO_REQUERIDO;
  }
  
  // Solo números
  const telefonoLimpio = telefono.replace(/\D/g, '');
  
  if (telefonoLimpio.length < VALIDACIONES_CONFIG.TELEFONO_MIN_LENGTH) {
    return MENSAJES_VALIDACION.TELEFONO_INVALIDO;
  }
  
  return '';
};

/**
 * Valida dirección
 */
export const validarDireccion = (direccion: string): string => {
  if (!direccion.trim()) {
    return MENSAJES_VALIDACION.DIRECCION_REQUERIDA;
  }
  
  if (direccion.trim().length < VALIDACIONES_CONFIG.DIRECCION_MIN_LENGTH) {
    return MENSAJES_VALIDACION.DIRECCION_MIN_LENGTH;
  }
  
  return '';
};

/**
 * Valida todo el formulario
 */
export const validarFormulario = (datos: FormularioUsuarioData, esEdicion: boolean = false): Record<string, string> => {
  const errores: Record<string, string> = {};
  
  // Validar cada campo
  const errorEmail = validarEmail(datos.email);
  if (errorEmail) errores.email = errorEmail;
  
  const errorPassword = validarPassword(datos.password, esEdicion);
  if (errorPassword) errores.password = errorPassword;
  
  const errorNombres = validarNombres(datos.nombres);
  if (errorNombres) errores.nombres = errorNombres;
  
  const errorApellidos = validarApellidos(datos.apellidos);
  if (errorApellidos) errores.apellidos = errorApellidos;
  
  const errorCedula = validarCedula(datos.cedula);
  if (errorCedula) errores.cedula = errorCedula;
  
  const errorTelefono = validarTelefono(datos.telefono);
  if (errorTelefono) errores.telefono = errorTelefono;
  
  const errorDireccion = validarDireccion(datos.direccion);
  if (errorDireccion) errores.direccion = errorDireccion;
  
  return errores;
};

/**
 * Verifica si el formulario tiene errores
 */
export const tieneErrores = (errores: Record<string, string>): boolean => {
  return Object.values(errores).some(error => error.length > 0);
};
