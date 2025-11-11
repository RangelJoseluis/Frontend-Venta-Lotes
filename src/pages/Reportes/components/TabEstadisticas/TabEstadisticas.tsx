// Componente TabEstadisticas - Muestra estadísticas generales de ventas, cuotas, pagos y lotes
import { StatsCard } from '../../../components/ReportesComponents';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import type {
  EstadisticasVentas,
  EstadisticasCuotas,
  EstadisticasPagos,
  EstadisticasLotes,
} from '../../types';
import './TabEstadisticas.css';

interface TabEstadisticasProps {
  statsVentas: EstadisticasVentas | null;
  statsCuotas: EstadisticasCuotas | null;
  statsPagos: EstadisticasPagos | null;
  statsLotes: EstadisticasLotes | null;
}

const TabEstadisticas = ({
  statsVentas,
  statsCuotas,
  statsPagos,
  statsLotes,
}: TabEstadisticasProps) => {
  return (
    <div className="estadisticas-section">
      <h2 className="section-title">Estadísticas Generales</h2>

      {/* Grid de estadísticas */}
      <div className="stats-grid-reportes">
        {/* Ventas */}
        <StatsCard
          title="Ventas"
          icon="📈"
          variant="ventas"
          rows={[
            { label: 'Total Ventas:', value: statsVentas?.totalVentas || 0 },
            { label: 'Monto Total:', value: formatCurrency(statsVentas?.montoTotalVentas || 0) },
            { label: 'Promedio:', value: formatCurrency(statsVentas?.montoPromedioPorVenta || 0) },
            { label: 'Activas:', value: statsVentas?.ventasActivas || 0 },
            { label: 'Completadas:', value: statsVentas?.ventasCompletadas || 0 },
            { label: 'Contado:', value: statsVentas?.ventasPorModalidad.contado || 0 },
            { label: 'Cuotas:', value: statsVentas?.ventasPorModalidad.cuotas || 0 },
          ]}
        />

        {/* Cuotas */}
        <StatsCard
          title="Cuotas"
          icon="💰"
          variant="cuotas"
          rows={[
            { label: 'Total Cuotas:', value: statsCuotas?.totalCuotas || 0 },
            { label: 'Pendientes:', value: statsCuotas?.cuotasPendientes || 0 },
            { label: 'Pagadas:', value: statsCuotas?.cuotasPagadas || 0 },
            { label: 'Vencidas:', value: statsCuotas?.cuotasVencidas || 0 },
            { label: 'Monto Total:', value: formatCurrency(statsCuotas?.montoTotalCuotas || 0) },
            { label: 'Monto Pagado:', value: formatCurrency(statsCuotas?.montoTotalPagado || 0) },
            { label: '% Cobranza:', value: formatPercentage(statsCuotas?.porcentajeCobranza || 0) },
          ]}
        />

        {/* Pagos */}
        <StatsCard
          title="Pagos (Año Actual)"
          icon="💵"
          variant="pagos"
          rows={[
            { label: 'Total Pagos:', value: statsPagos?.totalPagos || 0 },
            { label: 'Monto Total:', value: formatCurrency(statsPagos?.montoTotalPagos || 0) },
            { label: 'Promedio:', value: formatCurrency(statsPagos?.promedioMontoPago || 0) },
            { label: 'Efectivo:', value: `${statsPagos?.pagosPorMetodo.efectivo || 0} (${formatCurrency(statsPagos?.montosPorMetodo.efectivo || 0)})` },
            { label: 'Transferencia:', value: `${statsPagos?.pagosPorMetodo.transferencia || 0} (${formatCurrency(statsPagos?.montosPorMetodo.transferencia || 0)})` },
            { label: 'Cheque:', value: `${statsPagos?.pagosPorMetodo.cheque || 0} (${formatCurrency(statsPagos?.montosPorMetodo.cheque || 0)})` },
          ]}
        />

        {/* Lotes */}
        <StatsCard
          title="Lotes"
          icon="🏘️"
          variant="lotes"
          rows={[
            { label: 'Total Lotes:', value: statsLotes?.totalLotes || 0 },
            { label: 'Disponibles:', value: statsLotes?.disponibles || 0 },
            { label: 'En Cuotas:', value: statsLotes?.enCuotas || 0 },
            { label: 'Vendidos:', value: statsLotes?.vendidos || 0 },
            { label: 'Superficie Total:', value: `${statsLotes?.superficieTotal || 0} m²` },
            { label: 'Valor Total:', value: formatCurrency(statsLotes?.valorTotal || 0) },
          ]}
        />
      </div>
    </div>
  );
};

export default TabEstadisticas;
