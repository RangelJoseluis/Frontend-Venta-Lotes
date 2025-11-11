// Tipos para la página de Reportes

export type TabType = 'estadisticas' | 'historial' | 'cobranza' | 'alertas';

// Re-exportar tipos de servicios
export type { EstadisticasVentas } from '../../services/estadisticas-ventas.service';
export type { EstadisticasCuotas, CuotaVencida, CuotaProximaVencer } from '../../services/estadisticas-cuotas.service';
export type { EstadisticasPagos } from '../../services/estadisticas-pagos.service';
export type { CambioEstadoLote } from '../../services/lotes-historial.service';
export type { EstadisticasLotes, Lote } from '../../types';
