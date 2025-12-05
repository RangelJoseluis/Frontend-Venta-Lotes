/**
 * Panel de Detalles del Lote Seleccionado
 * Versión migrada a Tailwind CSS con todas las funcionalidades
 */

import { X, MapPin, Ruler, DollarSign, Home, User, Phone, FileText, Maximize2, Edit } from 'lucide-react';
import type { LoteParaMapa } from '../../../types/mapa';
import { formatearPrecio } from '../utils/iconHelpers';
import { useAuthStore } from '../../../store/authStore';

interface PanelDetallesProps {
    lote: LoteParaMapa | null;
    onCerrar: () => void;
}

const PanelDetalles = ({ lote, onCerrar }: PanelDetallesProps) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!lote) return null;

    // Detectar rol del usuario
    const esAdmin = isAuthenticated && user?.roles?.includes('admin');

    const getEstadoBadge = (estado: string) => {
        const estilos = {
            disponible: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
            en_cuotas: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
            vendido: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
        };
        const labels = {
            disponible: 'Disponible',
            en_cuotas: 'En Cuotas',
            vendido: 'Vendido',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${estilos[estado as keyof typeof estilos]}`}>
                {labels[estado as keyof typeof labels]}
            </span>
        );
    };

    return (
        <>
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] transition-opacity"
                onClick={onCerrar}
            />

            {/* Panel lateral */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white dark:bg-slate-800 shadow-2xl z-[1001] overflow-y-auto animate-slide-in-right">
                {/* Header fijo */}
                <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{lote.codigo}</h2>
                        {lote.esDelCliente && (
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">⭐ Tu Lote</span>
                        )}
                    </div>
                    <button
                        onClick={onCerrar}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="Cerrar panel"
                    >
                        <X size={20} className="text-slate-500 dark:text-slate-400" />
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-6">
                    {/* Estado */}
                    <div>
                        {getEstadoBadge(lote.estado)}
                    </div>

                    {/* Información Principal */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                            Información General
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <MapPin size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ubicación</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{lote.ubicacion}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <Maximize2 size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Superficie</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{lote.superficie} m²</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <DollarSign size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Precio</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{formatearPrecio(lote.precio)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modelo de Casa */}
                    {lote.modeloCasa && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-3">
                                <Home size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">Modelo de Casa</p>
                                    <p className="text-base font-semibold text-blue-900 dark:text-blue-200">{lote.modeloCasa.nombre}</p>
                                    {lote.modeloCasa.descripcion && (
                                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">{lote.modeloCasa.descripcion}</p>
                                    )}
                                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
                                        Precio base: {formatearPrecio(lote.modeloCasa.precioBase)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Información del Cliente (si está vendido o en cuotas) */}
                    {(lote.estado === 'vendido' || lote.estado === 'en_cuotas') && lote.clienteNombre && (
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                            <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 mb-3 uppercase tracking-wider">
                                Información del Cliente
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Nombre</p>
                                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">{lote.clienteNombre}</p>
                                    </div>
                                </div>

                                {lote.clienteCedula && (
                                    <div className="flex items-start gap-3">
                                        <FileText size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Cédula</p>
                                            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">{lote.clienteCedula}</p>
                                        </div>
                                    </div>
                                )}

                                {lote.clienteTelefono && (
                                    <div className="flex items-start gap-3">
                                        <Phone size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Teléfono</p>
                                            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">{lote.clienteTelefono}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Características Adicionales */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Características</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {lote.topografia && (
                                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Topografía</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{lote.topografia}</p>
                                </div>
                            )}
                            {lote.estadoDocumentacion && (
                                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Documentación</p>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{lote.estadoDocumentacion}</p>
                                </div>
                            )}
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Amueblado</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{lote.amueblado ? 'Sí' : 'No'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Imágenes */}
                    {lote.imagenesUrls && lote.imagenesUrls.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Imágenes</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {lote.imagenesUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`${lote.codigo} - Imagen ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fechas */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Información Adicional</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Creado</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {new Date(lote.creadoEn).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Actualizado</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {new Date(lote.actualizadoEn).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                        <a
                            href={`/lotes/${lote.uid}`}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                            <Home size={18} />
                            Ver Detalles Completos
                        </a>

                        {esAdmin && (
                            <a
                                href={`/lotes/${lote.uid}/editar`}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                <Edit size={18} />
                                Editar Lote
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PanelDetalles;
