import { DollarSign } from 'lucide-react';
import './ValueDistribution.css';
import type { EstadisticasLotes } from '../../../../types';

interface ValueDistributionProps {
  stats: EstadisticasLotes | null;
}

const ValueDistribution = ({ stats }: ValueDistributionProps) => {
  if (!stats) return null;

  const disponiblesPercent = ((stats.disponibles || 0) / (stats.totalLotes || 1) * 100);
  const enCuotasPercent = ((stats.enCuotas || 0) / (stats.totalLotes || 1) * 100);
  const vendidosPercent = ((stats.vendidos || 0) / (stats.totalLotes || 1) * 100);

  const precioPromedio = (stats.valorTotal || 0) / (stats.totalLotes || 1) / 1000000;
  const precioPorM2 = (stats.valorTotal || 0) / (stats.superficieTotal || 1);

  return (
    <div className="value-distribution-grid">
      <div className="value-card">
        <div className="value-card-header">
          <DollarSign className="value-card-icon" />
          <h3 className="value-card-title">Valor Total del Inventario</h3>
        </div>
        <p className="value-card-amount">
          ${((stats.valorTotal || 0) / 1000000).toFixed(1)}M
        </p>
        <p className="value-card-subtitle">Millones de pesos COP</p>
        <div className="value-card-details">
          <div className="value-detail-card">
            <p className="value-detail-label">Precio Promedio</p>
            <p className="value-detail-value">${precioPromedio.toFixed(1)}M</p>
          </div>
          <div className="value-detail-card">
            <p className="value-detail-label">Por m²</p>
            <p className="value-detail-value">${precioPorM2.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      </div>

      <div className="distribution-card">
        <h3 className="distribution-title">Distribución de Lotes</h3>
        <div className="distribution-bars">
          <div className="distribution-bar">
            <div className="bar-header">
              <span className="bar-label">Disponibles</span>
              <span className="bar-value text-emerald-600">{stats.disponibles}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-emerald-500"
                style={{ width: `${disponiblesPercent}%` }}
              />
            </div>
          </div>
          <div className="distribution-bar">
            <div className="bar-header">
              <span className="bar-label">En Cuotas</span>
              <span className="bar-value text-amber-600">{stats.enCuotas}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-amber-500"
                style={{ width: `${enCuotasPercent}%` }}
              />
            </div>
          </div>
          <div className="distribution-bar">
            <div className="bar-header">
              <span className="bar-label">Vendidos</span>
              <span className="bar-value text-blue-600">{stats.vendidos}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-blue-500"
                style={{ width: `${vendidosPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueDistribution;
