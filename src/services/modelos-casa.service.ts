/**
 * SERVICIO DE MODELOS DE CASA
 * 
 * Maneja las peticiones HTTP relacionadas con los modelos de casa disponibles.
 * Consume los endpoints corregidos que usan UID en lugar de ID.
 */

import httpClient from './http.service';
import type { ModeloCasa, CrearModeloCasaDto, ActualizarModeloCasaDto } from '../types';

/**
 * SERVICIO DE MODELOS DE CASA
 */
const modelosCasaService = {
  /**
   * Obtener todos los modelos de casa (Admin)
   * Endpoint: GET /modelos-casa
   * Requiere autenticación (admin)
   */
  async obtenerTodos(): Promise<ModeloCasa[]> {
    try {
      const response = await httpClient.get<ModeloCasa[]>('/modelos-casa');
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener modelos de casa:', error);
      throw error;
    }
  },

  /**
   * Obtener modelos de casa activos (Público)
   * Endpoint: GET /modelos-casa/activos
   * No requiere autenticación
   */
  async obtenerActivos(): Promise<ModeloCasa[]> {
    try {
      const response = await httpClient.get<ModeloCasa[]>('/modelos-casa/activos');
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener modelos activos:', error);
      throw error;
    }
  },

  /**
   * Obtener modelo de casa por UID (Admin)
   * Endpoint: GET /modelos-casa/:uid
   * Requiere autenticación (admin)
   */
  async obtenerPorUid(uid: string): Promise<ModeloCasa> {
    try {
      const response = await httpClient.get<ModeloCasa>(`/modelos-casa/${uid}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al obtener modelo ${uid}:`, error);
      throw error;
    }
  },

  /**
   * Crear nuevo modelo de casa (Admin)
   * Endpoint: POST /modelos-casa
   * Requiere autenticación (admin)
   */
  async crear(datos: CrearModeloCasaDto): Promise<ModeloCasa> {
    try {
      const response = await httpClient.post<ModeloCasa>('/modelos-casa', datos);
      return response.data;
    } catch (error) {
      console.error('❌ Error al crear modelo de casa:', error);
      throw error;
    }
  },

  /**
   * Actualizar modelo de casa por UID (Admin)
   * Endpoint: PATCH /modelos-casa/:uid
   * Requiere autenticación (admin)
   */
  async actualizar(uid: string, datos: ActualizarModeloCasaDto): Promise<ModeloCasa> {
    try {
      const response = await httpClient.patch<ModeloCasa>(`/modelos-casa/${uid}`, datos);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al actualizar modelo ${uid}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar modelo de casa por UID (Admin)
   * Endpoint: DELETE /modelos-casa/:uid
   * Requiere autenticación (admin)
   * NOTA: Es un soft delete, cambia el estado a "inactivo"
   */
  async eliminar(uid: string): Promise<{ mensaje: string }> {
    try {
      const response = await httpClient.delete<{ mensaje: string }>(`/modelos-casa/${uid}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al eliminar modelo ${uid}:`, error);
      throw error;
    }
  }
};

export default modelosCasaService;
