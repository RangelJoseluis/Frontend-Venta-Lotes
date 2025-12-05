import React from 'react';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import type { SelectorTipoReporteProps } from '../../types';

const SelectorTipoReporte: React.FC<SelectorTipoReporteProps> = ({
    tipoActual,
    onCambioTipo
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 px-5 py-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all border-2 ${tipoActual === 'cliente'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-blue-500 dark:border-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/40'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-md'
                        }`}
                    onClick={() => onCambioTipo('cliente')}
                >
                    <Users size={20} />
                    <span>Por Cliente</span>
                </button>
                <button
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all border-2 ${tipoActual === 'periodo'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-blue-500 dark:border-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/40'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-md'
                        }`}
                    onClick={() => onCambioTipo('periodo')}
                >
                    <Calendar size={20} />
                    <span>Por Período</span>
                </button>
                <button
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all border-2 ${tipoActual === 'detallado'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-blue-500 dark:border-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/40'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-md'
                        }`}
                    onClick={() => onCambioTipo('detallado')}
                >
                    <FileText size={20} />
                    <span>Detallado</span>
                </button>
                <button
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all border-2 ${tipoActual === 'top'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 border-blue-500 dark:border-blue-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/40'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-md'
                        }`}
                    onClick={() => onCambioTipo('top')}
                >
                    <TrendingUp size={20} />
                    <span>Top 10</span>
                </button>
            </div>
        </div>
    );
};

export default SelectorTipoReporte;
