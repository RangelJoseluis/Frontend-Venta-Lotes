import React from 'react';
import { DollarSign, CreditCard, Banknote, Receipt } from 'lucide-react';
import type { EstadisticasPagosProps } from '../../types';
import { formatearMoneda } from '../../utils/formatters';

const EstadisticasPagos: React.FC<EstadisticasPagosProps> = ({
    totalPagos,
    totalEfectivo,
    totalTransferencia,
    totalCheque,
    totalTarjeta,
    loading
}) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    const estadisticas = [
        {
            icon: <Receipt size={24} />,
            label: 'Total Pagos',
            value: totalPagos,
            borderColor: 'border-blue-500',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30',
            iconColor: 'text-blue-500',
            isCount: true
        },
        {
            icon: <DollarSign size={24} />,
            label: 'Efectivo',
            value: totalEfectivo,
            borderColor: 'border-emerald-500',
            iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
            iconColor: 'text-emerald-500',
            isCount: false
        },
        {
            icon: <Banknote size={24} />,
            label: 'Transferencia',
            value: totalTransferencia,
            borderColor: 'border-sky-500',
            iconBg: 'bg-sky-100 dark:bg-sky-900/30',
            iconColor: 'text-sky-500',
            isCount: false
        },
        {
            icon: <CreditCard size={24} />,
            label: 'Tarjeta/Cheque',
            value: totalTarjeta + totalCheque,
            borderColor: 'border-pink-500',
            iconBg: 'bg-pink-100 dark:bg-pink-900/30',
            iconColor: 'text-pink-500',
            isCount: false
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {estadisticas.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border-l-4 ${stat.borderColor} flex items-center gap-4 transition-transform hover:-translate-y-0.5 hover:shadow-md`}
                >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg shrink-0 ${stat.iconBg} ${stat.iconColor}`}>
                        {stat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                            {stat.label}
                        </p>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                            {stat.isCount ? stat.value : formatearMoneda(stat.value)}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EstadisticasPagos;
