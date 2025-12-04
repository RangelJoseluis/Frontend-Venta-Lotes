import React from 'react';
import type { EstadisticasMoraProps } from '../../types';
import { formatCurrency, formatPorcentaje } from '../../utils';

const EstadisticasMora: React.FC<EstadisticasMoraProps> = ({ efectividad }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Mora Generada
                </div>
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(efectividad.moraGeneradaTotal)}
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Mora Cobrada
                </div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(efectividad.moraCobradaTotal)}
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Mora Pendiente
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(efectividad.moraPendienteTotal)}
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Efectividad
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {formatPorcentaje(efectividad.porcentajeEfectividad)}
                </div>
            </div>
        </div>
    );
};

export default EstadisticasMora;
