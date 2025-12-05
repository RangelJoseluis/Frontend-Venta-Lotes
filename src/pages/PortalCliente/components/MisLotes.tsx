import React from 'react';
import { Home, MapPin, ChevronRight } from 'lucide-react';
import type { VentaResumen } from '../../../types';

interface MisLotesProps {
    ventas: VentaResumen[];
    loading: boolean;
}

export const MisLotes: React.FC<MisLotesProps> = ({ ventas, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse">
                        <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4"></div>
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (ventas.length === 0) {
        return (
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                        Aún no tienes lotes
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Cuando adquieras un lote, aparecerá aquí con toda su información.
                    </p>
                </div>
            </div>
        );
    }

    const formatearMoneda = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    const getEstadoBadge = (estado: string) => {
        const estilos: Record<string, string> = {
            activa: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
            completada: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
            cancelada: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
        };

        const textos: Record<string, string> = {
            activa: 'En Cuotas',
            completada: 'Pagado',
            cancelada: 'Cancelado'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${estilos[estado] || estilos.activa}`}>
                {textos[estado] || estado}
            </span>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventas.map((venta) => (
                <div
                    key={venta.uid}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                    {/* Imagen del lote/modelo de casa */}
                    <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                        {venta.lote.modeloCasa?.imagenes && venta.lote.modeloCasa.imagenes.length > 0 ? (
                            <img
                                src={venta.lote.modeloCasa.imagenes[0]}
                                alt={`Modelo ${venta.lote.modeloCasa.nombre}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Home className="w-16 h-16 text-white/30" />
                            </div>
                        )}
                        <div className="absolute top-3 right-3">
                            {getEstadoBadge(venta.estado)}
                        </div>
                    </div>

                    {/* Información del lote */}
                    <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                                    Lote {venta.lote.codigo}
                                </h3>
                                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                                    <MapPin className="w-4 h-4" />
                                    <span>{venta.lote.superficieM2} m²</span>
                                </div>
                            </div>
                        </div>

                        {/* Precio */}
                        <div className="mb-4">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Precio Total</p>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {formatearMoneda(venta.precioVenta)}
                            </p>
                        </div>

                        {/* Detalles */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Modalidad:</span>
                                <span className="font-semibold text-slate-800 dark:text-white capitalize">
                                    {venta.modalidadPago}
                                </span>
                            </div>
                            {venta.modalidadPago === 'cuotas' && venta.cantidadCuotas && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">Cuotas:</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">
                                        {venta.cantidadCuotas} meses
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">Pendiente:</span>
                                <span className="font-semibold text-amber-600 dark:text-amber-400">
                                    {formatearMoneda(venta.montoPendiente)}
                                </span>
                            </div>
                        </div>

                        {/* Botón Ver Detalles */}
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm group-hover:shadow-md">
                            <span>Ver Detalles</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
