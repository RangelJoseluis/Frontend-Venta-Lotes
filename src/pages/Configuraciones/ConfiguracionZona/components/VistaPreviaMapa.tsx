import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapClickHandler from './MapClickHandler';
import type { ConfiguracionZona } from '../../shared/types';

interface VistaPreviewMapaProps {
  zona: ConfiguracionZona;
  onMapClick: (lat: number, lng: number) => void;
}

const VistaPreviaMapa = ({ zona, onMapClick }: VistaPreviewMapaProps) => {
  return (
    <div className="config-mapa-preview">
      <h3>Vista Previa del Mapa</h3>
      <p className="form-hint">Haz click en el mapa para cambiar el centro de la zona</p>

      <div className="mapa-container">
        <MapContainer
          center={[zona.centro.latitud, zona.centro.longitud]}
          zoom={zona.zoom}
          style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; Google'
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={22}
          />

          <Marker position={[zona.centro.latitud, zona.centro.longitud]} />

          <MapClickHandler onMapClick={onMapClick} />
        </MapContainer>
      </div>

      <div className="mapa-info">
        <p>
          📍 Centro: {zona.centro.latitud.toFixed(6)}, {zona.centro.longitud.toFixed(6)}
        </p>
        <p>
          🔍 Zoom: {zona.zoom}
        </p>
      </div>
    </div>
  );
};

export default VistaPreviaMapa;
