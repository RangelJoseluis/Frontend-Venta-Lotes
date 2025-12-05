import React from 'react';
import { FileText, RefreshCw, Download } from 'lucide-react';
import type { HeaderReportesProps } from '../../types';

const HeaderReportes: React.FC<HeaderReportesProps> = ({
    onVolver,
    onActualizar,
    onExportar,
    isLoading
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-4 mb-4 bg-white dark:bg-slate-800 px-5 py-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            {/* Contenido del Header */}
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/40">
                    <FileText size={32} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                        Reportes de Mora
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Análisis integral y exportación de datos de mora
                    </p>
                </div>
            </div>

            {/* Acciones del Header */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                    onClick={onActualizar}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    disabled={isLoading}
                >
                    <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                    Actualizar
                </button>
                <button
                    onClick={onExportar}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white rounded-lg text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 dark:hover:shadow-emerald-600/40 transition-all"
                >
                    <Download size={18} />
                    Exportar CSV
                </button>
            </div>
        </div>
    );
};

export default HeaderReportes;
