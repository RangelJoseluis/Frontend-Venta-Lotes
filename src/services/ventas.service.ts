/**
 * SERVICIO DE VENTAS
 * Maneja todas las operaciones relacionadas con ventas de lotes
 */

import httpClient from './http.service';
import API_CONFIG from '../config/api.config';
import type { CrearVentaDto, Venta, VentasResponse, VentaResumen } from '../types';

/**
 * Crear una nueva venta
 */
export const crearVenta = async (ventaData: CrearVentaDto): Promise<Venta> => {
  const response = await httpClient.post(API_CONFIG.ENDPOINTS.VENTAS, ventaData);
  return response.data;
};

/**
 * Obtener todas las ventas
 */
export const obtenerVentas = async (): Promise<Venta[]> => {
  const response = await httpClient.get(API_CONFIG.ENDPOINTS.VENTAS);
  return response.data;
};

/**
 * Obtener ventas con paginación
 * Endpoint: GET /ventas?pagina=1&limite=10
 */
export const obtenerVentasPaginadas = async (pagina: number = 1, limite: number = 10): Promise<VentasResponse> => {
  const response = await httpClient.get<VentasResponse>(
    `${API_CONFIG.ENDPOINTS.VENTAS}?pagina=${pagina}&limite=${limite}`
  );
  return response.data;
};

/**
 * Obtener una venta por UID
 */
export const obtenerVentaPorUid = async (uid: string): Promise<Venta> => {
  const response = await httpClient.get(`${API_CONFIG.ENDPOINTS.VENTAS}/${uid}`);
  return response.data;
};

/**
 * Obtener ventas por cliente (devuelve VentaResumen con montoPendiente)
 */
export const obtenerVentasPorCliente = async (usuarioUid: string): Promise<VentaResumen[]> => {
  const response = await httpClient.get(`${API_CONFIG.ENDPOINTS.VENTAS}/usuario/${usuarioUid}`);
  return response.data;
};

/**
 * Obtener ventas por lote
 */
export const obtenerVentasPorLote = async (loteUid: string): Promise<Venta[]> => {
  const response = await httpClient.get(`${API_CONFIG.ENDPOINTS.VENTAS}/lote/${loteUid}`);
  return response.data;
};

/**
 * Actualizar una venta
 * PUT /ventas/:uid
 */
export const actualizarVenta = async (uid: string, datos: any): Promise<Venta> => {
  const response = await httpClient.put(`${API_CONFIG.ENDPOINTS.VENTAS}/${uid}`, datos);
  return response.data;
};

/**
 * Eliminar una venta
 * DELETE /ventas/:uid
 */
export const eliminarVenta = async (uid: string): Promise<void> => {
  await httpClient.delete(`${API_CONFIG.ENDPOINTS.VENTAS}/${uid}`);
};

/**
 * Obtener estadísticas de ventas
 * GET /ventas/consultas/estadisticas
 */
export const obtenerEstadisticasVentas = async (): Promise<any> => {
  const response = await httpClient.get(`${API_CONFIG.ENDPOINTS.VENTAS}/consultas/estadisticas`);
  return response.data;
};
