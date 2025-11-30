// ============================================================================
// TIPOS PARA GESTIÓN DE VENTAS (SIGUIENDO PATRÓN DE CLIENTES)
// ============================================================================

export interface EstadisticasVentasProps {
  totalVentas: number;
  ventasContado: number;
  ventasCuotas: number;
  ventasPendientes: number;
  montoTotal: number;
  cargando: boolean;
}

export interface FiltrosVentasProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filtroEstado: string;
  onFiltroEstadoChange: (value: string) => void;
  filtroModalidad: string;
  onFiltroModalidadChange: (value: string) => void;
  mostrarFiltros: boolean;
  onToggleFiltros: () => void;
}

export interface HeaderGestionVentasProps {
  totalVentas: number;
}

export interface TablaVentasProps {
  ventas: any[];
  cargando: boolean;
  onEliminar: (uid: string, codigo: string) => void | Promise<void>;
  onPrevisualizarFactura: (venta: any) => void;
  onDescargarFactura: (venta: any) => void;
  onVerDetalle?: (venta: any) => void;
}

export interface PaginacionVentasProps {
  paginacion: {
    paginaActual: number;
    totalPaginas: number;
    totalElementos: number;
    elementosPorPagina: number;
  };
  onPaginaChange: (pagina: number) => void;
}

export interface FiltrosVentas {
  busqueda: string;
  estado: string;
  modalidad: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface EstadisticasVentas {
  totalVentas: number;
  ventasContado: number;
  ventasCuotas: number;
  ventasPendientes: number;
  montoTotal: number;
}
