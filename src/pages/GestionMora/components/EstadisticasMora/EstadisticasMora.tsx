import React from 'react';
import { AlertTriangle, DollarSign, TrendingUp, Users } from 'lucide-react';
import type { EstadisticasMoraProps } from '../../types';
import { formatCurrency } from '../../utils';

const EstadisticasMora: React.FC<EstadisticasMoraProps> = ({ estadisticas }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border-l-4 border-blue-500 dark:border-blue-400 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/40">
                    <AlertTriangle size={24} />
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Total Cuotas con Mora
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {estadisticas.totalCuotasConMora}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border-l-4 border-red-500 dark:border-red-400 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white shadow-lg shadow-red-500/30 dark:shadow-red-600/40">
                    <DollarSign size={24} />
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Mora Acumulada Total
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(estadisticas.moraAcumuladaTotal)}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border-l-4 border-amber-500 dark:border-amber-400 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white shadow-lg shadow-amber-500/30 dark:shadow-amber-600/40">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Mora Pendiente de Pago
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(estadisticas.moraPendientePago)}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border-l-4 border-cyan-500 dark:border-cyan-400 flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 text-white shadow-lg shadow-cyan-500/30 dark:shadow-cyan-600/40">
                    <Users size={24} />
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Promedio por Cuota
                    </h3>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(estadisticas.promedioMoraPorCuota)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasMora;
