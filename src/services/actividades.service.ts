import httpClient from './http.service';
import type { ActividadReciente } from '../types';

/**
 * SERVICIO DE ACTIVIDADES RECIENTES
 * 
 * Maneja las peticiones HTTP relacionadas con actividades recientes del sistema.
 * Consume el endpoint GET /actividades/recientes del backend.
 */

/**
 * Obtener actividades recientes del sistema
 * 
 * @param limite - Número máximo de actividades a obtener (default: 10)
 * @returns Promise con array de actividades ordenadas por fecha (más reciente primero)
 * 
 * REQUIERE: Token JWT con rol 'admin'
 */
export const obtenerActividadesRecientes = async (limite: number = 10): Promise<ActividadReciente[]> => {
  try {
    const response = await httpClient.get<ActividadReciente[]>(
      `/actividades/recientes?limite=${limite}`
    );
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener actividades recientes:', error);
    throw error;
  }
};

/**
 * Servicio de actividades (objeto exportado)
 */
const actividadesService = {
  obtenerActividadesRecientes
};

export default actividadesService;
