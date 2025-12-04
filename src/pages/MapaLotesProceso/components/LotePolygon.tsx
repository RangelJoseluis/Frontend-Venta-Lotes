import { Polygon, Popup } from 'react-leaflet';
import type { LoteParaMapa } from '../../../types/mapa';
import { COLORES_MAPA } from '../../../types/mapa';
import { formatearPrecio } from '../utils/iconHelpers';

interface LotePolygonProps {
    lote: LoteParaMapa;
    esDestacado?: boolean;
    onSelectLote?: (lote: LoteParaMapa) => void;
}

const LotePolygon = ({ lote, esDestacado = false, onSelectLote }: LotePolygonProps) => {
    // Parsear GeoJSON
    let posiciones: [number, number][] = [];

    if (lote.geojson && typeof lote.geojson === 'string') {
        try {
            const geojsonObj = JSON.parse(lote.geojson);
            if (geojsonObj.type === 'Polygon' && Array.isArray(geojsonObj.coordinates)) {
                // GeoJSON usa [lng, lat], Leaflet usa [lat, lng]
                // coordinates[0] es el anillo exterior
                posiciones = geojsonObj.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
            }
        } catch (error) {
            console.error('Error al parsear geojson para polígono:', error);
            return null;
        }
    }

    if (posiciones.length === 0) {
        return null;
    }

    const color = COLORES_MAPA[lote.estado] || '#94a3b8'; // Fallback gris

    const handleClick = () => {
        // Ya no seleccionamos automáticamente al hacer click
        // if (onSelectLote) {
        //     onSelectLote(lote);
        // }
    };

    return (
        <Polygon
            positions={posiciones}
            pathOptions={{
                color: esDestacado ? '#3b82f6' : color, // Borde azul si es destacado
                fillColor: color,
                fillOpacity: esDestacado ? 0.6 : 0.4,
                weight: esDestacado ? 3 : 2
            }}
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
        </Polygon>
    );
};

export default LotePolygon;
