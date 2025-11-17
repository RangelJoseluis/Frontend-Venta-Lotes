import type { ConfiguracionZona } from '../../shared/types';

interface FormularioZonaProps {
  zona: ConfiguracionZona;
  setZona: (zona: ConfiguracionZona) => void;
}

const FormularioZona = ({ zona, setZona }: FormularioZonaProps) => {
  return (
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
  );
};

export default FormularioZona;
