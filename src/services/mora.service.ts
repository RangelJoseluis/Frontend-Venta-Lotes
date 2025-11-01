/**
 * SERVICIO: MORA
 * 
 * Maneja todas las operaciones relacionadas con mora de cuotas
 */

import httpClient from './http.service';

export interface CuotaConMora {
  uid: string;
  venta: {
    uid: string;
    codigo: string;
    cliente: string;
    lote: string;
  };
  numeroCuota: number;
  valor: number;
  montoPagado: number;
  montoPendiente: number;
  fechaVencimiento: string;
  diasVencimiento: number;
  montoMora: number;
  montoMoraFormateado: string;
  tasaMoraAplicada: number;
  diasMora: number;
  fechaUltimoCalculoMora?: string;
  estado: string;
}

export interface EstadisticasMora {
  totalCuotasConMora: number;
  moraAcumuladaTotal: number;
  moraPendientePago: number;
  cuotasConMoraVigente: number;
  promedioMoraPorCuota: number;
}

export interface PreviewMoraResponse {
  cuota: {
    uid: string;
    numeroCuota: number;
    valor: number;
  };
  moraCalculada: number;
  tasaAplicada: number;
  diasMora: number;
  fechaCalculo: string;
  mensaje: string;
}

export interface CalcularMoraResponse {
  uid: string;
  montoMora: number;
  tasaMoraAplicada: number;
  diasMora: number;
  mensaje: string;
}

export interface CalcularMoraMasivaResponse {
  totalCuotas: number;
  cuotasActualizadas: number;
  cuotasOmitidas: number;
  moraAcumulada: number;
  mensaje: string;
}

/**
 * Servicio para gestión de mora
 */
class MoraService {
  private readonly BASE_URL = '/cuotas';

  /**
   * Obtener estadísticas de mora del sistema
   */
  async obtenerEstadisticas(): Promise<EstadisticasMora> {
    const response = await httpClient.get<EstadisticasMora>(
      `${this.BASE_URL}/estadisticas-mora`
    );
    return response.data;
  }

  /**
   * Preview de mora para una cuota (sin aplicar cambios)
   */
  async previewMora(cuotaUid: string): Promise<PreviewMoraResponse> {
    const response = await httpClient.get<PreviewMoraResponse>(
      `${this.BASE_URL}/${cuotaUid}/preview-mora`
    );
    return response.data;
  }

  /**
   * Calcular y aplicar mora a una cuota específica
   */
  async calcularMora(cuotaUid: string): Promise<CalcularMoraResponse> {
    const response = await httpClient.post<CalcularMoraResponse>(
      `${this.BASE_URL}/${cuotaUid}/calcular-mora`,
      {}
    );
    return response.data;
  }

  /**
   * Calcular mora masiva para todas las cuotas vencidas
   */
  async calcularMoraMasiva(): Promise<CalcularMoraMasivaResponse> {
    const response = await httpClient.post<CalcularMoraMasivaResponse>(
      `${this.BASE_URL}/calcular-mora-masivo`,
      {}
    );
    return response.data;
  }

  /**
   * Obtener cuotas con mora (filtradas)
   * Nota: Este endpoint aún no está implementado en el backend
   * Por ahora retornamos un array vacío
   */
  async obtenerCuotasConMora(): Promise<CuotaConMora[]> {
    // TODO: Implementar endpoint en backend para obtener cuotas con mora
    // Cuando se implemente, agregar parámetros de filtro opcionales
    console.warn('⚠️ Endpoint /cuotas/con-mora no implementado en backend');
    return [];
  }
}

// Exportar instancia singleton
export const moraService = new MoraService();
