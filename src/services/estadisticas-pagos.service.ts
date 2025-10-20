import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ============================================================================
// INTERFACES
// ============================================================================

export interface EstadisticasPagos {
  totalPagos: number;
  montoTotalPagos: number;
  promedioMontoPago: number;
  pagosPorMetodo: {
    efectivo: number;
    transferencia: number;
    cheque: number;
    tarjeta?: number;
  };
  montosPorMetodo: {
    efectivo: number;
    transferencia: number;
    cheque: number;
    tarjeta?: number;
  };
}

// ============================================================================
// SERVICIO DE ESTADÍSTICAS DE PAGOS
// ============================================================================

class EstadisticasPagosService {
  /**
   * Obtener estadísticas generales de pagos
   * @param fechaDesde - Fecha desde (formato: YYYY-MM-DD)
   * @param fechaHasta - Fecha hasta (formato: YYYY-MM-DD)
   */
  async obtenerEstadisticas(fechaDesde?: string, fechaHasta?: string): Promise<EstadisticasPagos> {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Construir query params
      const params = new URLSearchParams();
      if (fechaDesde) params.append('fechaDesde', fechaDesde);
      if (fechaHasta) params.append('fechaHasta', fechaHasta);
      
      const url = `${API_URL}/pagos/consultas/estadisticas${params.toString() ? `?${params.toString()}` : ''}`;
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Estadísticas de pagos obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener estadísticas de pagos:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener estadísticas de pagos del mes actual
   */
  async obtenerEstadisticasMesActual(): Promise<EstadisticasPagos> {
    const now = new Date();
    const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1);
    const ultimoDiaMes = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const fechaDesde = primerDiaMes.toISOString().split('T')[0];
    const fechaHasta = ultimoDiaMes.toISOString().split('T')[0];
    
    return this.obtenerEstadisticas(fechaDesde, fechaHasta);
  }

  /**
   * Obtener estadísticas de pagos del año actual
   */
  async obtenerEstadisticasAnioActual(): Promise<EstadisticasPagos> {
    const now = new Date();
    const fechaDesde = `${now.getFullYear()}-01-01`;
    const fechaHasta = `${now.getFullYear()}-12-31`;
    
    return this.obtenerEstadisticas(fechaDesde, fechaHasta);
  }
}

export default new EstadisticasPagosService();
