import React from 'react';
import { AlertTriangle, Download, Eye, DollarSign } from 'lucide-react';
import type { TablaCuotasMoraProps } from '../../types';
import { formatFecha, formatPorcentaje } from '../../utils';

const TablaCuotasMora: React.FC<TablaCuotasMoraProps> = ({
    cuotas,
    onVerDetalle,
    onRegistrarPago
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 px-6 py-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Cuotas con Mora ({cuotas.length})
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm hover:shadow-md">
                    <Download size={16} />
                    Exportar
                </button>
            </div>

            {cuotas.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-full mb-4">
                        <AlertTriangle size={48} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        No hay cuotas con mora
                    </h3>
                    <p className="text-sm">
                        ¡Excelente! No hay cuotas vencidas con mora pendiente.
                    </p>
                </div>
            ) : (
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
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Tasa Aplicada</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Estado</th>
                                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 uppercase text-xs tracking-wider whitespace-nowrap">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuotas.map((cuota) => (
                                <tr
                                    key={cuota.uid}
                                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent dark:hover:from-orange-900/10 dark:hover:to-transparent transition-all last:border-b-0"
                                >
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{cuota.venta.cliente}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{cuota.venta.lote}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">#{cuota.numeroCuota}</td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{formatFecha(cuota.fechaVencimiento)}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800">
                                            {cuota.diasMora} días
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-red-600 dark:text-red-400">
                                        {cuota.montoMoraFormateado}
                                    </td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">{formatPorcentaje(cuota.tasaMoraAplicada * 100)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cuota.estado === 'Vencida'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800'
                                                : cuota.estado === 'Pendiente'
                                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                                            }`}>
                                            {cuota.estado}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                title="Ver detalle"
                                                onClick={() => onVerDetalle(cuota.uid)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                                                title="Registrar pago"
                                                onClick={onRegistrarPago}
                                            >
                                                <DollarSign size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TablaCuotasMora;
