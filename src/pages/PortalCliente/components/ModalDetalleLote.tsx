import React from 'react';
import { X, Home, MapPin, DollarSign, Calendar, FileText } from 'lucide-react';
import type { VentaResumen } from '../../../types';

interface ModalDetalleLoteProps {
    venta: VentaResumen | null;
    onClose: () => void;
}

export const ModalDetalleLote: React.FC<ModalDetalleLoteProps> = ({ venta, onClose }) => {
    if (!venta) return null;

    const formatearMoneda = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    const formatearFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const porcentajePagado = ((venta.precioVenta - venta.montoPendiente) / venta.precioVenta * 100);

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal - Diseño compacto 2 columnas */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-screen overflow-hidden pointer-events-auto animate-slideUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header compacto con imagen de fondo */}
                    <div className="relative h-46 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                        {venta.lote.modeloCasa?.imagenes && venta.lote.modeloCasa.imagenes.length > 0 ? (
                            <img
                                src={venta.lote.modeloCasa.imagenes[0]}
                                alt={`Modelo ${venta.lote.modeloCasa.nombre}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Home className="w-20 h-20 text-white/30" />
                            </div>
                        )}

                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Título */}
                        <div className="absolute bottom-4 left-6 right-6">
                            <h2 className="text-3xl font-bold text-white mb-1">
                                Lote {venta.lote.codigo}
                            </h2>
                            <p className="text-white/90 text-sm">
                                {venta.lote.modeloCasa?.nombre || 'Sin modelo asignado'} • {venta.lote.superficieM2} m²
                            </p>
                        </div>
                    </div>

                    {/* Contenido en 2 columnas */}
                    <div className="grid md:grid-cols-2 gap-6 p-6 max-h-[calc(85vh-12rem)] overflow-y-auto">

                        {/* COLUMNA IZQUIERDA */}
                        <div className="space-y-4">
                            {/* Información del Lote */}
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    Información del Lote
                                </h3>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Código</p>
                                        <p className="font-semibold text-slate-800 dark:text-white">{venta.lote.codigo}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Superficie</p>
                                        <p className="font-semibold text-slate-800 dark:text-white">{venta.lote.superficieM2} m²</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Estado</p>
                                        <p className="font-semibold text-slate-800 dark:text-white capitalize">
                                            {venta.lote.estado.replace('_', ' ')}
                                        </p>
                                    </div>

                                    {venta.lote.modeloCasa && (
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Modelo</p>
                                            <p className="font-semibold text-slate-800 dark:text-white">{venta.lote.modeloCasa.nombre}</p>
                                        </div>
                                    )}
                                </div>

                                {venta.lote.modeloCasa?.descripcion && (
                                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Descripción</p>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                            {venta.lote.modeloCasa.descripcion}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Detalles de Venta */}
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-indigo-600" />
                                    Detalles de la Venta
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Fecha de Venta
                                        </span>
                                        <span className="font-semibold text-slate-800 dark:text-white">
                                            {formatearFecha(venta.fechaVenta)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Estado</span>
                                        <span className="font-semibold text-slate-800 dark:text-white capitalize">
                                            {venta.estado}
                                        </span>
                                    </div>

                                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">ID de Venta</p>
                                        <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 p-1.5 rounded truncate">
                                            {venta.uid}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA */}
                        <div className="space-y-4">
                            {/* Información Financiera */}
                            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-4 border border-emerald-200 dark:border-slate-700">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-emerald-600" />
                                    Información Financiera
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Precio Total</p>
                                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                            {formatearMoneda(venta.precioVenta)}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Monto Inicial</p>
                                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                {formatearMoneda(venta.montoInicial)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Pendiente</p>
                                            <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                                {formatearMoneda(venta.montoPendiente)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-200 dark:border-slate-700">
                                        <div>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Modalidad</p>
                                            <p className="text-sm font-semibold text-slate-800 dark:text-white capitalize">
                                                {venta.modalidadPago}
                                            </p>
                                        </div>

                                        {venta.modalidadPago === 'cuotas' && venta.cantidadCuotas && (
                                            <div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-0.5">Cuotas</p>
                                                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                                    {venta.cantidadCuotas} meses
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Progreso de Pago */}
                            {venta.modalidadPago === 'cuotas' && (
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-4 border border-blue-200 dark:border-slate-700">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">
                                        Progreso de Pago
                                    </h3>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                                            <span>Pagado</span>
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                {porcentajePagado.toFixed(1)}%
                                            </span>
                                        </div>

                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500 rounded-full"
                                                style={{ width: `${porcentajePagado}%` }}
                                            />
                                        </div>

                                        <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                                            <span>{formatearMoneda(venta.precioVenta - venta.montoPendiente)}</span>
                                            <span>{formatearMoneda(venta.precioVenta)}</span>
                                        </div>

                                        {/* Estadísticas rápidas */}
                                        <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-blue-200 dark:border-slate-700">
                                            <div className="text-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Valor Cuota Aprox.</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                    {formatearMoneda((venta.precioVenta - venta.montoInicial) / (venta.cantidadCuotas || 1))}
                                                </p>
                                            </div>
                                            <div className="text-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Cuotas Restantes</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                    {Math.ceil((venta.montoPendiente / ((venta.precioVenta - venta.montoInicial) / (venta.cantidadCuotas || 1))))} aprox.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer fijo */}
                    <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-colors text-sm"
                            >
                                Cerrar
                            </button>
                            <button
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 text-sm"
                            >
                                Ver Estado de Cuenta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
