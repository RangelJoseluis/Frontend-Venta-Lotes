import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapClickHandler from './MapClickHandler';
import type { ConfiguracionZona } from '../../shared/types';

interface VistaPreviewMapaProps {
  zona: ConfiguracionZona;
  onMapClick: (lat: number, lng: number) => void;
}

const VistaPreviaMapa = ({ zona, onMapClick }: VistaPreviewMapaProps) => {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Vista Previa del Mapa
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Haz click en el mapa para cambiar el centro de la zona
      </p>

      <div className="my-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden shadow-md">
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

      <div className="flex gap-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg mt-4">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
          📍 Centro: {zona.centro.latitud.toFixed(6)}, {zona.centro.longitud.toFixed(6)}
        </p>
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
          🔍 Zoom: {zona.zoom}
        </p>
      </div>
    </div>
  );
};

export default VistaPreviaMapa;
