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
        if (onSelectLote) {
            onSelectLote(lote);
        }
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
                    <h3 className="font-bold text-lg mb-2">{lote.codigo}</h3>

                    <div className="space-y-1 text-sm">
                        <p>
                            <span className="font-semibold">Ubicación:</span> {lote.ubicacion}
                        </p>
                        <p>
                            <span className="font-semibold">Superficie:</span> {lote.superficie} m²
                        </p>
                        <p>
                            <span className="font-semibold">Precio:</span> {formatearPrecio(lote.precio)}
                        </p>
                        <p>
                            <span className="font-semibold">Estado:</span>{' '}
                            <span className={`
                px-2 py-0.5 rounded text-xs font-semibold
                ${lote.estado === 'disponible' ? 'bg-green-100 text-green-800' : ''}
                ${lote.estado === 'en_cuotas' ? 'bg-amber-100 text-amber-800' : ''}
                ${lote.estado === 'vendido' ? 'bg-red-100 text-red-800' : ''}
              `}>
                                {lote.estado === 'disponible' ? 'Disponible' : ''}
                                {lote.estado === 'en_cuotas' ? 'En Cuotas' : ''}
                                {lote.estado === 'vendido' ? 'Vendido' : ''}
                            </span>
                        </p>

                        {lote.modeloCasa && (
                            <p>
                                <span className="font-semibold">Modelo:</span> {lote.modeloCasa.nombre}
                            </p>
                        )}
                    </div>

                    {esDestacado && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-amber-600 font-semibold">⭐ Tu Lote</p>
                        </div>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

export default LoteMarker;
