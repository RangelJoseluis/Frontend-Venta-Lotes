import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ============================================================================
// INTERFACES
// ============================================================================

export interface CambioEstadoLote {
  uid: string;
  codigoLote: string;
  estadoAnterior: string;
  estadoNuevo: string;
  motivo: string;
  usuarioEmail: string | null;
  observaciones: string | null;
  fechaCambio: string;
  descripcionCambio: string;
  requiereAprobacionEspecial: boolean;
  creadoEn: string;
}

// ============================================================================
// SERVICIO DE HISTORIAL DE LOTES
// ============================================================================

class LotesHistorialService {
  /**
   * Obtener historial de cambios de un lote específico
   * @param loteUid - UID del lote
   */
  async obtenerHistorialPorLote(loteUid: string): Promise<CambioEstadoLote[]> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/lotes/${loteUid}/historial`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Historial de lote obtenido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener historial de lote:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new LotesHistorialService();
