/**
 * COMPONENTE: MAPA EDITOR
 * 
 * Mapa interactivo con Leaflet para:
 * - Visualizar ubicación del lote
 * - Dibujar polígono del lote
 * - Editar puntos del polígono
 */

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Edit2, Trash2, X, Check } from 'lucide-react';
import { obtenerCentroZona, obtenerZoomZona } from '../../../../config/zona.config';

interface MapaEditorProps {
  modoDibujo: boolean;
  puntosPoligono: [number, number][];
  ubicacionX: number | undefined;
  ubicacionY: number | undefined;
  onIniciarDibujo: () => void;
  onFinalizarDibujo: () => void;
  onCancelarDibujo: () => void;
  onLimpiarPoligono: () => void;
  onEliminarUltimoPunto: () => void;
  onAgregarPunto: (latlng: L.LatLng) => void;
}

// Componente helper para clicks en el mapa
const MapClickHandler: React.FC<{
  enabled: boolean;
  onMapClick: (latlng: L.LatLng) => void;
}> = ({ enabled, onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (enabled) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
};

// Componente helper para actualizar el centro del mapa
const MapUpdater: React.FC<{
  center: [number, number];
  zoom?: number;
  disabled?: boolean;
}> = ({ center, zoom, disabled }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (!disabled && center[0] && center[1]) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map, disabled]);
  
  return null;
};

const MapaEditor: React.FC<MapaEditorProps> = ({
  modoDibujo,
  puntosPoligono,
  ubicacionX,
  ubicacionY,
  onIniciarDibujo,
  onFinalizarDibujo,
  onCancelarDibujo,
  onLimpiarPoligono,
  onEliminarUltimoPunto,
  onAgregarPunto
}) => {
  const centroZona = obtenerCentroZona();
  const zoomZona = obtenerZoomZona();

  // Determinar el centro del mapa - priorizar coordenadas del lote
  const centroMapa: [number, number] = React.useMemo(() => {
    // Validar y usar coordenadas del lote (LEAFLET usa [lat, lng] = [Y, X])
    if (ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY)) {
      return [ubicacionY, ubicacionX];
    }
    // Si hay polígono pero NO está en modo dibujo, calcular el centroide
    // IMPORTANTE: NO recalcular durante el dibujo para evitar que el mapa se mueva
    if (puntosPoligono.length > 0 && !modoDibujo) {
      const sumaLat = puntosPoligono.reduce((sum, punto) => sum + punto[0], 0);
      const sumaLng = puntosPoligono.reduce((sum, punto) => sum + punto[1], 0);
      return [sumaLat / puntosPoligono.length, sumaLng / puntosPoligono.length];
    }
    return centroZona;
  }, [ubicacionX, ubicacionY, puntosPoligono, centroZona, modoDibujo]);

  // Key único para forzar re-render del mapa cuando cambia el centro
  const mapKey = React.useMemo(() => {
    return `${centroMapa[0]}-${centroMapa[1]}`;
  }, [centroMapa]);

  return (
    <div className="form-section">
      <h2 className="form-section-title">
        <MapPin size={20} />
        Ubicación en el Mapa
      </h2>

      {/* Controles del mapa */}
      <div className="mapa-controles">
        {!modoDibujo ? (
          <>
            <button
              type="button"
              onClick={onIniciarDibujo}
              className="btn btn-secondary"
            >
              <Edit2 size={18} />
              Dibujar Polígono
            </button>
            
            {puntosPoligono.length > 0 && (
              <button
                type="button"
                onClick={onLimpiarPoligono}
                className="btn btn-danger"
              >
                <Trash2 size={18} />
                Limpiar Polígono
              </button>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onFinalizarDibujo}
              className="btn btn-success"
              disabled={puntosPoligono.length < 3}
            >
              <Check size={18} />
              Finalizar Polígono
            </button>
            
            <button
              type="button"
              onClick={onEliminarUltimoPunto}
              className="btn btn-secondary"
              disabled={puntosPoligono.length === 0}
            >
              Eliminar Último Punto
            </button>
            
            <button
              type="button"
              onClick={onCancelarDibujo}
              className="btn btn-danger"
            >
              <X size={18} />
              Cancelar
            </button>
          </>
        )}
      </div>

      {/* Info del modo dibujo */}
      {modoDibujo && (
        <div className="mapa-info">
          <p>
            <strong>Modo Dibujo Activo:</strong> Haz clic en el mapa para agregar puntos al polígono.
            Se requieren mínimo 3 puntos.
          </p>
          <p>
            Puntos actuales: <strong>{puntosPoligono.length}</strong>
          </p>
        </div>
      )}

      {/* Mapa */}
      <div className="mapa-container" style={{ height: '500px', marginTop: '1rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <MapContainer
          key={mapKey}
          center={centroMapa}
          zoom={puntosPoligono.length > 0 ? 18 : zoomZona}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; Google'
            url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={22}
          />

          {/* Marcador de centro - solo si hay coordenadas válidas */}
          {ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) && (
            <Marker 
              key={`marker-${ubicacionY}-${ubicacionX}`}
              position={[ubicacionY, ubicacionX]}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>📍 Centro del Lote</strong>
                  <br />
                  <small>
                    Lat: {ubicacionY.toFixed(6)}
                    <br />
                    Lng: {ubicacionX.toFixed(6)}
                  </small>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Polígono del lote */}
          {puntosPoligono.length > 0 && (
            <Polygon
              positions={puntosPoligono}
              pathOptions={{
                color: modoDibujo ? '#fbbf24' : '#10b981',
                fillColor: modoDibujo ? '#fbbf24' : '#10b981',
                fillOpacity: 0.3,
                weight: 3,
              }}
            />
          )}

          {/* Marcadores de puntos del polígono */}
          {puntosPoligono.map((punto, index) => (
            <Marker
              key={index}
              position={punto}
              icon={L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                  width: 24px;
                  height: 24px;
                  background: ${modoDibujo ? '#fbbf24' : '#10b981'};
                  border: 3px solid white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  font-weight: bold;
                  color: white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                ">${index + 1}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong>Punto {index + 1}</strong>
                  <br />
                  <small>
                    Lat: {punto[0].toFixed(6)}
                    <br />
                    Lng: {punto[1].toFixed(6)}
                  </small>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Actualizar centro si cambia */}
          <MapUpdater 
            center={centroMapa} 
            zoom={ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) ? 18 : undefined}
            disabled={modoDibujo}
          />

          {/* Handler para clicks en el mapa */}
          <MapClickHandler
            enabled={modoDibujo}
            onMapClick={onAgregarPunto}
          />
        </MapContainer>
      </div>

      {/* Info del polígono */}
      {puntosPoligono.length > 0 && (
        <div className="polygon-info">
          <p>
            <strong>Polígono guardado:</strong> {puntosPoligono.length} puntos
          </p>
        </div>
      )}
    </div>
  );
};

export default MapaEditor;
