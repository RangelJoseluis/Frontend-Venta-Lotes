import React, { useState, useEffect } from 'react';
import { X, Map as MapIcon, Satellite } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';
import httpClient from '../../../services/http.service';
import lotesMapaService from '../../../services/lotes-mapa.service';
import type { LoteParaMapa, TipoCapaMapa } from '../../../types/mapa';
import { TILES_CONFIG } from '../../../types/mapa';
import { obtenerCentroZona, obtenerZoomZona } from '../../../config/zona.config';

// Componentes reutilizables de MapaLotes
import LotePolygon from '../../MapaLotes/components/LotePolygon';
import LoteMarker from '../../MapaLotes/components/LoteMarker';
import SelectorCapas from '../../MapaLotes/components/SelectorCapas';
import PanelDetalles from '../../MapaLotes/components/PanelDetalles';
import MapController from '../../MapaLotes/components/MapController';

// Estilos de Leaflet
import 'leaflet/dist/leaflet.css';

interface ModalMapaSatelitalClienteProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalMapaSatelitalCliente: React.FC<ModalMapaSatelitalClienteProps> = ({ isOpen, onClose }) => {
    const [lotes, setLotes] = useState<LoteParaMapa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tipoCapa, setTipoCapa] = useState<TipoCapaMapa>('satelite');
    const [loteSeleccionado, setLoteSeleccionado] = useState<LoteParaMapa | null>(null);

    // Cargar lotes del cliente cuando se abre el modal
    useEffect(() => {
        if (isOpen) {
            cargarLotesCliente();
        }
    }, [isOpen]);

    const cargarLotesCliente = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener ventas del cliente
            const response = await httpClient.get('/ventas/mis-ventas');
            const ventas = response.data;

            console.log(`✅ ${ventas.length} venta(s) del cliente obtenidas`);

            // Mapear ventas a formato LoteParaMapa usando el servicio que ya parsea geojson
            const lotesMapeados: LoteParaMapa[] = ventas.map((venta: any) => {
                const loteMapeado = lotesMapaService.mapearLoteBackendAFrontend(venta.lote);
                console.log('🔍 Lote mapeado:', loteMapeado);
                return loteMapeado;
            });

            setLotes(lotesMapeados);
            console.log(`🗺️ ${lotesMapeados.length} lote(s) mapeados para el mapa`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar los lotes');
            console.error('❌ Error al cargar lotes:', err);
        } finally {
            setLoading(false);
        }
    };

    // Lote destacado para zoom automático (si solo tiene 1 lote)
    const loteDestacado = lotes.length === 1 ? lotes[0] : null;

    const handleSelectLote = (lote: LoteParaMapa) => {
        setLoteSeleccionado(lote);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                <div className="relative w-full max-w-5xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all max-h-[95vh] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Satellite className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                    Mapa Satelital - Mis Lotes
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {lotes.length > 0 ? `${lotes.length} lote(s) de tu propiedad` : 'Cargando...'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Selector de Capas */}
                            <SelectorCapas tipoCapa={tipoCapa} onCambiarCapa={setTipoCapa} />

                            {/* Botón Cerrar */}
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                            </button>
                        </div>
                    </div>

                    {/* Leyenda Simplificada */}
                    <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded shadow-sm"></div>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    Vendido (Pagado Completamente)
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded shadow-sm"></div>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    En Cuotas (Proceso de Pago)
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded shadow-sm"></div>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                    Disponible
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mapa */}
                    <div className="relative flex-1 overflow-hidden">
                        {/* Panel de Detalles (Slide-over) */}
                        {loteSeleccionado && (
                            <PanelDetalles
                                lote={loteSeleccionado}
                                onCerrar={() => setLoteSeleccionado(null)}
                            />
                        )}

                        {/* Contenedor del Mapa */}
                        <div className="h-[500px] w-full relative">
                            {loading && (
                                <div className="absolute inset-0 z-50 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                        <p className="text-slate-600 dark:text-slate-300 font-medium">Cargando mapa...</p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="absolute inset-0 z-50 bg-white/90 dark:bg-slate-900/90 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                                        <button
                                            onClick={cargarLotesCliente}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Reintentar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!error && !loading && lotes.length === 0 && (
                                <div className="absolute inset-0 z-50 bg-white/90 dark:bg-slate-900/90 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                        <p className="text-slate-600 dark:text-slate-300 font-medium">
                                            No tienes lotes registrados
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!error && lotes.length > 0 && (
                                <MapContainer
                                    center={obtenerCentroZona()}
                                    zoom={obtenerZoomZona()}
                                    style={{ height: '100%', width: '100%' }}
                                    className="rounded-b-2xl"
                                >
                                    <TileLayer
                                        key={tipoCapa}
                                        url={TILES_CONFIG[tipoCapa].url}
                                        attribution={TILES_CONFIG[tipoCapa].atribucion}
                                        maxZoom={22}
                                    />

                                    {/* Controlador de zoom automático */}
                                    <MapController loteDestacado={loteDestacado} />

                                    {/* Renderizar polígonos de lotes */}
                                    {lotes.map((lote) => (
                                        <LotePolygon
                                            key={`poly-${lote.uid}`}
                                            lote={lote}
                                            esDestacado={lote.uid === loteSeleccionado?.uid}
                                            onSelectLote={handleSelectLote}
                                        />
                                    ))}

                                    {/* Renderizar marcadores de lotes */}
                                    {lotes.map((lote) => (
                                        <LoteMarker
                                            key={`marker-${lote.uid}`}
                                            lote={lote}
                                            esDestacado={lote.uid === loteSeleccionado?.uid}
                                            onSelectLote={handleSelectLote}
                                        />
                                    ))}
                                </MapContainer>
                            )}
                        </div>
                    </div>

                    {/* Footer con información */}
                    {!loading && !error && lotes.length > 0 && (
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    <strong>Tip:</strong> Haz click en un lote para ver más detalles
                                </p>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
