import React from 'react';
import type { FiltrosFechaProps } from '../../types';

const FiltrosFecha: React.FC<FiltrosFechaProps> = ({
    fechaInicio,
    fechaFin,
    onFechaInicioChange,
    onFechaFinChange,
    onAplicar
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 px-5 py-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Fecha Inicio
                    </label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => onFechaInicioChange(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Fecha Fin
                    </label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => onFechaFinChange(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <button
                        onClick={onAplicar}
                        className="w-full px-5 py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/40 transition-all"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FiltrosFecha;
