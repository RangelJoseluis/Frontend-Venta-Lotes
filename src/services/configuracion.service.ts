/**
 * SERVICIO: CONFIGURACIÓN DEL SISTEMA
 * Gestión de configuración global del negocio, mora y tickets
 */

import httpClient from './http.service';

/**
 * Configuración completa del sistema
 */
export interface ConfiguracionSistema {
  uid: string;
  // Datos del negocio
  nombreNegocio: string;
  direccionNegocio: string;
  telefonoNegocio: string;
  emailNegocio: string;
  
  // Configuración de mora
  moraHabilitada: boolean;
  tasaMoraDiaria: number;
  tasaMoraMensual: number;
  diasGracia: number;
  calculoMora: 'diario' | 'mensual';
  moraMaximaPorCuotaPorcentaje: number;
  tasaMoraMaximaLegal: number;
  
  // Configuración de tickets
  prefijoTicket: string;
  contadorTicket: number;
  mensajeFinalTicket: string;
  
  // Metadatos
  creadoEn: string;
  actualizadoEn: string;
}

/**
 * DTO para actualizar configuración
 */
export interface ActualizarConfiguracionDto {
  // Datos del negocio
  nombreNegocio?: string;
  direccionNegocio?: string;
  telefonoNegocio?: string;
  emailNegocio?: string;
  
  // Configuración de mora
  moraHabilitada?: boolean;
  tasaMoraDiaria?: number;
  tasaMoraMensual?: number;
  diasGracia?: number;
  calculoMora?: 'diario' | 'mensual';
  moraMaximaPorCuotaPorcentaje?: number;
  tasaMoraMaximaLegal?: number;
  
  // Configuración de tickets
  prefijoTicket?: string;
  mensajeFinalTicket?: string;
}

/**
 * Obtiene la configuración actual del sistema
 */
export const obtenerConfiguracion = async (): Promise<ConfiguracionSistema> => {
  const response = await httpClient.get<ConfiguracionSistema>('/configuracion');
  return response.data;
};

/**
 * Actualiza la configuración del sistema
 */
export const actualizarConfiguracion = async (
  datos: ActualizarConfiguracionDto
): Promise<ConfiguracionSistema> => {
  const response = await httpClient.put<ConfiguracionSistema>('/configuracion', datos);
  return response.data;
};

/**
 * Obtiene solo la configuración de mora
 */
export const obtenerConfiguracionMora = async (): Promise<Partial<ConfiguracionSistema>> => {
  const response = await httpClient.get('/configuracion/mora');
  return response.data;
};

/**
 * Obtiene solo la configuración de facturación
 */
export const obtenerConfiguracionFacturacion = async (): Promise<Partial<ConfiguracionSistema>> => {
  const response = await httpClient.get('/configuracion/facturacion');
  return response.data;
};

/**
 * Restaura la configuración a valores por defecto
 */
export const restaurarConfiguracionDefecto = async (): Promise<ConfiguracionSistema> => {
  const response = await httpClient.put<ConfiguracionSistema>('/configuracion/restaurar');
  return response.data;
};

const configuracionService = {
  obtenerConfiguracion,
  actualizarConfiguracion,
  obtenerConfiguracionMora,
  obtenerConfiguracionFacturacion,
  restaurarConfiguracionDefecto,
};

export default configuracionService;
