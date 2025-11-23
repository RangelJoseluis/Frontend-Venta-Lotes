import { DollarSign } from 'lucide-react';
import './ValueDistribution.css';
import type { EstadisticasLotes } from '../../../../types';

interface ValueDistributionProps {
  stats: EstadisticasLotes | null;
}

const ValueDistribution = ({ stats }: ValueDistributionProps) => {
  if (!stats) return null;

  // Variables removidas - ya no se usan las barras de distribución
  // const disponiblesPercent = ((stats.disponibles || 0) / (stats.totalLotes || 1) * 100);
  // const enCuotasPercent = ((stats.enCuotas || 0) / (stats.totalLotes || 1) * 100);
  // const vendidosPercent = ((stats.vendidos || 0) / (stats.totalLotes || 1) * 100);

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
      
      {/* Distribución de lotes removida - causaba problemas visuales */}
    </div>
  );
};

export default ValueDistribution;
