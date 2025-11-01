/**
 * SERVICIO: NOTIFICACIONES
 * 
 * Consume endpoints de notificaciones y alertas
 */

import httpClient from './http.service';

export interface Notificacion {
  uid: string;
  tipo: 'cuota_vencida' | 'cuota_proxima_vencer' | 'mora_acumulada' | 'pago_vencido';
  prioridad: 'urgente' | 'media' | 'baja';
  titulo: string;
  mensaje: string;
  cuotaUid: string;
  ventaUid: string;
  clienteNombre: string;
  loteCodigo: string;
  numeroCuota: number;
  montoTotal: number;
  montoPendiente: number;
  diasVencidos?: number;
  montoMora?: number;
  fechaCreacion: string;
  leida: boolean;
}

export interface ResumenNotificaciones {
  totalNoLeidas: number;
  urgentes: number;
  medias: number;
  bajas: number;
  cuotasVencidas: number;
  cuotasProximasVencer: number;
  moraAcumulada: number;
}

/**
 * Servicio de notificaciones
 */
class NotificacionesService {
  private readonly BASE_URL = '/notificaciones';

  /**
   * Obtener todas las notificaciones
   */
  async obtenerTodas(): Promise<Notificacion[]> {
    const response = await httpClient.get<Notificacion[]>(this.BASE_URL);
    return response.data;
  }

  /**
   * Obtener notificaciones urgentes
   */
  async obtenerUrgentes(): Promise<Notificacion[]> {
    const response = await httpClient.get<Notificacion[]>(`${this.BASE_URL}/urgentes`);
    return response.data;
  }

  /**
   * Obtener resumen de notificaciones
   */
  async obtenerResumen(): Promise<ResumenNotificaciones> {
    const response = await httpClient.get<ResumenNotificaciones>(`${this.BASE_URL}/resumen`);
    return response.data;
  }

  /**
   * Obtener notificaciones por tipo
   */
  async obtenerPorTipo(
    tipo: 'cuota_vencida' | 'cuota_proxima_vencer' | 'mora_acumulada'
  ): Promise<Notificacion[]> {
    const response = await httpClient.get<Notificacion[]>(
      `${this.BASE_URL}/por-tipo`,
      { params: { tipo } }
    );
    return response.data;
  }

  /**
   * Contar notificaciones no leídas
   */
  async contarNoLeidas(): Promise<number> {
    const response = await httpClient.get<{ noLeidas: number }>(
      `${this.BASE_URL}/contador`
    );
    return response.data.noLeidas;
  }
}

// Exportar instancia singleton
export const notificacionesService = new NotificacionesService();
