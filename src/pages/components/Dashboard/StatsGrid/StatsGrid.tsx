import { Building2, CheckCircle2, Calculator } from 'lucide-react';
import StatCard from './StatCard';
import './StatsGrid.css';
import type { EstadisticasLotes } from '../../../../types';

interface StatsGridProps {
  stats: EstadisticasLotes | null;
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  if (!stats) return null;

  const disponiblesPercent = ((stats.disponibles || 0) / (stats.totalLotes || 1) * 100);
  const enCuotasPercent = ((stats.enCuotas || 0) / (stats.totalLotes || 1) * 100);
  const vendidosPercent = ((stats.vendidos || 0) / (stats.totalLotes || 1) * 100);

  return (
    <div className="stats-grid">
      <StatCard
        icon={Building2}
        title="Total"
        value={stats.totalLotes}
        subtitle="Lotes registrados"
        color="slate"
      />
      <StatCard
        icon={CheckCircle2}
        title="Disponibles"
        value={stats.disponibles}
        subtitle="Del total"
        percentage={Math.round(disponiblesPercent)}
        color="emerald"
      />
      <StatCard
        icon={Calculator}
        title="En Cuotas"
        value={stats.enCuotas}
        subtitle="Del total"
        percentage={Math.round(enCuotasPercent)}
        color="amber"
      />
      <StatCard
        icon={CheckCircle2}
        title="Vendidos"
        value={stats.vendidos}
        subtitle="Del total"
        percentage={Math.round(vendidosPercent)}
        color="blue"
      />
    </div>
  );
};

export default StatsGrid;
