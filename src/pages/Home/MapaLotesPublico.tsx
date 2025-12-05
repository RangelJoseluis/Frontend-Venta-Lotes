import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { Loader2 } from 'lucide-react';
import type { LoteParaMapa } from '../../types/mapa';
import { TILES_CONFIG } from '../../types/mapa';
import { obtenerCentroZona, obtenerZoomZona } from '../../config/zona.config';
import lotesMapaService from '../../services/lotes-mapa.service';
import 'leaflet/dist/leaflet.css';

/**
 * Componente de Mapa Público para Home
 * Muestra solo lotes disponibles para invitados
 */
const MapaLotesPublico: React.FC = () => {
    const [lotes, setLotes] = useState<LoteParaMapa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [centroZona, setCentroZona] = useState(obtenerCentroZona());
    const [zoomZona, setZoomZona] = useState(obtenerZoomZona());
    const [key, setKey] = useState(0); // Para forzar re-render del mapa

    // Cargar lotes disponibles para invitados
    useEffect(() => {
        cargarLotesDisponibles();
    }, []);

    // Escuchar cambios en la configuración de zona
    useEffect(() => {
        const handleZonaUpdate = () => {
            setCentroZona(obtenerCentroZona());
            setZoomZona(obtenerZoomZona());
            setKey(prev => prev + 1); // Forzar re-render del MapContainer
            console.log('🗺️ Mapa público actualizado con nueva configuración de zona');
        };

        window.addEventListener('zona-config-updated', handleZonaUpdate);
        return () => window.removeEventListener('zona-config-updated', handleZonaUpdate);
    }, []);

    const cargarLotesDisponibles = async () => {
        try {
            setLoading(true);
            setError(null);

            // Usar endpoint de lotes visibles para invitados
            const lotesData = await lotesMapaService.obtenerLotesVisibles('invitado');
            setLotes(lotesData);

            console.log(`✅ ${lotesData.length} lote(s) disponibles cargados`);
        } catch (err: any) {
            setError('Error al cargar los lotes disponibles');
            console.error('❌ Error al cargar lotes:', err);
        } finally {
            setLoading(false);
        }
    };

    const obtenerColorLote = (estado: string) => {
        if (estado === 'disponible') return '#10b981'; // Verde
        return '#6b7280'; // Gris
    };

    if (loading) {
        return (
            <div className="h-[600px] flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-300">Cargando mapa...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-[600px] flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <button
                        onClick={cargarLotesDisponibles}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[500px]">
            {/* Mapa */}
            <MapContainer
                key={key}
                center={centroZona}
                zoom={zoomZona}
                className="h-full w-full rounded-xl"
                zoomControl={true}
            >
                <TileLayer
                    attribution={TILES_CONFIG.satelite.atribucion}
                    url={TILES_CONFIG.satelite.url}
                    maxZoom={TILES_CONFIG.satelite.maxZoom}
                />

                {/* Renderizar lotes */}
                {lotes.map((lote) => {
                    // Parsear geojson si viene como string
                    let geojsonParsed: any = lote.geojson;
                    if (typeof geojsonParsed === 'string') {
                        try {
                            geojsonParsed = JSON.parse(geojsonParsed);
                        } catch (e) {
                            console.warn(`Error parseando geojson del lote ${lote.codigo}`);
                            return null;
                        }
                    }

                    if (geojsonParsed && geojsonParsed.coordinates && geojsonParsed.coordinates[0]) {
                        // Renderizar como polígono
                        const coords = geojsonParsed.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
                        return (
                            <Polygon
                                key={lote.uid}
                                positions={coords}
                                pathOptions={{
                                    color: obtenerColorLote(lote.estado),
                                    fillColor: obtenerColorLote(lote.estado),
                                    fillOpacity: 0.5,
                                    weight: 2
                                }}
                            >
                                <Popup>
                                    <div className="p-2">
                                        <h3 className="font-bold text-lg">{lote.codigo}</h3>
                                        <p className="text-sm text-slate-600">
                                            {lote.superficie} m²
                                        </p>
                                        <p className="text-sm font-semibold text-green-600 mt-1">
                                            ${lote.precio.toLocaleString('es-CO')}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {lote.ubicacion}
                                        </p>
                                    </div>
                                </Popup>
                            </Polygon>
                        );
                    }
                    return null;
                })}
            </MapContainer>

            {/* Leyenda */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 z-[400] border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Leyenda</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-slate-700 dark:text-slate-300">Disponible</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                    {lotes.length} lote(s) disponible(s)
                </p>
            </div>
        </div>
    );
};

export default MapaLotesPublico;
