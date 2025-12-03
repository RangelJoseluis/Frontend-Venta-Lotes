/**
 * Panel de Detalles del Lote Seleccionado
 * Se muestra en el lado derecho cuando se selecciona un lote
 */

import { X, MapPin, Ruler, DollarSign, Home, User, Phone, FileText } from 'lucide-react';
import type { LoteParaMapa } from '../../../types/mapa';
import { formatearPrecio } from '../utils/iconHelpers';

interface PanelDetallesProps {
    lote: LoteParaMapa | null;
    onCerrar: () => void;
}

const PanelDetalles = ({ lote, onCerrar }: PanelDetallesProps) => {
    if (!lote) return null;

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
        <div className="absolute top-0 right-0 h-full w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl z-[1001] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{lote.codigo}</h2>
                    {lote.esDelCliente && (
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">⭐ Tu Lote</span>
                    )}
                </div>
                <button
                    onClick={onCerrar}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                    <X size={20} className="text-slate-500 dark:text-slate-400" />
                </button>
            </div>

            {/* Contenido */}
            <div className="p-4 space-y-6">
                {/* Estado */}
                <div>
                    {getEstadoBadge(lote.estado)}
                </div>

                {/* Información Principal */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <MapPin size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ubicación</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{lote.ubicacion}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Ruler size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Superficie</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{lote.superficie} m²</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <DollarSign size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Precio</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">{formatearPrecio(lote.precio)}</p>
                        </div>
                    </div>
                </div>

                {/* Modelo de Casa */}
                {lote.modeloCasa && (
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Home size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Modelo de Casa</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.modeloCasa.nombre}</p>
                                {lote.modeloCasa.descripcion && (
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{lote.modeloCasa.descripcion}</p>
                                )}
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
                                    {formatearPrecio(lote.modeloCasa.precioBase)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Información del Cliente (si está vendido o en cuotas) */}
                {(lote.estado === 'vendido' || lote.estado === 'en_cuotas') && lote.clienteNombre && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">Información del Cliente</h3>

                        <div className="flex items-start gap-3">
                            <User size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">Nombre</p>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{lote.clienteNombre}</p>
                            </div>
                        </div>

                        {lote.clienteCedula && (
                            <div className="flex items-start gap-3">
                                <FileText size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">Cédula</p>
                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{lote.clienteCedula}</p>
                                </div>
                            </div>
                        )}

                        {lote.clienteTelefono && (
                            <div className="flex items-start gap-3">
                                <Phone size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">Teléfono</p>
                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">{lote.clienteTelefono}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Características Adicionales */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Características</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {lote.topografia && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Topografía</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{lote.topografia}</p>
                            </div>
                        )}
                        {lote.estadoDocumentacion && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400">Documentación</p>
                                <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{lote.estadoDocumentacion}</p>
                            </div>
                        )}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                            <p className="text-xs text-slate-500 dark:text-slate-400">Amueblado</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{lote.amueblado ? 'Sí' : 'No'}</p>
                        </div>
                    </div>
                </div>

                {/* Imágenes */}
                {lote.imagenesUrls && lote.imagenesUrls.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Imágenes</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {lote.imagenesUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Imagen ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PanelDetalles;
