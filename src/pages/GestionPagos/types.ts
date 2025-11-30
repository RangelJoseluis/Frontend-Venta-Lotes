// Tipos específicos para GestionPagos
import type { Pago } from '../../types';

// Re-exportar tipos principales
export type { Pago };

// Tipos para métodos de pago
export type MetodoPago = 'efectivo' | 'transferencia' | 'cheque' | 'tarjeta';

// Props para componentes
export interface HeaderGestionProps {
    totalPagos: number;
}

export interface EstadisticasPagosProps {
    totalPagos: number;
    totalEfectivo: number;
    totalTransferencia: number;
    totalCheque: number;
    totalTarjeta: number;
    loading: boolean;
}

export interface FiltrosPagosProps {
    busqueda: string;
    onBusquedaChange: (term: string) => void;
    filtroMetodo: string;
    onFiltroMetodoChange: (metodo: string) => void;
}

export interface TablaPagosProps {
    pagos: Pago[];
    loading: boolean;
    onVerDetalle: (uid: string) => void;
    onPrevisualizarTicket: (uid: string) => void;
    onDescargarTicket: (uid: string) => void;
}

export interface PaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    onPaginaAnterior: () => void;
    onPaginaSiguiente: () => void;
}

export interface AlertasEstadoProps {
    error: string | null;
    success: string | null;
    onLimpiarError?: () => void;
    onLimpiarSuccess?: () => void;
}

// Hooks return types
export interface UsePagosReturn {
    pagos: Pago[];
    loading: boolean;
    error: string | null;
    success: string | null;
    paginaActual: number;
    totalPaginas: number;
    cargarPagos: (filtros?: FiltrosPagos) => Promise<void>;
    previsualizarTicket: (uid: string) => Promise<void>;
    descargarTicket: (uid: string) => Promise<void>;
    cambiarPagina: (pagina: number) => void;
    limpiarMensajes: () => void;
}

export interface FiltrosPagos {
    metodoPago?: string;
    fechaDesde?: string;
    fechaHasta?: string;
}

export interface UseFiltrosPagosReturn {
    busqueda: string;
    setBusqueda: (term: string) => void;
    filtroMetodo: string;
    setFiltroMetodo: (metodo: string) => void;
    pagosFiltrados: Pago[];
    resetFiltros: () => void;
}
