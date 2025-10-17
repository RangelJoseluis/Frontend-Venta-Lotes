/**
 * SERVICIO DE MODELOS DE CASA
 * 
 * Maneja las peticiones HTTP relacionadas con los modelos de casa disponibles
 */

import httpClient from './http.service';

/**
 * Interfaz para un modelo de casa
 */
export interface ModeloCasa {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  superficieConstruida: number;
  numeroHabitaciones: number;
  numeroBanos: number;
  numeroPisos: number;
  tieneGaraje: boolean;
  capacidadGaraje?: number;
  tieneJardin: boolean;
  superficieJardin?: number;
  amueblado: boolean;
  imagenesUrls?: string;
  planoUrl?: string;
  estado: 'activo' | 'inactivo';
}

/**
 * SERVICIO DE MODELOS DE CASA
 */
export const modelosCasaService = {
  /**
   * Obtener modelos de casa activos
   * Endpoint: GET /modelos-casa/activos
   * No requiere autenticación
   */
  async obtenerActivos(): Promise<ModeloCasa[]> {
    const response = await httpClient.get<ModeloCasa[]>('/modelos-casa/activos');
    return response.data;
  },

  /**
   * Obtener modelo de casa por ID
   * Endpoint: GET /modelos-casa/:id
   * Requiere autenticación (admin)
   */
  async obtenerPorId(id: number): Promise<ModeloCasa> {
    const response = await httpClient.get<ModeloCasa>(`/modelos-casa/${id}`);
    return response.data;
  },
};

export default modelosCasaService;
