/**
 * PÁGINA: CONFIGURACIONES
 * Permite al administrador configurar parámetros del sistema
 */

import { useState } from 'react';
import { MapPin, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  obtenerZonaPredeterminada, 
  guardarZonaPredeterminada,
  type ConfiguracionZona as ZonaConfig
} from '../config/zona.config';
import './Configuraciones.css';

// Configurar iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para manejar clicks en el mapa
const MapClickHandler = ({ 
  onMapClick 
}: { 
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const ConfiguracionZona = () => {
  const [zona, setZona] = useState<ZonaConfig>(obtenerZonaPredeterminada());
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setZona(prev => ({
      ...prev,
      centro: {
        latitud: lat,
        longitud: lng
      }
    }));
  };

  const handleGuardar = () => {
    setGuardando(true);
    try {
      guardarZonaPredeterminada(zona);
      setMensaje({ tipo: 'success', texto: '✅ Configuración guardada exitosamente' });
      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: '❌ Error al guardar la configuración' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="config-contenido">

      <h2 className="config-titulo">🗺️ Configuración de Zona y Mapa</h2>
      <p className="config-descripcion">
        Define el área geográfica donde se encuentran tus lotes. Esta configuración se aplicará a todos los mapas del sistema.
      </p>

      {/* Mensaje de éxito/error */}
      {mensaje && (
        <div className={`mensaje-config ${mensaje.tipo}`}>
          {mensaje.tipo === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{mensaje.texto}</span>
        </div>
      )}

      {/* Configuración de Zona */}
      <div className="config-seccion">
        <div className="config-seccion-header">
          <MapPin size={24} style={{ color: '#7c3aed' }} />
          <h2>Zona Predeterminada del Mapa</h2>
        </div>
        <p className="config-descripcion">
          Define el área geográfica donde se encuentran tus lotes. Esta configuración se aplicará a todos los mapas del sistema.
        </p>

        {/* Formulario */}
        <div className="config-form">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Nombre de la Zona</label>
              <input
                type="text"
                value={zona.nombre}
                onChange={(e) => setZona({ ...zona, nombre: e.target.value })}
                placeholder="Ej: Urbanización Los Pinos"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-field">
              <label className="form-label">Latitud (Centro)</label>
              <input
                type="number"
                step="0.000001"
                value={zona.centro.latitud}
                onChange={(e) => setZona({ 
                  ...zona, 
                  centro: { ...zona.centro, latitud: parseFloat(e.target.value) }
                })}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Longitud (Centro)</label>
              <input
                type="number"
                step="0.000001"
                value={zona.centro.longitud}
                onChange={(e) => setZona({ 
                  ...zona, 
                  centro: { ...zona.centro, longitud: parseFloat(e.target.value) }
                })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Nivel de Zoom</label>
              <input
                type="range"
                min="10"
                max="22"
                value={zona.zoom}
                onChange={(e) => setZona({ ...zona, zoom: parseInt(e.target.value) })}
                className="form-range"
              />
              <div className="zoom-info">
                <span>Zoom: {zona.zoom}</span>
                <span className="zoom-desc">
                  {zona.zoom < 13 ? '🌍 Ciudad' : zona.zoom < 16 ? '🏘️ Barrio' : zona.zoom < 18 ? '🏠 Calle' : '📍 Detalle'}
                </span>
              </div>
            </div>
          </div>

          {/* Límites opcionales */}
          <div className="form-section-divider">
            <h3>Límites del Área (Opcional)</h3>
            <p className="form-hint">Define los límites para restringir el área visible del mapa</p>
          </div>

          <div className="form-row form-row-2">
            <div className="form-field">
              <label className="form-label">Límite Norte</label>
              <input
                type="number"
                step="0.000001"
                value={zona.limites?.norte || ''}
                onChange={(e) => setZona({ 
                  ...zona, 
                  limites: { ...zona.limites!, norte: parseFloat(e.target.value) }
                })}
                placeholder="Ej: 11.380"
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Límite Sur</label>
              <input
                type="number"
                step="0.000001"
                value={zona.limites?.sur || ''}
                onChange={(e) => setZona({ 
                  ...zona, 
                  limites: { ...zona.limites!, sur: parseFloat(e.target.value) }
                })}
                placeholder="Ej: 11.370"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row form-row-2">
            <div className="form-field">
              <label className="form-label">Límite Este</label>
              <input
                type="number"
                step="0.000001"
                value={zona.limites?.este || ''}
                onChange={(e) => setZona({ 
                  ...zona, 
                  limites: { ...zona.limites!, este: parseFloat(e.target.value) }
                })}
                placeholder="Ej: -72.215"
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">Límite Oeste</label>
              <input
                type="number"
                step="0.000001"
                value={zona.limites?.oeste || ''}
                onChange={(e) => setZona({ 
                  ...zona, 
                  limites: { ...zona.limites!, oeste: parseFloat(e.target.value) }
                })}
                placeholder="Ej: -72.230"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Vista Previa del Mapa */}
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
              
              <MapClickHandler onMapClick={handleMapClick} />
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

        {/* Botón Guardar */}
        <div className="config-actions">
          <button 
            onClick={handleGuardar}
            disabled={guardando}
            className="btn-guardar"
          >
            <Save size={20} />
            {guardando ? 'Guardando...' : 'Guardar Configuración'}
          </button>
        </div>

        {/* Ayuda */}
        <div className="config-ayuda">
          <h4>💡 Cómo obtener las coordenadas:</h4>
          <ol>
            <li>Abre Google Maps</li>
            <li>Busca tu urbanización o proyecto</li>
            <li>Haz click derecho en el centro del área</li>
            <li>Selecciona "Copiar coordenadas"</li>
            <li>Pega las coordenadas en los campos de arriba</li>
          </ol>
          <p className="ayuda-nota">
            O simplemente haz click en el mapa de vista previa para seleccionar el centro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionZona;
