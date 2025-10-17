/**
 * SERVICIO DE SERVICIOS
 * 
 * Maneja las peticiones HTTP relacionadas con los servicios disponibles
 * (agua, luz, gas, etc.)
 */

import httpClient from './http.service';

/**
 * Interfaz para un servicio
 */
export interface Servicio {
  id: number; // ID interno (para asociaciones en backend)
  uid: string; // UUID público (para APIs)
  nombre: string;
  descripcion?: string;
  tipo: 'publico' | 'privado' | 'opcional' | 'basico';
  categoria: 'utilities' | 'comunicaciones' | 'seguridad' | 'transporte' | 'recreacion' | 'otros';
  costoMensual?: number;
  esencial: boolean;
  activo: boolean;
}

/**
 * SERVICIO DE SERVICIOS
 */
export const serviciosService = {
  /**
   * Obtener servicios activos
   * Endpoint: GET /servicios/activos
   * No requiere autenticación
   */
  async obtenerActivos(): Promise<Servicio[]> {
    const response = await httpClient.get<Servicio[]>('/servicios/activos');
    return response.data;
  },

  /**
   * Obtener servicios esenciales
   * Endpoint: GET /servicios/esenciales
   * No requiere autenticación
   */
  async obtenerEsenciales(): Promise<Servicio[]> {
    const response = await httpClient.get<Servicio[]>('/servicios/esenciales');
    return response.data;
  },
};

export default serviciosService;
