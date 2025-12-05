import React from 'react';
import { CheckCircle, DollarSign, Home, Maximize2 } from 'lucide-react';
import type { EstadisticasLotesProps } from '../../types';


const EstadisticasLotes: React.FC<EstadisticasLotesProps> = ({
    totalLotes,
    lotesDisponibles,
    lotesEnCuotas,
    lotesVendidos
}) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-emerald-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500">
                    <CheckCircle size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Disponibles</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{lotesDisponibles}</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-amber-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-500">
                    <DollarSign size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">En Cuotas</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{lotesEnCuotas}</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-red-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-red-100 dark:bg-red-900/30 text-red-500">
                    <Home size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Vendidos</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{lotesVendidos}</h3>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-indigo-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500">
                    <Maximize2 size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Lotes</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{totalLotes}</h3>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasLotes;
