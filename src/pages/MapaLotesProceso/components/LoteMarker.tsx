/**
 * Componente LoteMarker - Marcador individual de lote en el mapa
 */

import { Marker, Popup } from 'react-leaflet';
import type { LoteParaMapa } from '../../../types/mapa';
import { crearIconoLote, formatearPrecio } from '../utils/iconHelpers';

interface LoteMarkerProps {
    lote: LoteParaMapa;
    esDestacado?: boolean;
    onSelectLote?: (lote: LoteParaMapa) => void;
}

/**
 * Parsear coordenadas desde string "lat,lng" o desde geojson
 */
const parsearCoordenadas = (lote: LoteParaMapa): [number, number] | null => {
    // Intentar primero con coordenadas legacy (string "lat,lng")
    if (lote.coordenadas && typeof lote.coordenadas === 'string') {
        const partes = lote.coordenadas.split(',');
        if (partes.length === 2) {
            const lat = parseFloat(partes[0].trim());
            const lng = parseFloat(partes[1].trim());
            if (!isNaN(lat) && !isNaN(lng)) {
                return [lat, lng];
            }
        }
    }

    // Intentar con geojson
    if (lote.geojson && typeof lote.geojson === 'string') {
        try {
            const geojsonObj = JSON.parse(lote.geojson);
            if (geojsonObj.type === 'Point' && Array.isArray(geojsonObj.coordinates)) {
                // GeoJSON usa [lng, lat], Leaflet usa [lat, lng]
                const [lng, lat] = geojsonObj.coordinates;
                if (!isNaN(lat) && !isNaN(lng)) {
                    return [lat, lng];
                }
            }
            // Si es un polígono, usar el centroide (primer punto)
            if (geojsonObj.type === 'Polygon' && Array.isArray(geojsonObj.coordinates[0])) {
                const [lng, lat] = geojsonObj.coordinates[0][0];
                if (!isNaN(lat) && !isNaN(lng)) {
                    return [lat, lng];
                }
            }
        } catch (error) {
            console.error('Error al parsear geojson:', error);
        }
    }

    return null;
};

const LoteMarker = ({ lote, esDestacado = false, onSelectLote }: LoteMarkerProps) => {
    const coordenadas = parsearCoordenadas(lote);

    if (!coordenadas) {
        console.warn(`Lote ${lote.codigo} no tiene coordenadas válidas`);
        return null;
    }

    const handleClick = () => {
        // Ya no seleccionamos automáticamente al hacer click
        // if (onSelectLote) {
        //     onSelectLote(lote);
        // }
    };

    return (
        <Marker
            position={coordenadas}
            icon={crearIconoLote(lote, esDestacado)}
            eventHandlers={{
                click: handleClick
            }}
        >
            <Popup>
                <div className="p-2 min-w-[200px]">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-900">{lote.codigo}</span>
                        <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium text-white capitalize"
                            style={{ backgroundColor: lote.estado === 'disponible' ? '#10b981' : lote.estado === 'vendido' ? '#ef4444' : '#f59e0b' }}
                        >
                            {lote.estado.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="space-y-1 text-sm text-slate-600 mb-3">
                        <div className="flex justify-between">
                            <span>Precio:</span>
                            <span className="font-semibold text-slate-900">
                                {formatearPrecio(lote.precio)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Superficie:</span>
                            <span className="font-semibold text-slate-900">
                                {lote.superficie} m²
                            </span>
                        </div>
                    </div>

                    {onSelectLote && (
                        <button
                            onClick={() => onSelectLote(lote)}
                            className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-1"
                        >
                            Ver más detalles
                        </button>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

export default LoteMarker;
