import { X, Calendar, DollarSign, Tag, FileText, CheckCircle, XCircle, AlertCircle, Building2 } from 'lucide-react';
import type { Servicio } from '../../types';

interface ModalDetalleServicioProps {
    isOpen: boolean;
    servicio: Servicio | null;
    onCerrar: () => void;
}

export const ModalDetalleServicio = ({ isOpen, servicio, onCerrar }: ModalDetalleServicioProps) => {
    if (!isOpen || !servicio) return null;

    const formatearFecha = (fecha: string) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatearMoneda = (valor: number) => {
        // Validar que sea un número válido
        if (isNaN(valor) || valor === null || valor === undefined) {
            return 'No disponible';
        }

        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(valor);
    };

    const getEstadoBadge = () => {
        const estilos: Record<typeof servicio.estado, string> = {
            activo: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
            inactivo: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
            suspendido: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700'
        };

        const iconos: Record<typeof servicio.estado, JSX.Element> = {
            activo: <CheckCircle className="w-4 h-4" />,
            inactivo: <XCircle className="w-4 h-4" />,
            suspendido: <AlertCircle className="w-4 h-4" />
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${estilos[servicio.estado]}`}>
                {iconos[servicio.estado]}
                {servicio.estado.charAt(0).toUpperCase() + servicio.estado.slice(1)}
            </span>
        );
    };

    const getTipoBadge = () => {
        const estilos: Record<typeof servicio.tipo, string> = {
            esencial: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
            opcional: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
            temporal: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
            publico: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700'
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${estilos[servicio.tipo]}`}>
                {servicio.tipo.charAt(0).toUpperCase() + servicio.tipo.slice(1)}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                {/* Header - Más compacto */}
                <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 flex-shrink-0">
                    <button
                        onClick={onCerrar}
                        className="absolute top-2 right-2 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-xl font-bold text-white pr-10">
                        Detalles del Servicio
                    </h2>
                </div>

                {/* Content - Con scroll interno */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Nombre y Estado */}
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                            {servicio.nombre}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {getEstadoBadge()}
                            {getTipoBadge()}
                            {servicio.esencial && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700">
                                    Esencial
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Grid de información */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        {/* Categoría */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <Tag className="w-4 h-4" />
                                <span className="text-xs font-medium">Categoría</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold capitalize">
                                {servicio.categoria}
                            </p>
                        </div>

                        {/* Costo Mensual */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <DollarSign className="w-4 h-4" />
                                <span className="text-xs font-medium">Costo Mensual Base</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold text-lg">
                                {formatearMoneda(servicio.costoMensualBase)}
                            </p>
                        </div>

                        {/* Proveedor */}
                        {servicio.proveedor && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                    <Building2 className="w-4 h-4" />
                                    <span className="text-xs font-medium">Proveedor</span>
                                </div>
                                <p className="text-slate-900 dark:text-white font-semibold">
                                    {servicio.proveedor}
                                </p>
                            </div>
                        )}

                        {/* Fecha de Creación */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs font-medium">Fecha de Creación</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold text-sm">
                                {formatearFecha(servicio.creadoEn)}
                            </p>
                        </div>

                        {/* Última Actualización */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600 md:col-span-2">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-1.5">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs font-medium">Última Actualización</span>
                            </div>
                            <p className="text-slate-900 dark:text-white font-semibold text-sm">
                                {formatearFecha(servicio.actualizadoEn)}
                            </p>
                        </div>
                    </div>

                    {/* Descripción */}
                    {servicio.descripcion && (
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 border border-slate-200 dark:border-slate-600">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-2">
                                <FileText className="w-4 h-4" />
                                <span className="text-xs font-medium">Descripción</span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                {servicio.descripcion}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer - Fijo en la parte inferior */}
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex justify-end flex-shrink-0">
                    <button
                        onClick={onCerrar}
                        className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 text-sm"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
