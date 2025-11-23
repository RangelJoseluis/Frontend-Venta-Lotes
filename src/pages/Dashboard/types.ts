// Tipos para Dashboard

// Re-exportar tipos de servicios
export type { EstadisticasLotes } from '../../types';
export type { EstadisticasVentas } from '../../services/estadisticas-ventas.service';
export type { EstadisticasCuotas } from '../../services/estadisticas-cuotas.service';
export type { EstadisticasPagos } from '../../services/estadisticas-pagos.service';

// ============================================================================
// DASHBOARD DATA
// ============================================================================

export interface DashboardData {
    lotes: import('../../types').EstadisticasLotes | null;
    ventas: import('../../services/estadisticas-ventas.service').EstadisticasVentas | null;
    cuotas: import('../../services/estadisticas-cuotas.service').EstadisticasCuotas | null;
    pagos: import('../../services/estadisticas-pagos.service').EstadisticasPagos | null;
}

// ============================================================================
// HOOKS RETURN TYPES
// ============================================================================

export interface UseDashboardDataReturn {
    data: DashboardData;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export interface UseSidebarStateReturn {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
}
