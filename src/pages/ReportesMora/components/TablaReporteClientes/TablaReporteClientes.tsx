import React from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import GraficasMora from '../../../../components/GraficasMora';
import type { TablaReporteClientesProps } from '../../types';
import { formatCurrency, redondearDias } from '../../utils';

const TablaReporteClientes: React.FC<TablaReporteClientesProps> = ({
    datos,
    mostrarGraficas,
    onToggleGraficas,
    esTop10 = false
}) => {
    return (
        <>
            {!esTop10 && (
                <button
                    onClick={onToggleGraficas}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 hover:shadow-lg transition-all w-full max-w-md mx-auto mb-6"
                >
                    <BarChart3 size={18} className="text-blue-600 dark:text-blue-400" />
                    <span>{mostrarGraficas ? 'Ocultar' : 'Ver'} Análisis Gráfico</span>
                    {mostrarGraficas ? <ChevronUp size={18} className="ml-auto" /> : <ChevronDown size={18} className="ml-auto" />}
                </button>
            )}

            {mostrarGraficas && !esTop10 && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-top duration-300 mb-6">
                    <div className="w-full">
                        <GraficasMora reporteClientes={datos} tipo="clientes" />
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 px-5 py-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {esTop10 ? 'Top 10 Clientes con Mayor Mora' : `Reporte de Mora por Cliente (${datos.length})`}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-b-2 border-slate-200 dark:border-slate-600">
                            <tr>
                                {esTop10 && <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">#</th>}
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Cliente</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Documento</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Cuotas{esTop10 ? '' : ' con Mora'}</th>
                                {!esTop10 && <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Acumulada</th>}
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Pendiente</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Días Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((cliente, index) => (
                                <tr
                                    key={cliente.clienteUid}
                                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent dark:hover:from-orange-900/10 dark:hover:to-transparent transition-all last:border-b-0"
                                >
                                    {esTop10 && <td className="px-4 py-3 text-slate-900 dark:text-white font-bold">#{index + 1}</td>}
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{cliente.clienteNombre}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{cliente.clienteDocumento}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{cliente.totalCuotasConMora}</td>
                                    {!esTop10 && (
                                        <td className="px-4 py-3 text-red-600 dark:text-red-400 font-bold">{formatCurrency(cliente.moraAcumulada)}</td>
                                    )}
                                    <td className={`px-4 py-3 font-bold ${esTop10 ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"}`}>
                                        {formatCurrency(cliente.moraPendiente)}
                                    </td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{redondearDias(cliente.diasPromedioMora)} días</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TablaReporteClientes;
