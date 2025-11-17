// ============================================================================
// TIPOS COMPARTIDOS DEL MÓDULO VENTAS
// ============================================================================

import type { VentaResumen, Cliente, Lote } from '../../../types';

// Tipos base reutilizables
export interface VentaBase {
  uid: string;
  fechaVenta: string;
  precioVenta: number;
  modalidadPago: 'contado' | 'cuotas';
  cantidadCuotas?: number;
  estado: string;
  montoPendiente: number;
  observaciones?: string;
}

// Tipos para formularios
export interface FormularioVentaData {
  clienteUid: string;
  loteUid: string;
  precioVenta: number;
  modalidadPago: 'contado' | 'cuotas';
  cantidadCuotas?: number;
  montoInicial?: number;
  observaciones?: string;
}

// Tipos para filtros
export interface FiltrosVentas {
  busqueda: string;
  modalidad?: 'contado' | 'cuotas' | '';
  estado?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

// Tipos para paginación
export interface PaginacionVentas {
  paginaActual: number;
  totalPaginas: number;
  limite: number;
  total: number;
}

// Tipos para acciones
export interface AccionVenta {
  tipo: 'ver' | 'previsualizar' | 'descargar' | 'eliminar';
  uid: string;
  codigo?: string;
}

// Tipos para componentes profesionales (patrón Clientes)
export interface EstadisticasVentasProps {
  totalVentas: number;
  ventasContado: number;
  ventasCuotas: number;
  ventasPendientes: number;
  montoTotal: number;
  cargando: boolean;
}

export interface HeaderGestionVentasProps {
  titulo: string;
  subtitulo: string;
  onNuevo: () => void;
  textoBotonNuevo: string;
  onVolver?: () => void;
}

// Re-exportar tipos necesarios
export type { VentaResumen, Cliente, Lote };
