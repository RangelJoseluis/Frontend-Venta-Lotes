import React from 'react';
import type { TablaReporteDetalladoProps } from '../../types';
import { formatCurrency, formatFecha, formatPorcentaje } from '../../utils';

const TablaReporteDetallado: React.FC<TablaReporteDetalladoProps> = ({ datos }) => {
    return (
        <div className="bg-white dark:bg-slate-800 px-6 py-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Reporte Detallado de Mora ({datos.length} cuotas)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 border-b-2 border-slate-200 dark:border-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Cliente</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Lote</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Cuota</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Vencimiento</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Días Mora</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Acumulada</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Pagada</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Mora Pendiente</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Tasa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((detalle, index) => (
                            <tr
                                key={index}
                                className="border-b border-slate-100 dark:border-slate-700 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent dark:hover:from-orange-900/10 dark:hover:to-transparent transition-all last:border-b-0"
                            >
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{detalle.clienteNombre}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{detalle.lotecodigo}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">#{detalle.numeroCuota}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{formatFecha(detalle.fechaVencimiento)}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{detalle.diasMora}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{formatCurrency(detalle.montoMora)}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{formatCurrency(detalle.montoMoraPagado)}</td>
                                <td className="px-4 py-3 text-red-600 dark:text-red-400 font-bold">{formatCurrency(detalle.moraPendiente)}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-white">{formatPorcentaje(detalle.tasaMoraAplicada * 100, 3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaReporteDetallado;
