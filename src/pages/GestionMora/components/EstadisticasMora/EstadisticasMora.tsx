import React from 'react';
import { AlertTriangle, DollarSign, TrendingUp, Users } from 'lucide-react';
import type { EstadisticasMoraProps } from '../../types';
import { formatCurrency } from '../../utils';
import './EstadisticasMora.css';

const EstadisticasMora: React.FC<EstadisticasMoraProps> = ({ estadisticas }) => {
    return (
        <div className="estadisticas-grid">
            <div className="mora-stat-card primary">
                <div className="mora-stat-icon-box">
                    <AlertTriangle />
                </div>
                <div className="mora-stat-content">
                    <h3 className="mora-stat-label">Total Cuotas con Mora</h3>
                    <p className="mora-stat-value">{estadisticas.totalCuotasConMora}</p>
                </div>
            </div>

            <div className="mora-stat-card danger">
                <div className="mora-stat-icon-box">
                    <DollarSign />
                </div>
                <div className="mora-stat-content">
                    <h3 className="mora-stat-label">Mora Acumulada Total</h3>
                    <p className="mora-stat-value">{formatCurrency(estadisticas.moraAcumuladaTotal)}</p>
                </div>
            </div>

            <div className="mora-stat-card warning">
                <div className="mora-stat-icon-box">
                    <TrendingUp />
                </div>
                <div className="mora-stat-content">
                    <h3 className="mora-stat-label">Mora Pendiente de Pago</h3>
                    <p className="mora-stat-value">{formatCurrency(estadisticas.moraPendientePago)}</p>
                </div>
            </div>

            <div className="mora-stat-card info">
                <div className="mora-stat-icon-box">
                    <Users />
                </div>
                <div className="mora-stat-content">
                    <h3 className="mora-stat-label">Promedio por Cuota</h3>
                    <p className="mora-stat-value">{formatCurrency(estadisticas.promedioMoraPorCuota)}</p>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasMora;
