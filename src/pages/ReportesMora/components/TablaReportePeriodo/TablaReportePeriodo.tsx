import React from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import GraficasMora from '../../../../components/GraficasMora';
import type { TablaReportePeriodoProps } from '../../types';
import { formatCurrency, formatPorcentaje } from '../../utils';

const TablaReportePeriodo: React.FC<TablaReportePeriodoProps> = ({
    datos,
    mostrarGraficas,
    onToggleGraficas
}) => {
    return (
        <>
            <button
                onClick={onToggleGraficas}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 hover:shadow-lg transition-all w-full max-w-md mx-auto mb-6"
            >
                <BarChart3 size={18} className="text-blue-600 dark:text-blue-400" />
                <span>{mostrarGraficas ? 'Ocultar' : 'Ver'} Análisis Gráfico</span>
                {mostrarGraficas ? <ChevronUp size={18} className="ml-auto" /> : <ChevronDown size={18} className="ml-auto" />}
            </button>

            {mostrarGraficas && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-top duration-300 mb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <GraficasMora reportePeriodo={datos} tipo="tendencia" />
                        <GraficasMora reportePeriodo={datos} tipo="efectividad" />
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 px-6 py-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Reporte de Mora por Período ({datos.length} meses)
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-b-2 border-slate-200 dark:border-slate-600">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Período</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Cuotas Vencidas</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Con Mora</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Generada</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Pagada</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Efectividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((periodo) => (
                                <tr
                                    key={periodo.periodo}
                                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent dark:hover:from-orange-900/10 dark:hover:to-transparent transition-all last:border-b-0"
                                >
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{periodo.periodo}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{periodo.totalCuotasVencidas}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{periodo.cuotasConMora}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{formatCurrency(periodo.moraGenerada)}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{formatCurrency(periodo.moraPagada)}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800/30 dark:to-amber-900/30 text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700">
                                            {formatPorcentaje(periodo.porcentajeMoraCobrada)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TablaReportePeriodo;
