// Tipos y constantes para Gestión de Lotes

import type { Lote, EstadoLote } from '../../types';

// ============================================================================
// TIPOS DE LOTE
// ============================================================================

export type { Lote, EstadoLote };

// ============================================================================
// FILTROS
// ============================================================================

export interface FiltrosLotes {
    busqueda: string;
    estado: string; // 'todos' | EstadoLote
}

// ============================================================================
// PROPS DE COMPONENTES
// ============================================================================

export interface HeaderGestionProps {
    totalLotes: number;
    lotesFiltrados: number;
}

export interface AlertasEstadoProps {
    error: string | null;
    success: string | null;
    onLimpiarError: () => void;
    onLimpiarSuccess: () => void;
}

export interface EstadisticasLotesProps {
    totalLotes: number;
    lotesDisponibles: number;
    lotesEnCuotas: number;
    lotesVendidos: number;
}

export interface FiltrosLotesProps {
    filtros: FiltrosLotes;
    onBusquedaChange: (busqueda: string) => void;
    onEstadoChange: (estado: string) => void;
}

export interface TablaLotesProps {
    lotes: Lote[];
    loading: boolean;
    onVer: (uid: string) => void;
    onEditar: (uid: string) => void;
    onEliminar: (lote: Lote) => void;
}

export interface ModalConfirmacionProps {
    isOpen: boolean;
    lote: Lote | null;
    onConfirmar: () => void;
    onCancelar: () => void;
    loading: boolean;
}

export interface PaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    onCambioPagina: (pagina: number) => void;
}

// ============================================================================
// HOOKS RETURN TYPES
// ============================================================================

export interface UseLotesReturn {
    lotes: Lote[];
    loading: boolean;
    error: string | null;
    cargarLotes: () => Promise<void>;
    eliminarLote: (uid: string) => Promise<void>;
    limpiarError: () => void;
}

export interface UseFiltrosLotesReturn {
    filtros: FiltrosLotes;
    lotesFiltrados: Lote[];
    actualizarFiltro: <K extends keyof FiltrosLotes>(campo: K, valor: FiltrosLotes[K]) => void;
    limpiarFiltros: () => void;
}
