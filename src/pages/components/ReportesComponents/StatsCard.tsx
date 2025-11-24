/**
 * STATS CARD - Componente de Tarjeta de Estadísticas
 * Completamente aislado para evitar interferencias CSS
 * Ahora con funcionalidad de colapso/expansión
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`rep-stats-card rep-stats-${variant} ${isExpanded ? 'rep-stats-expanded' : 'rep-stats-collapsed'}`}>
      <div className="rep-stats-header" onClick={toggleExpanded}>
        <span className="rep-stats-icon">{icon}</span>
        <h3 className="rep-stats-title">{title}</h3>
        <ChevronDown
          className={`rep-stats-chevron ${isExpanded ? 'expanded' : ''}`}
          size={20}
        />
      </div>
      {isExpanded && (
        <div className="rep-stats-body">
          {rows.map((row, index) => (
            <div key={index} className="rep-stats-row">
              <span className="rep-stats-label">{row.label}</span>
              <span className="rep-stats-value">{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
