/**
 * SERVICIO DE LOTES
 * 
 * Maneja todas las operaciones relacionadas con lotes:
 * - Obtener estadísticas
 * - Listar lotes
 * - Obtener detalles de un lote
 */

import httpClient from './http.service';
import API_CONFIG from '../config/api.config';
import type { EstadisticasLotes, CrearLoteDto } from '../types';

/**
 * Respuesta del backend para estadísticas de lotes
 */
interface EstadisticasLotesBackend {
  totalDisponibles: number;
  totalEnCuotas: number;
  totalVendidos: number;
  total: number;
  precios: {
    minimo: number;
    maximo: number;
    promedio: number | null;
  };
  superficies: {
    minimo: number;
    maximo: number;
    promedio: number | null;
  };
  superficieTotal: number;
  valorTotal: number;
}

/**
 * SERVICIO DE LOTES
 */
export const lotesService = {
  /**
   * Obtener estadísticas de lotes
   * Endpoint: GET /lotes/estadisticas
   * Requiere autenticación (admin)
   */
  async getEstadisticas(): Promise<EstadisticasLotes> {
    const response = await httpClient.get<EstadisticasLotesBackend>(
      API_CONFIG.ENDPOINTS.LOTES_ESTADISTICAS
    );

    const data = response.data;

    // Mapear la respuesta del backend al formato del frontend
    // El backend calcula todos los valores, el frontend solo mapea
    
    return {
      totalLotes: data.total,
      disponibles: data.totalDisponibles,
      enCuotas: data.totalEnCuotas,
      vendidos: data.totalVendidos,
      superficieTotal: data.superficieTotal,
      valorTotal: data.valorTotal,
    };
  },

  /**
   * Crear un nuevo lote
   * Endpoint: POST /lotes
   * Requiere autenticación (admin)
   */
  async crear(loteData: CrearLoteDto): Promise<any> {
    const response = await httpClient.post('/lotes', loteData);
    return response.data;
  },

  /**
   * Obtener próximo código de lote disponible
   * Endpoint: GET /lotes/proximo-codigo
   * Requiere autenticación (admin)
   */
  async obtenerProximoCodigo(): Promise<string> {
    const response = await httpClient.get<{ codigo: string }>('/lotes/proximo-codigo');
    return response.data.codigo;
  },
};

export default lotesService;
