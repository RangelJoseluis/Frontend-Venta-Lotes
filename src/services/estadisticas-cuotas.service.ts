import httpClient from './http.service';
import API_CONFIG from '../config/api.config';

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
      const response = await httpClient.get(`${API_CONFIG.BASE_URL}/cuotas/consultas/estadisticas`);
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
      const response = await httpClient.get(`${API_CONFIG.BASE_URL}/cuotas/consultas/vencidas`);
      console.log('✅ Cuotas vencidas obtenidas:', response.data);
      
      // DEBUG: Verificar datos de cada cuota
      response.data.forEach((cuota: any, index: number) => {
        console.log(`🔍 Cuota ${index + 1}:`);
        console.log('   - numeroCuota:', cuota.numeroCuota);
        console.log('   - cliente:', cuota.cliente);
        console.log('   - lote:', cuota.lote);
        console.log('   - Tiene cliente?', !!cuota.cliente);
        console.log('   - Tiene lote?', !!cuota.lote);
        if (cuota.cliente) {
          console.log('   - Cliente nombres:', cuota.cliente.nombres);
          console.log('   - Cliente apellidos:', cuota.cliente.apellidos);
        }
        if (cuota.lote) {
          console.log('   - Lote código:', cuota.lote.codigo);
        }
      });
      
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
      const response = await httpClient.get(`${API_CONFIG.BASE_URL}/cuotas/consultas/proximas-vencer?dias=${dias}`);
      console.log('✅ Cuotas próximas a vencer obtenidas:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener cuotas próximas a vencer:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new EstadisticasCuotasService();
