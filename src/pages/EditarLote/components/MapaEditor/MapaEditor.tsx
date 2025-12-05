/**
 * COMPONENTE: MAPA EDITOR
 * 
 * Mapa interactivo con Leaflet para:
 * - Visualizar ubicación del lote
 * - Dibujar polígono del lote
 * - Editar puntos del polígono
 */

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Edit2, Trash2, X, Check, ChevronDown } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header Colapsable */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <MapPin size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Ubicación en el Mapa
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {puntosPoligono.length > 0
                ? `Polígono con ${puntosPoligono.length} puntos definido`
                : 'Dibuja el polígono del lote en el mapa'
              }
            </p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Contenido Colapsable */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            {/* Controles del mapa */}
            <div className="flex flex-wrap gap-3 mb-4">
              {!modoDibujo ? (
                <>
                  <button
                    type="button"
                    onClick={onIniciarDibujo}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 size={18} />
                    Dibujar Polígono
                  </button>

                  {puntosPoligono.length > 0 && (
                    <button
                      type="button"
                      onClick={onLimpiarPoligono}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
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
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={puntosPoligono.length < 3}
                  >
                    <Check size={18} />
                    Finalizar Polígono
                  </button>

                  <button
                    type="button"
                    onClick={onEliminarUltimoPunto}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={puntosPoligono.length === 0}
                  >
                    Eliminar Último Punto
                  </button>

                  <button
                    type="button"
                    onClick={onCancelarDibujo}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <X size={18} />
                    Cancelar
                  </button>
                </>
              )}
            </div>

            {/* Info del modo dibujo */}
            {modoDibujo && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Modo Dibujo Activo:</strong> Haz clic en el mapa para agregar puntos al polígono.
                  Se requieren mínimo 3 puntos.
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Puntos actuales: <strong>{puntosPoligono.length}</strong>
                </p>
              </div>
            )}

            {/* Mapa */}
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700" style={{ height: '500px' }}>
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
            {puntosPoligono.length > 0 && !modoDibujo && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>✓ Polígono guardado:</strong> {puntosPoligono.length} puntos definidos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaEditor;
