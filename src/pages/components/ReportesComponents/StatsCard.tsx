/**
 * STATS CARD - Componente de Tarjeta de Estadísticas
 * Completamente aislado para evitar interferencias CSS
 */

import './StatsCard.css';

interface StatRow {
  label: string;
  value: string | number;
}

interface StatsCardProps {
  title: string;
  icon: string;
  rows: StatRow[];
  variant: 'ventas' | 'cuotas' | 'pagos' | 'lotes';
}

export default function StatsCard({ title, icon, rows, variant }: StatsCardProps) {
  return (
    <div className={`rep-stats-card rep-stats-${variant}`}>
      <div className="rep-stats-header">
        <span className="rep-stats-icon">{icon}</span>
        <h3 className="rep-stats-title">{title}</h3>
      </div>
      <div className="rep-stats-body">
        {rows.map((row, index) => (
          <div key={index} className="rep-stats-row">
            <span className="rep-stats-label">{row.label}</span>
            <span className="rep-stats-value">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
