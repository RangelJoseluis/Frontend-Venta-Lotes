/**
 * TIPOS LOCALES DEL MÓDULO MAPA DE LOTES
 * 
 * Interfaces y tipos específicos para el componente MapaLotes
 * y sus subcomponentes.
 */

import type { LoteParaMapa } from '../../types/mapa';

/**
 * Props para el componente ZoomController
 */
export interface ZoomControllerProps {
  clienteSeleccionado: { value: string; label: string } | null;
  lotes: LoteParaMapa[];
}

/**
 * Props para el componente MapHeader
 */
export interface MapHeaderProps {
  rol: 'invitado' | 'cliente' | 'admin';
  tipoCapa: 'mapa' | 'satelite' | 'hibrido';
  setTipoCapa: (tipo: 'mapa' | 'satelite' | 'hibrido') => void;
  clienteSeleccionado: { value: string; label: string } | null;
  setClienteSeleccionado: (cliente: { value: string; label: string } | null) => void;
  clientes: any[];
  cargandoClientes: boolean;
  lotesFiltrados: LoteParaMapa[];
  mostrarFiltros: boolean;
  setMostrarFiltros: (mostrar: boolean) => void;
  onVolverDashboard: () => void;
}

/**
 * Props para el componente FilterPanel
 */
export interface FilterPanelProps {
  mostrarFiltros: boolean;
  setMostrarFiltros: (mostrar: boolean) => void;
  filtros: FiltrosState;
  setFiltros: (filtros: FiltrosState) => void;
  limpiarFiltros: () => void;
  lotesFiltrados: LoteParaMapa[];
  lotes: LoteParaMapa[];
  rol: 'invitado' | 'cliente' | 'admin';
}

/**
 * Props para el componente LoteDetailsPanel
 */
export interface LoteDetailsPanelProps {
  loteSeleccionado: LoteParaMapa | null;
  setLoteSeleccionado: (lote: LoteParaMapa | null) => void;
  rol: 'invitado' | 'cliente' | 'admin';
  onNavigate: (path: string) => void;
}

/**
 * Props para el componente LoteMarker
 */
export interface LoteMarkerProps {
  lote: LoteParaMapa;
  onSelectLote: (lote: LoteParaMapa) => void;
  crearIconoLote: (estado: string, esDelCliente?: boolean) => any;
  getEstiloPoligono: (estado: string) => any;
  formatearPrecio: (precio: number) => string;
}

/**
 * Props para el componente MapStats
 */
export interface MapStatsProps {
  lotes: LoteParaMapa[];
}

/**
 * Props para el componente ErrorAlert
 */
export interface ErrorAlertProps {
  error: string;
  onReintentar: () => void;
}

/**
 * Props para el componente LoadingOverlay
 */
export interface LoadingOverlayProps {
  mensaje?: string;
}

/**
 * Estado de filtros del mapa
 */
export interface FiltrosState {
  busqueda: string;
  busquedaCliente: string;
  precioMin: number;
  precioMax: number;
  superficieMin: number;
  superficieMax: number;
  estados: {
    disponible: boolean;
    en_cuotas: boolean;
    vendido: boolean;
  };
}

/**
 * Datos parseados de GeoJSON
 */
export interface GeoData {
  tipo: 'point' | 'polygon';
  centro: {
    latitud: number;
    longitud: number;
  };
  coordenadas: [number, number][];
}
