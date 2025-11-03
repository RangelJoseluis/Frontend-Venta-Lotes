/**
 * COMPONENTE: MAP STATS
 * 
 * Muestra estadísticas del mapa (total de lotes y disponibles).
 */

import React from 'react';
import type { MapStatsProps } from '../../types';
import './MapStats.css';

const MapStats: React.FC<MapStatsProps> = ({ lotes }) => {
  const totalLotes = lotes.length;
  const lotesDisponibles = lotes.filter(l => l.estado === 'disponible').length;

  return (
    <div className="mapalotes-stats">
      <div className="mapalotes-stat-item">
        <span className="mapalotes-stat-label">Total Lotes</span>
        <span className="mapalotes-stat-value">{totalLotes}</span>
      </div>
      <div className="mapalotes-stat-item">
        <span className="mapalotes-stat-label">Disponibles</span>
        <span className="mapalotes-stat-value">{lotesDisponibles}</span>
      </div>
    </div>
  );
};

export default MapStats;
