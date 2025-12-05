import React from 'react';
import { Calendar, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { Cuota } from '../../../types';

interface TablaCuotasProps {
    cuotas: Cuota[];
    loading: boolean;
}

export const TablaCuotas: React.FC<TablaCuotasProps> = ({ cuotas, loading }) => {
    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6">
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (cuotas.length === 0) {
        return (
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                        No hay cuotas registradas
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Cuando tengas cuotas pendientes o pagadas, aparecerán aquí.
                    </p>
                </div>
            </div>
        );
    }

    const getEstadoBadge = (estado: string) => {
        const estilos: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
            pagada: {
                bg: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300',
                text: 'Pagada',
                icon: <CheckCircle className="w-4 h-4" />
            },
            pendiente: {
                bg: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300',
                text: 'Pendiente',
                icon: <Clock className="w-4 h-4" />
            },
            parcial: {
                bg: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300',
                text: 'Parcial',
                icon: <Clock className="w-4 h-4" />
            },
            vencida: {
                bg: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300',
                text: 'Vencida',
                icon: <AlertCircle className="w-4 h-4" />
            }
        };

        return estilos[estado] || estilos.pendiente;
    };

    const formatearMoneda = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    Detalle de Cuotas
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {cuotas.length} {cuotas.length === 1 ? 'cuota registrada' : 'cuotas registradas'}
                </p>
            </div>

            {/* Tabla - Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Cuota
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Lote
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Vencimiento
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Monto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Pagado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Pendiente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {cuotas.map((cuota) => {
                            const estadoBadge = getEstadoBadge(cuota.estado);
                            return (
                                <tr
                                    key={cuota.uid}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            #{cuota.numeroCuota}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                                            {cuota.venta?.codigo || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900 dark:text-white">
                                                {new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        {cuota.estaVencida && !cuota.estaPagada && (
                                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                                                {cuota.diasVencimiento} días vencida
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                            {formatearMoneda(cuota.valor)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                            {formatearMoneda(cuota.montoPagado)}
                                        </span>
                                        {cuota.porcentajePagado > 0 && (
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {cuota.porcentajePagado}%
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                            {formatearMoneda(cuota.montoPendiente)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${estadoBadge.bg}`}>
                                            {estadoBadge.icon}
                                            {estadoBadge.text}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Cards - Mobile */}
            <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-700">
                {cuotas.map((cuota) => {
                    const estadoBadge = getEstadoBadge(cuota.estado);
                    return (
                        <div key={cuota.uid} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        Cuota #{cuota.numeroCuota} - {cuota.venta?.codigo}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO')}
                                    </p>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${estadoBadge.bg}`}>
                                    {estadoBadge.icon}
                                    {estadoBadge.text}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Monto</p>
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        {formatearMoneda(cuota.valor)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Pagado</p>
                                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        {formatearMoneda(cuota.montoPagado)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Pendiente</p>
                                    <p className="font-semibold text-amber-600 dark:text-amber-400">
                                        {formatearMoneda(cuota.montoPendiente)}
                                    </p>
                                </div>
                            </div>

                            {cuota.estaVencida && !cuota.estaPagada && (
                                <div className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                                    ⚠️ Vencida hace {cuota.diasVencimiento} días
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
