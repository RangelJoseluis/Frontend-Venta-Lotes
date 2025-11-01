/**
 * SERVICIO: REPORTES DE MORA
 * 
 * Consume los endpoints de reportes del backend
 */

import httpClient from './http.service';

export interface ReporteMoraPorCliente {
  clienteUid: string;
  clienteNombre: string;
  clienteDocumento: string;
  totalCuotasConMora: number;
  moraAcumulada: number;
  moraPendiente: number;
  cuotasVencidas: number;
  diasPromedioMora: number;
  ultimaActualizacion: string;
}

export interface ReporteMoraPorPeriodo {
  periodo: string;
  totalCuotasVencidas: number;
  cuotasConMora: number;
  moraGenerada: number;
  moraPagada: number;
  moraPendiente: number;
  porcentajeMoraCobrada: number;
}

export interface ReporteMoraDetallado {
  cuotaUid: string;
  ventaUid: string;
  ventaCodigo: string;
  clienteNombre: string;
  lotecodigo: string;
  numeroCuota: number;
  valorCuota: number;
  montoPendiente: number;
  fechaVencimiento: string;
  diasVencidos: number;
  diasMora: number;
  montoMora: number;
  montoMoraPagado: number;
  moraPendiente: number;
  tasaMoraAplicada: number;
  estado: string;
}

export interface EstadisticasEfectividad {
  moraGeneradaTotal: number;
  moraCobradaTotal: number;
  moraPendienteTotal: number;
  porcentajeEfectividad: number;
  promedioTiempoCobroHoras: number;
}

/**
 * Servicio de reportes de mora
 */
class ReportesService {
  private readonly BASE_URL = '/reportes/mora';

  /**
   * Obtener reporte de mora por cliente
   */
  async obtenerPorCliente(): Promise<ReporteMoraPorCliente[]> {
    const response = await httpClient.get<ReporteMoraPorCliente[]>(
      `${this.BASE_URL}/por-cliente`
    );
    return response.data;
  }

  /**
   * Obtener reporte de mora por período
   */
  async obtenerPorPeriodo(
    fechaInicio: string,
    fechaFin: string
  ): Promise<ReporteMoraPorPeriodo[]> {
    const response = await httpClient.get<ReporteMoraPorPeriodo[]>(
      `${this.BASE_URL}/por-periodo`,
      {
        params: { fechaInicio, fechaFin }
      }
    );
    return response.data;
  }

  /**
   * Obtener reporte detallado de mora
   */
  async obtenerDetallado(): Promise<ReporteMoraDetallado[]> {
    const response = await httpClient.get<ReporteMoraDetallado[]>(
      `${this.BASE_URL}/detallado`
    );
    return response.data;
  }

  /**
   * Obtener top clientes con mayor mora
   */
  async obtenerTopClientes(limite: number = 10): Promise<ReporteMoraPorCliente[]> {
    const response = await httpClient.get<ReporteMoraPorCliente[]>(
      `${this.BASE_URL}/top-clientes`,
      {
        params: { limite }
      }
    );
    return response.data;
  }

  /**
   * Obtener estadísticas de efectividad de cobro
   */
  async obtenerEfectividadCobro(): Promise<EstadisticasEfectividad> {
    const response = await httpClient.get<EstadisticasEfectividad>(
      `${this.BASE_URL}/efectividad-cobro`
    );
    return response.data;
  }

  /**
   * Exportar reporte a CSV (implementación básica)
   */
  exportarACSV(datos: any[], nombreArchivo: string) {
    if (datos.length === 0) return;

    // Obtener headers
    const headers = Object.keys(datos[0]);
    
    // Crear CSV
    let csv = headers.join(',') + '\n';
    
    datos.forEach(fila => {
      const valores = headers.map(header => {
        const valor = fila[header];
        // Escapar valores con comas
        if (typeof valor === 'string' && valor.includes(',')) {
          return `"${valor}"`;
        }
        return valor;
      });
      csv += valores.join(',') + '\n';
    });

    // Descargar archivo
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${nombreArchivo}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Exportar instancia singleton
export const reportesService = new ReportesService();
