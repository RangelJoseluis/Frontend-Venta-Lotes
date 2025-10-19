/**
 * SERVICIO DE CUOTAS
 * 
 * Maneja todas las operaciones relacionadas con cuotas de ventas
 */

import httpClient from './http.service';
import API_CONFIG from '../config/api.config';
import type { Cuota } from '../types';

/**
 * SERVICIO DE CUOTAS
 */
export const cuotasService = {
  /**
   * Obtener cuotas de una venta
   * Endpoint: GET /cuotas/venta/:ventaUid
   * Requiere autenticación
   */
  async obtenerPorVenta(ventaUid: string): Promise<Cuota[]> {
    console.log('🔍 Obteniendo cuotas para venta:', ventaUid);
    const response = await httpClient.get<Cuota[]>(
      `${API_CONFIG.BASE_URL}/cuotas/venta/${ventaUid}`
    );
    console.log('✅ Cuotas obtenidas:', response.data.length);
    return response.data;
  },

  /**
   * Obtener una cuota por UID
   * Endpoint: GET /cuotas/:uid
   * Requiere autenticación
   */
  async obtenerPorUid(uid: string): Promise<Cuota> {
    const response = await httpClient.get<Cuota>(
      `${API_CONFIG.BASE_URL}/cuotas/${uid}`
    );
    return response.data;
  },

  /**
   * Obtener cuotas pendientes de una venta
   * Filtra solo las cuotas que no están pagadas
   */
  async obtenerPendientesPorVenta(ventaUid: string): Promise<Cuota[]> {
    const cuotas = await this.obtenerPorVenta(ventaUid);
    return cuotas.filter(cuota => !cuota.estaPagada);
  },

  /**
   * Obtener cuotas vencidas de una venta
   * Filtra solo las cuotas vencidas y no pagadas
   */
  async obtenerVencidasPorVenta(ventaUid: string): Promise<Cuota[]> {
    const cuotas = await this.obtenerPorVenta(ventaUid);
    return cuotas.filter(cuota => cuota.estaVencida && !cuota.estaPagada);
  },
};

export default cuotasService;
