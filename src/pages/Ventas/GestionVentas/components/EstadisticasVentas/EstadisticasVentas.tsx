import React from 'react';
import { ShoppingCart, CreditCard, Clock, DollarSign, Loader } from 'lucide-react';
import type { EstadisticasVentasProps } from '../../types';
import { formatearMoneda } from '../../utils/formatters';
import './EstadisticasVentas.css';

const EstadisticasVentas: React.FC<EstadisticasVentasProps> = ({
  totalVentas,
  ventasContado,
  ventasCuotas,
  ventasPendientes,
  montoTotal,
  cargando
}) => {
  if (cargando) {
    return (
      <div className="estadisticas-grid">
        <div className="stat-card stat-loading">
          <Loader className="spinner" size={24} />
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ventas-estadisticas-grid">
      <div className="ventas-stat-card ventas-stat-total">
        <div className="ventas-stat-content">
          <div className="ventas-stat-icono">
            <ShoppingCart size={20} />
          </div>
          <span className="ventas-stat-valor">{totalVentas}</span>
          <span className="ventas-stat-label">Total Ventas</span>
        </div>
      </div>

      <div className="ventas-stat-card ventas-stat-contado">
        <div className="ventas-stat-content">
          <div className="ventas-stat-icono">
            <DollarSign size={20} />
          </div>
          <span className="ventas-stat-valor">{ventasContado}</span>
          <span className="ventas-stat-label">Contado</span>
        </div>
      </div>

      <div className="ventas-stat-card ventas-stat-cuotas">
        <div className="ventas-stat-content">
          <div className="ventas-stat-icono">
            <CreditCard size={20} />
          </div>
          <span className="ventas-stat-valor">{ventasCuotas}</span>
          <span className="ventas-stat-label">Cuotas</span>
        </div>
      </div>

      <div className="ventas-stat-card ventas-stat-pendientes">
        <div className="ventas-stat-content">
          <div className="ventas-stat-icono">
            <Clock size={20} />
          </div>
          <span className="ventas-stat-valor">{ventasPendientes}</span>
          <span className="ventas-stat-label">Pendientes</span>
        </div>
      </div>

      <div className="ventas-stat-card ventas-stat-monto">
        <div className="ventas-stat-content">
          <div className="ventas-stat-icono">
            <DollarSign size={20} />
          </div>
          <span className="ventas-stat-valor">{formatearMoneda(montoTotal)}</span>
          <span className="ventas-stat-label">Monto Total Ventas</span>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasVentas;
