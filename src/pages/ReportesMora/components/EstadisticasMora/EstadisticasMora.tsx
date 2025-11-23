import React from 'react';
import type { EstadisticasMoraProps } from '../../types';
import { formatCurrency, formatPorcentaje } from '../../utils';
import './EstadisticasMora.css';

const EstadisticasMora: React.FC<EstadisticasMoraProps> = ({ efectividad }) => {
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-label">Mora Generada</div>
                <div className="stat-value text-danger">
                    {formatCurrency(efectividad.moraGeneradaTotal)}
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-label">Mora Cobrada</div>
                <div className="stat-value text-success">
                    {formatCurrency(efectividad.moraCobradaTotal)}
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-label">Mora Pendiente</div>
                <div className="stat-value text-warning">
                    {formatCurrency(efectividad.moraPendienteTotal)}
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-label">Efectividad</div>
                <div className="stat-value">
                    {formatPorcentaje(efectividad.porcentajeEfectividad)}
                </div>
            </div>
        </div>
    );
};

export default EstadisticasMora;
