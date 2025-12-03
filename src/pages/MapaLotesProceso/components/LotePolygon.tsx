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
        if (onSelectLote) {
            onSelectLote(lote);
        }
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
        </Polygon>
    );
};

export default LotePolygon;
