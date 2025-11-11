// Componente MapaUbicacion - Mapa con polígono o marcador del lote
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CENTRO_MAPA_DEFAULT } from '../../constants';
import type { Lote } from '../../types';
import './MapaUbicacion.css';

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
    <div className="detalle-card">
      <h2 className="card-title">
        <MapPin size={20} />
        Ubicación
      </h2>
      <div className="mapa-container">
        <MapContainer
          center={centro}
          zoom={zoom}
          maxZoom={21}
          minZoom={10}
          style={{ height: '400px', width: '100%', borderRadius: '8px' }}
        >
          {/* Mapa híbrido de Google (satélite + etiquetas integradas) - igual al mapa interactivo */}
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
                <strong>Lote {lote.codigo}</strong>
                <br />
                {lote.manzana} - Lote {lote.numeroLote}
                <br />
                Superficie: {parseFloat(lote.superficieM2).toFixed(2)} m²
              </Popup>
            </Polygon>
          ) : centroMapa && (
            <Marker position={centroMapa}>
              <Popup>
                <strong>Lote {lote.codigo}</strong>
                <br />
                {lote.manzana} - Lote {lote.numeroLote}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaUbicacion;
