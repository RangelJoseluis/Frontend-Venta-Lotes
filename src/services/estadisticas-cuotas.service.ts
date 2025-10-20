import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ============================================================================
// INTERFACES
// ============================================================================

export interface EstadisticasCuotas {
  totalCuotas: number;
  cuotasPendientes: number;
  cuotasParciales: number;
  cuotasPagadas: number;
  cuotasVencidas: number;
  montoTotalCuotas: number;
  montoTotalPagado: number;
  montoTotalPendiente: number;
  porcentajeCobranza: number;
  promedioValorCuota: number;
  cuotasProximasAVencer: number;
}

export interface CuotaVencida {
  uid: string;
  ventaUid: string;
  numeroCuota: number;
  valor: number;
  montoPendiente: number;
  fechaVencimiento: string;
  diasVencimiento: number;
  cliente?: {
    nombres: string;
    apellidos: string;
  };
  lote?: {
    codigo: string;
  };
}

export interface CuotaProximaVencer {
  uid: string;
  ventaUid: string;
  numeroCuota: number;
  valor: number;
  montoPendiente: number;
  fechaVencimiento: string;
  diasVencimiento: number;
  cliente?: {
    nombres: string;
    apellidos: string;
  };
  lote?: {
    codigo: string;
  };
}

// ============================================================================
// SERVICIO DE ESTADÍSTICAS DE CUOTAS
// ============================================================================

class EstadisticasCuotasService {
  /**
   * Obtener estadísticas generales de cuotas
   */
  async obtenerEstadisticas(): Promise<EstadisticasCuotas> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/cuotas/consultas/estadisticas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Estadísticas de cuotas obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener estadísticas de cuotas:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener cuotas vencidas
   */
  async obtenerCuotasVencidas(): Promise<CuotaVencida[]> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/cuotas/consultas/vencidas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Cuotas vencidas obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener cuotas vencidas:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener cuotas próximas a vencer
   * @param dias - Número de días para considerar "próximo a vencer" (default: 7)
   */
  async obtenerCuotasProximasVencer(dias: number = 7): Promise<CuotaProximaVencer[]> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/cuotas/consultas/proximas-vencer?dias=${dias}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Cuotas próximas a vencer obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener cuotas próximas a vencer:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new EstadisticasCuotasService();
