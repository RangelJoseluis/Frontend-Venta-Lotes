import httpClient from './http.service';
import API_CONFIG from '../config/api.config';

// ============================================================================
// INTERFACES
// ============================================================================

export interface EstadisticasVentas {
  totalVentas: number;
  ventasActivas: number;
  ventasCompletadas: number;
  ventasCanceladas: number;
  montoTotalVentas: number;
  montoPromedioPorVenta: number;
  ventasPorModalidad: {
    contado: number;
    cuotas: number;
  };
}

// ============================================================================
// SERVICIO DE ESTADÍSTICAS DE VENTAS
// ============================================================================

class EstadisticasVentasService {
  /**
   * Obtener estadísticas generales de ventas
   */
  async obtenerEstadisticas(): Promise<EstadisticasVentas> {
    try {
      const response = await httpClient.get(`${API_CONFIG.BASE_URL}/ventas/consultas/estadisticas`);
      console.log('✅ Estadísticas de ventas obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener estadísticas de ventas:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new EstadisticasVentasService();
