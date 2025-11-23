import React from 'react';
import { DollarSign, CreditCard, Banknote, Receipt } from 'lucide-react';
import type { EstadisticasPagosProps } from '../../types';
import { formatearMoneda } from '../../utils/formatters';
import './EstadisticasPagos.css';

const EstadisticasPagos: React.FC<EstadisticasPagosProps> = ({
    totalPagos,
    totalEfectivo,
    totalTransferencia,
    totalCheque,
    totalTarjeta,
    loading
}) => {
    if (loading) {
        return null;
    }

    const estadisticas = [
        {
            icon: <Receipt size={24} />,
            label: 'Total Pagos',
            value: totalPagos,
            color: '#3b82f6',
            isCount: true
        },
        {
            icon: <DollarSign size={24} />,
            label: 'Efectivo',
            value: totalEfectivo,
            color: '#10b981',
            isCount: false
        },
        {
            icon: <Banknote size={24} />,
            label: 'Transferencia',
            value: totalTransferencia,
            color: '#0ea5e9',
            isCount: false
        },
        {
            icon: <CreditCard size={24} />,
            label: 'Tarjeta/Cheque',
            value: totalTarjeta + totalCheque,
            color: '#ec4899',
            isCount: false
        }
    ];

    return (
        <div className="estadisticas-pagos">
            {estadisticas.map((stat, index) => (
                <div
                    key={index}
                    className="estadistica-card"
                    style={{ borderLeftColor: stat.color }}
                >
                    <div className="estadistica-icon" style={{ color: stat.color }}>
                        {stat.icon}
                    </div>
                    <div className="estadistica-content">
                        <div className="estadistica-label">{stat.label}</div>
                        <div className="estadistica-value">
                            {stat.isCount ? stat.value : formatearMoneda(stat.value)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EstadisticasPagos;
