// Tipos y constantes para Reportes de Mora

// Re-exportar tipos del servicio
export type {
    ReporteMoraPorCliente,
    ReporteMoraPorPeriodo,
    ReporteMoraDetallado,
    EstadisticasEfectividad
} from '../../services/reportes.service';

// ============================================================================
// TIPO DE REPORTE
// ============================================================================

export type TipoReporte = 'cliente' | 'periodo' | 'detallado' | 'top';

// ============================================================================
// PROPS DE COMPONENTES
// ============================================================================

export interface HeaderReportesProps {
    onVolver: () => void;
    onActualizar: () => void;
    onExportar: () => void;
    isLoading: boolean;
}

export interface SelectorTipoReporteProps {
    tipoActual: TipoReporte;
    onCambioTipo: (tipo: TipoReporte) => void;
}

export interface FiltrosFechaProps {
    fechaInicio: string;
    fechaFin: string;
    onFechaInicioChange: (fecha: string) => void;
    onFechaFinChange: (fecha: string) => void;
    onAplicar: () => void;
}

export interface AlertasEstadoProps {
    error: string | null;
    success: string | null;
    onLimpiarError: () => void;
    onLimpiarSuccess: () => void;
}

export interface EstadisticasMoraProps {
    efectividad: import('../../services/reportes.service').EstadisticasEfectividad;
}

export interface TablaReporteClientesProps {
    datos: import('../../services/reportes.service').ReporteMoraPorCliente[];
    mostrarGraficas: boolean;
    onToggleGraficas: () => void;
    esTop10?: boolean;
}

export interface TablaReportePeriodoProps {
    datos: import('../../services/reportes.service').ReporteMoraPorPeriodo[];
    mostrarGraficas: boolean;
    onToggleGraficas: () => void;
}

export interface TablaReporteDetalladoProps {
    datos: import('../../services/reportes.service').ReporteMoraDetallado[];
}

// ============================================================================
// HOOKS RETURN TYPES
// ============================================================================

export interface UseReportesMoraReturn {
    tipoReporte: TipoReporte;
    setTipoReporte: (tipo: TipoReporte) => void;
    isLoading: boolean;
    error: string | null;
    reporteClientes: import('../../services/reportes.service').ReporteMoraPorCliente[];
    reportePeriodo: import('../../services/reportes.service').ReporteMoraPorPeriodo[];
    reporteDetallado: import('../../services/reportes.service').ReporteMoraDetallado[];
    efectividad: import('../../services/reportes.service').EstadisticasEfectividad | null;
    cargarReporte: () => Promise<void>;
    limpiarError: () => void;
}

export interface UseFiltrosFechaReturn {
    fechaInicio: string;
    fechaFin: string;
    setFechaInicio: (fecha: string) => void;
    setFechaFin: (fecha: string) => void;
}

export interface UseExportarReporteReturn {
    exportar: () => void;
}
