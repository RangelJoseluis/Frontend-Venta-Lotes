/**
 * SERVICIO DE SERVICIOS - CRUD COMPLETO
 * 
 * Maneja las peticiones HTTP relacionadas con los servicios disponibles
 * (agua, luz, gas, etc.)
 */

import httpClient from './http.service';
import type { 
  Servicio, 
  CrearServicioDto, 
  ActualizarServicioDto,
  EstadisticasServicios 
} from '../types';

class ServiciosService {
  // ========================================
  // ENDPOINTS PÚBLICOS
  // ========================================

  /**
   * Obtener servicios activos
   * GET /servicios/activos
   */
  async obtenerActivos(): Promise<Servicio[]> {
    const response = await httpClient.get<Servicio[]>('/servicios/activos');
    return response.data;
  }

  /**
   * Obtener servicios esenciales
   * GET /servicios/esenciales
   */
  async obtenerEsenciales(): Promise<Servicio[]> {
    const response = await httpClient.get<Servicio[]>('/servicios/esenciales');
    return response.data;
  }

  // ========================================
  // CRUD COMPLETO (requiere admin)
  // ========================================

  /**
   * Obtener todos los servicios con filtros
   * GET /servicios
   */
  async obtenerTodos(filtros?: { estado?: string; categoria?: string }): Promise<Servicio[]> {
    const params = new URLSearchParams();
    if (filtros?.estado) params.append('estado', filtros.estado);
    if (filtros?.categoria) params.append('categoria', filtros.categoria);
    
    const response = await httpClient.get<Servicio[]>(`/servicios?${params.toString()}`);
    return response.data;
  }

  /**
   * Obtener servicio por UID
   * GET /servicios/:uid
   */
  async obtenerPorUid(uid: string): Promise<Servicio> {
    const response = await httpClient.get<Servicio>(`/servicios/${uid}`);
    return response.data;
  }

  /**
   * Crear nuevo servicio
   * POST /servicios
   */
  async crear(datos: CrearServicioDto): Promise<Servicio> {
    const response = await httpClient.post<Servicio>('/servicios', datos);
    return response.data;
  }

  /**
   * Actualizar servicio
   * PUT /servicios/:uid
   */
  async actualizar(uid: string, datos: ActualizarServicioDto): Promise<Servicio> {
    const response = await httpClient.put<Servicio>(`/servicios/${uid}`, datos);
    return response.data;
  }

  /**
   * Eliminar servicio
   * DELETE /servicios/:uid
   */
  async eliminar(uid: string): Promise<void> {
    await httpClient.delete(`/servicios/${uid}`);
  }

  /**
   * Cambiar estado del servicio
   * PATCH /servicios/:uid/estado
   */
  async cambiarEstado(uid: string, estado: 'activo' | 'inactivo'): Promise<Servicio> {
    const response = await httpClient.patch<Servicio>(`/servicios/${uid}/estado`, { estado });
    return response.data;
  }

  /**
   * Obtener estadísticas de servicios
   * GET /servicios/estadisticas
   */
  async obtenerEstadisticas(): Promise<EstadisticasServicios> {
    const response = await httpClient.get<EstadisticasServicios>('/servicios/estadisticas');
    return response.data;
  }
}

export default new ServiciosService();
