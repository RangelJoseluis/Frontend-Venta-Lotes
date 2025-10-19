/**
 * SERVICIO DE PAGOS
 * 
 * Maneja todas las operaciones relacionadas con pagos de cuotas
 */

import httpClient from './http.service';
import API_CONFIG from '../config/api.config';
import type { CrearPagoDto, CrearPagoResponse, Pago, Cuota } from '../types';

/**
 * SERVICIO DE PAGOS
 */
export const pagosService = {
  /**
   * Crear un nuevo pago
   * Endpoint: POST /pagos
   * Requiere autenticación (admin)
   */
  async crear(pagoData: CrearPagoDto): Promise<CrearPagoResponse> {
    const response = await httpClient.post<CrearPagoResponse>(
      `${API_CONFIG.BASE_URL}/pagos`,
      pagoData
    );
    return response.data;
  },

  /**
   * Validar un pago sin crearlo
   * Endpoint: POST /pagos/validar
   * Requiere autenticación (admin)
   */
  async validar(pagoData: CrearPagoDto): Promise<{
    esValido: boolean;
    mensaje: string;
    excedente?: number;
    cuotaActual?: Cuota;
  }> {
    const response = await httpClient.post(
      `${API_CONFIG.BASE_URL}/pagos/validar`,
      pagoData
    );
    return response.data;
  },

  /**
   * Obtener pagos de una cuota
   * Endpoint: GET /pagos?cuotaUid=:uid
   * Requiere autenticación
   */
  async obtenerPorCuota(cuotaUid: string): Promise<Pago[]> {
    const response = await httpClient.get<Pago[]>(
      `${API_CONFIG.BASE_URL}/pagos?cuotaUid=${cuotaUid}`
    );
    return response.data;
  },

  /**
   * Obtener un pago por UID
   * Endpoint: GET /pagos/:uid
   * Requiere autenticación
   */
  async obtenerPorUid(uid: string): Promise<Pago> {
    const response = await httpClient.get<Pago>(
      `${API_CONFIG.BASE_URL}/pagos/${uid}`
    );
    return response.data;
  },

  /**
   * Obtener todos los pagos con filtros
   * Endpoint: GET /pagos
   * Requiere autenticación
   */
  async obtenerTodos(filtros?: {
    cuotaUid?: string;
    metodoPago?: string;
    fechaDesde?: string;
    fechaHasta?: string;
  }): Promise<Pago[]> {
    const params = new URLSearchParams();
    if (filtros?.cuotaUid) params.append('cuotaUid', filtros.cuotaUid);
    if (filtros?.metodoPago) params.append('metodoPago', filtros.metodoPago);
    if (filtros?.fechaDesde) params.append('fechaDesde', filtros.fechaDesde);
    if (filtros?.fechaHasta) params.append('fechaHasta', filtros.fechaHasta);

    const response = await httpClient.get<Pago[]>(
      `${API_CONFIG.BASE_URL}/pagos?${params.toString()}`
    );
    return response.data;
  },
};

export default pagosService;
