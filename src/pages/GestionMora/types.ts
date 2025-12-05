// Tipos y constantes para Gestión de Mora

// Re-exportar tipos del servicio
export type {
    CuotaConMora,
    EstadisticasMora
} from '../../services/mora.service';

// ============================================================================
// PROPS DE COMPONENTES
// ============================================================================

export interface HeaderGestionProps {
    onVolver: () => void;
    onCalcularMora: () => void;
    isLoading: boolean;
}

export interface EstadisticasMoraProps {
    estadisticas: import('../../services/mora.service').EstadisticasMora;
}

export interface FiltrosMoraProps {
    filtroCliente: string;
    filtroLote: string;
    onClienteChange: (valor: string) => void;
    onLoteChange: (valor: string) => void;
}

export interface AlertasEstadoProps {
    error: string | null;
    success: string | null;
    onLimpiarError: () => void;
    onLimpiarSuccess: () => void;
}

export interface TablaCuotasMoraProps {
    cuotas: import('../../services/mora.service').CuotaConMora[];
    onVerDetalle: (uid: string) => void;
    onRegistrarPago: () => void;
}

// ============================================================================
// HOOKS RETURN TYPES
// ============================================================================

export interface UseGestionMoraReturn {
    cuotas: import('../../services/mora.service').CuotaConMora[];
    estadisticas: import('../../services/mora.service').EstadisticasMora | null;
    isLoading: boolean;
    error: string | null;
    cargarDatos: () => Promise<void>;
    calcularMoraMasiva: () => Promise<void>;
    limpiarError: () => void;
}

export interface UseFiltrosMoraReturn {
    filtroCliente: string;
    filtroLote: string;
    cuotasFiltradas: import('../../services/mora.service').CuotaConMora[];
    setFiltroCliente: (valor: string) => void;
    setFiltroLote: (valor: string) => void;
}
