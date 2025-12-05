import { X, Calendar, DollarSign, CreditCard, FileText, Receipt, AlertCircle, CheckCircle } from 'lucide-react';
import type { Pago } from '../../types';

interface ModalDetallePagoProps {
    isOpen: boolean;
    pago: Pago | null;
    onCerrar: () => void;
}

export const ModalDetallePago = ({ isOpen, pago, onCerrar }: ModalDetallePagoProps) => {
    if (!isOpen || !pago) return null;

    const formatearFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getMetodoPagoBadge = () => {
        const estilos: Record<string, string> = {
            efectivo: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
            transferencia: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
            cheque: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
            tarjeta: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700'
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${estilos[pago.metodoPago] || estilos.efectivo}`}>
                <CreditCard className="w-4 h-4" />
                {pago.metodoPagoFormateado}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 flex-shrink-0">
                    <button
                        onClick={onCerrar}
                        className="absolute top-2 right-2 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-bold text-white pr-10">
                        Detalles del Pago
                    </h2>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Información del Pago */}
                    <div className="mb-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {pago.montoFormateado}
                            </h3>
                            {getMetodoPagoBadge()}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {pago.descripcion}
                        </p>
                    </div>

                    {/* Grid de información */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        {/* Fecha de Pago */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs font-medium">Fecha de Pago</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold text-sm">
                                {pago.fechaPagoFormateada}
                            </p>
                        </div>

                        {/* Número de Cuota */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <Receipt className="w-4 h-4" />
                                <span className="text-xs font-medium">Cuota</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold">
                                Cuota #{pago.cuota.numeroCuota}
                            </p>
                        </div>

                        {/* Cliente (si está disponible) */}
                        {pago.cuota.venta?.cliente && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600 md:col-span-2">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-xs font-medium">Cliente</span>
                                </div>
                                <p className="text-slate-900 dark:text-white font-semibold">
                                    {pago.cuota.venta.cliente}
                                </p>
                            </div>
                        )}

                        {/* Referencia (si existe) */}
                        {pago.referencia && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600 md:col-span-2">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-xs font-medium">Referencia</span>
                                </div>
                                <p className="text-slate-900 dark:text-white font-semibold font-mono">
                                    {pago.referencia}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Distribución del Pago (si aplica) */}
                    {(pago.montoAplicadoMora || pago.montoAplicadoCapital) && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 mb-5">
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Distribución del Pago
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {pago.montoAplicadoCapital && (
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Capital</p>
                                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                            {pago.montoAplicadoCapitalFormateado}
                                        </p>
                                    </div>
                                )}
                                {pago.montoAplicadoMora && (
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Mora</p>
                                        <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                            {pago.montoAplicadoMoraFormateado}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Observaciones */}
                    {pago.observaciones && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600 mb-5">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                                <FileText className="w-4 h-4" />
                                <span className="text-xs font-medium">Observaciones</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                {pago.observaciones}
                            </p>
                        </div>
                    )}

                    {/* Fechas de Registro */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-medium">Registrado</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold text-sm">
                                {formatearFecha(pago.creadoEn)}
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-xs font-medium">Última Actualización</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold text-sm">
                                {formatearFecha(pago.actualizadoEn)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end flex-shrink-0">
                    <button
                        onClick={onCerrar}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 text-sm"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
