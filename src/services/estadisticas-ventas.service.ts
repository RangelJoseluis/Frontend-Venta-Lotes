import axios from 'axios';

const API_URL = 'http://localhost:3000';

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
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/ventas/consultas/estadisticas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Estadísticas de ventas obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener estadísticas de ventas:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new EstadisticasVentasService();
