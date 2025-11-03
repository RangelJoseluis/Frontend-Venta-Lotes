/**
 * COMPONENTE: LOTE MARKER
 * 
 * Renderiza un marcador de lote en el mapa con su popup de información.
 * Soporta tanto puntos (Point) como polígonos (Polygon).
 */

import React from 'react';
import { Marker, Popup, Polygon } from 'react-leaflet';
import { Home, DollarSign, Maximize2 } from 'lucide-react';
import lotesMapaService from '../../../../services/lotes-mapa.service';
import { COLORES_MAPA } from '../../../../types/mapa';
import { parsearGeoJSON } from '../../utils/geoJsonParser';
import type { LoteMarkerProps } from '../../types';

const LoteMarker: React.FC<LoteMarkerProps> = ({
  lote,
  onSelectLote,
  crearIconoLote,
  getEstiloPoligono,
  formatearPrecio
}) => {
  // Intentar parsear como GeoJSON primero (soporta Point y Polygon)
  let geoData = null;
  
  // Prioridad 1: Campo geojson (nuevo)
  if (lote.geojson) {
    geoData = parsearGeoJSON(lote.geojson);
  }
  // Prioridad 2: Campo coordenadas (legacy)
  else if (lote.coordenadas) {
    // Intentar parsear como GeoJSON
    if (lote.coordenadas.includes('{')) {
      geoData = parsearGeoJSON(lote.coordenadas);
    } else {
      // Formato simple: "lat,lng"
      const coords = lotesMapaService.parsearCoordenadas(lote.coordenadas);
      if (coords) {
        geoData = {
          tipo: 'point' as const,
          centro: coords,
          coordenadas: [[coords.latitud, coords.longitud]]
        };
      }
    }
  }
  
  if (!geoData) {
    console.warn(`⚠️ Lote ${lote.codigo} sin coordenadas válidas`, lote);
    return null;
  }

  // Popup compartido
  const popupContent = (
    <div className="popup-lote">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0 }}>{lote.codigo}</h3>
        {lote.esDelCliente && (
          <span style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)'
          }}>
            ⭐ Mi Lote
          </span>
        )}
      </div>
      
      <div className="popup-info">
        <div className="popup-row">
          <Maximize2 size={16} />
          <span>{lote.superficie} m²</span>
        </div>
        
        <div className="popup-row">
          <DollarSign size={16} />
          <span>{formatearPrecio(lote.precio)}</span>
        </div>

        {lote.modeloCasa && (
          <div className="popup-row">
            <Home size={16} />
            <span>{lote.modeloCasa.nombre}</span>
          </div>
        )}
      </div>

      <div className="popup-estado">
        <span 
          className="badge-estado"
          style={{ 
            backgroundColor: COLORES_MAPA[lote.estado],
            color: 'white'
          }}
        >
          {lote.estado.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <button 
        className="btn-ver-detalle"
        onClick={() => onSelectLote(lote)}
      >
        Ver Detalles Completos
      </button>
    </div>
  );

  return (
    <div key={lote.uid}>
      {/* Si es polígono, dibujarlo */}
      {geoData.tipo === 'polygon' && (
        <Polygon
          positions={geoData.coordenadas as [number, number][]}
          pathOptions={getEstiloPoligono(lote.estado)}
        >
          <Popup>{popupContent}</Popup>
        </Polygon>
      )}

      {/* Siempre mostrar marcador en el centro */}
      <Marker
        position={[geoData.centro.latitud, geoData.centro.longitud]}
        icon={crearIconoLote(lote.estado, lote.esDelCliente)}
      >
        <Popup>{popupContent}</Popup>
      </Marker>
    </div>
  );
};

export default LoteMarker;
