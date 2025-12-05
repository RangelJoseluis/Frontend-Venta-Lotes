import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { useCuotasCliente } from '../hooks/useCuotasCliente';
import { TablaCuotas } from './TablaCuotas';

export const EstadoCuenta: React.FC = () => {
    const { cuotas, resumen, loading, error } = useCuotasCliente();

    const formatearMoneda = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    const formatearFecha = (fecha: string | null) => {
        if (!fecha) return 'No hay cuotas pendientes';
        return new Date(fecha).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const calcularDiasHastaVencimiento = (fecha: string | null) => {
        if (!fecha) return null;
        const hoy = new Date();
        const vencimiento = new Date(fecha);
        const diff = Math.ceil((vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
                            Error al cargar estado de cuenta
                        </h3>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const diasHastaVencimiento = calcularDiasHastaVencimiento(resumen.proximoVencimiento);

    return (
        <div className="space-y-6">
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total de Cuotas */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <FileText className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-blue-100 mb-1">
                        Total de Cuotas
                    </h3>
                    <p className="text-3xl font-bold">
                        {loading ? '...' : resumen.totalCuotas}
                    </p>
                </div>

                {/* Cuotas Pagadas */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-emerald-100 mb-1">
                        Cuotas Pagadas
                    </h3>
                    <p className="text-3xl font-bold">
                        {loading ? '...' : resumen.cuotasPagadas}
                    </p>
                    {!loading && resumen.totalCuotas > 0 && (
                        <p className="text-sm text-emerald-100 mt-1">
                            {Math.round((resumen.cuotasPagadas / resumen.totalCuotas) * 100)}% completado
                        </p>
                    )}
                </div>

                {/* Cuotas Pendientes */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-amber-100 mb-1">
                        Cuotas Pendientes
                    </h3>
                    <p className="text-3xl font-bold">
                        {loading ? '...' : resumen.cuotasPendientes}
                    </p>
                </div>

                {/* Cuotas Vencidas */}
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg shadow-red-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-red-100 mb-1">
                        Cuotas Vencidas
                    </h3>
                    <p className="text-3xl font-bold">
                        {loading ? '...' : resumen.cuotasVencidas}
                    </p>
                </div>
            </div>

            {/* Resumen Financiero */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                        Monto Total
                    </h4>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {loading ? '...' : formatearMoneda(resumen.montoTotalCuotas)}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                        Total Pagado
                    </h4>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {loading ? '...' : formatearMoneda(resumen.montoPagado)}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                        Saldo Pendiente
                    </h4>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {loading ? '...' : formatearMoneda(resumen.montoPendiente)}
                    </p>
                </div>
            </div>

            {/* Próximo Vencimiento */}
            {!loading && resumen.proximoVencimiento && (
                <div className={`rounded-2xl p-6 border-2 ${diasHastaVencimiento !== null && diasHastaVencimiento < 7
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                    }`}>
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${diasHastaVencimiento !== null && diasHastaVencimiento < 7
                                ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                                : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                            }`}>
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 ${diasHastaVencimiento !== null && diasHastaVencimiento < 7
                                    ? 'text-red-900 dark:text-red-200'
                                    : 'text-blue-900 dark:text-blue-200'
                                }`}>
                                {diasHastaVencimiento !== null && diasHastaVencimiento < 0
                                    ? '⚠️ Cuota Vencida'
                                    : '🔔 Próximo Vencimiento'
                                }
                            </h3>
                            <p className={`text-sm ${diasHastaVencimiento !== null && diasHastaVencimiento < 7
                                    ? 'text-red-700 dark:text-red-300'
                                    : 'text-blue-700 dark:text-blue-300'
                                }`}>
                                {formatearFecha(resumen.proximoVencimiento)}
                                {diasHastaVencimiento !== null && (
                                    <span className="font-semibold ml-2">
                                        {diasHastaVencimiento < 0
                                            ? `(Vencida hace ${Math.abs(diasHastaVencimiento)} días)`
                                            : diasHastaVencimiento === 0
                                                ? '(Vence hoy)'
                                                : `(En ${diasHastaVencimiento} días)`
                                        }
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabla de Cuotas */}
            <TablaCuotas cuotas={cuotas} loading={loading} />
        </div>
    );
};
