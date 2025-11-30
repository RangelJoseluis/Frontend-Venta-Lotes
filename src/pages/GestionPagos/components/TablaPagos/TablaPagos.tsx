import React from 'react';
import { Eye, Download, DollarSign, Loader, Receipt, FileText } from 'lucide-react';
import type { TablaPagosProps } from '../../types';
import { formatearMoneda, formatearFecha, obtenerNombreMetodo } from '../../utils/formatters';

const TablaPagos: React.FC<TablaPagosProps> = ({
    pagos,
    loading,
    onVerDetalle,
    onPrevisualizarTicket,
    onDescargarTicket
}) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
                <Loader className="animate-spin mb-3 text-blue-500" size={40} />
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Cargando pagos...</h3>
                <p className="text-sm">Por favor espera un momento</p>
            </div>
        );
    }

    if (pagos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <Receipt size={64} className="mb-4 text-slate-300 dark:text-slate-600" />
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No hay pagos registrados</h3>
                <p className="text-sm">Aún no se han encontrado pagos en el sistema</p>
            </div>
        );
    }

    const getMetodoBadgeColor = (metodo: string) => {
        switch (metodo) {
            case 'efectivo': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
            case 'transferencia': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
            case 'cheque': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30';
            case 'tarjeta': return 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400 border-pink-200 dark:border-pink-500/30';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-600';
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left table-fixed">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[25%]">Pago</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[25%]">Venta</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[20%]">Monto</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[15%]">Método</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[15%] text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {pagos.map((pago) => (
                            <tr key={pago.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="px-6 py-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                            <DollarSign size={20} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {formatearFecha(pago.fechaPago)}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]" title={pago.referencia}>
                                                {pago.referencia ? `Ref: ${pago.referencia}` : 'Sin referencia'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 align-middle">
                                    {pago.cuota ? (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                {pago.cuota.venta?.codigo || `Venta ${pago.cuota.uid.substring(0, 8)}`}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                Cuota #{pago.cuota.numeroCuota || '-'}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 italic">Sin información</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 align-middle">
                                    <span className="font-bold text-slate-700 dark:text-slate-200">
                                        {formatearMoneda(pago.monto)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 align-middle">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getMetodoBadgeColor(pago.metodoPago)}`}>
                                        {obtenerNombreMetodo(pago.metodoPago)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 align-middle text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onVerDetalle(pago.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                            title="Ver detalles"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onPrevisualizarTicket(pago.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                                            title="Previsualizar ticket"
                                        >
                                            <FileText size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDescargarTicket(pago.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                                            title="Descargar ticket"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaPagos;
