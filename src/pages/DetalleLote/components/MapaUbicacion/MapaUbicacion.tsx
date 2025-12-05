/**
 * Componente MapaUbicacion - Mapa con polígono o marcador del lote
 * Migrado a Tailwind CSS
 */

import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CENTRO_MAPA_DEFAULT } from '../../constants';
import type { Lote } from '../../types';

interface MapaUbicacionProps {
  lote: Lote;
  centroMapa: [number, number] | null;
  puntosPoligono: [number, number][];
}

const MapaUbicacion = ({ lote, centroMapa, puntosPoligono }: MapaUbicacionProps) => {
  const centro = centroMapa || CENTRO_MAPA_DEFAULT;
  // Zoom por defecto 19 (acercado), permitir hasta 21 para máxima cercanía
  const zoom = 19;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
        Ubicación
      </h2>

      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        <MapContainer
          center={centro}
          zoom={zoom}
          maxZoom={21}
          minZoom={10}
          style={{ height: '400px', width: '100%' }}
        >
          {/* Mapa híbrido de Google (satélite + etiquetas integradas) */}
          <TileLayer
            attribution='&copy; Google'
            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            maxZoom={21}
          />

          {puntosPoligono.length > 0 ? (
            <Polygon
              positions={puntosPoligono}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.3,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-slate-900">{lote.codigo}</p>
                  <p className="text-sm text-slate-600">{lote.manzana} - Lote {lote.numeroLote}</p>
                  <p className="text-sm text-slate-600">Superficie: {parseFloat(lote.superficieM2).toFixed(2)} m²</p>
                </div>
              </Popup>
            </Polygon>
          ) : centroMapa && (
            <Marker position={centroMapa}>
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-slate-900">{lote.codigo}</p>
                  <p className="text-sm text-slate-600">{lote.manzana} - Lote {lote.numeroLote}</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaUbicacion;
