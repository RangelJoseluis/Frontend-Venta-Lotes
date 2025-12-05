import React from 'react';
import { Calendar, DollarSign, CreditCard, FileText } from 'lucide-react';
import type { Pago } from '../../../types';

interface TablaPagosProps {
    pagos: Pago[];
    loading: boolean;
}

export const TablaPagos: React.FC<TablaPagosProps> = ({ pagos, loading }) => {
    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (pagos.length === 0) {
        return (
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                        No hay pagos registrados
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Cuando realices un pago, aparecerá aquí con toda su información.
                    </p>
                </div>
            </div>
        );
    }

    const getMetodoPagoIcon = (metodo: string) => {
        switch (metodo) {
            case 'transferencia':
                return <CreditCard className="w-4 h-4" />;
            case 'efectivo':
                return <DollarSign className="w-4 h-4" />;
            case 'cheque':
                return <FileText className="w-4 h-4" />;
            default:
                return <DollarSign className="w-4 h-4" />;
        }
    };

    const getMetodoPagoBadge = (metodo: string) => {
        const estilos: Record<string, string> = {
            transferencia: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300',
            efectivo: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300',
            cheque: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300'
        };

        return estilos[metodo] || estilos.efectivo;
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    Historial de Pagos
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {pagos.length} {pagos.length === 1 ? 'pago registrado' : 'pagos registrados'}
                </p>
            </div>

            {/* Tabla - Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Fecha
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Monto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Método
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Referencia
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Cuota
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {pagos.map((pago) => (
                            <tr
                                key={pago.uid}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-900 dark:text-white font-medium">
                                            {pago.fechaPagoFormateada}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                                        {pago.montoFormateado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getMetodoPagoBadge(pago.metodoPago)}`}>
                                        {getMetodoPagoIcon(pago.metodoPago)}
                                        {pago.metodoPagoFormateado}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">
                                        {pago.referencia || '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {pago.cuota && (
                                        <div className="text-sm">
                                            <span className="text-slate-900 dark:text-white font-medium">
                                                Cuota #{pago.cuota.numeroCuota}
                                            </span>
                                            {pago.cuota.venta && (
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    Lote {pago.cuota.venta.codigo}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-700">
                {pagos.map((pago) => (
                    <div key={pago.uid} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                    {pago.montoFormateado}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {pago.fechaPagoFormateada}
                                </p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getMetodoPagoBadge(pago.metodoPago)}`}>
                                {getMetodoPagoIcon(pago.metodoPago)}
                                {pago.metodoPagoFormateado}
                            </span>
                        </div>

                        {pago.cuota?.venta && (
                            <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                                <span className="font-medium">Lote {pago.cuota.venta.codigo}</span>
                                {' • '}
                                <span>Cuota #{pago.cuota.numeroCuota}</span>
                            </div>
                        )}

                        {pago.referencia && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                                Ref: {pago.referencia}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
