/**
 * COMPONENTE: SELECTOR MODELO DE CASA
 * 
 * Dropdown para seleccionar un modelo de casa opcional
 */

import React from 'react';
import { Home } from 'lucide-react';
import type { ModeloCasa } from '../../../../types';
import './SelectorModeloCasa.css';

interface SelectorModeloCasaProps {
  modelosCasaDisponibles: ModeloCasa[];
  modeloCasaSeleccionado: string;
  onChangeModelo: (modeloUid: string) => void;
}

const SelectorModeloCasa: React.FC<SelectorModeloCasaProps> = ({
  modelosCasaDisponibles,
  modeloCasaSeleccionado,
  onChangeModelo
}) => {
  return (
    <div className="form-section">
      <h2 className="form-section-title">
        <Home size={20} />
        Modelo de Casa (Opcional)
      </h2>

      <div className="form-field">
        <label className="form-label">Seleccionar Modelo</label>
        <select
          value={modeloCasaSeleccionado}
          onChange={(e) => onChangeModelo(e.target.value)}
          className="form-select"
        >
          <option value="">Sin modelo de casa</option>
          {modelosCasaDisponibles.map((modelo) => {
            const precioFormateado = new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(modelo.precioBase);
            
            return (
              <option key={modelo.uid} value={modelo.uid}>
                {modelo.nombre} - {modelo.metrosCubiertos}m² - {modelo.ambientes} amb. - {precioFormateado}
              </option>
            );
          })}
        </select>
      </div>

      {/* Vista previa del modelo seleccionado */}
      {modeloCasaSeleccionado && (() => {
        const modeloSeleccionado = modelosCasaDisponibles.find(
          m => m.uid === modeloCasaSeleccionado
        );
        
        if (!modeloSeleccionado) return null;

        const precioFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0
        }).format(modeloSeleccionado.precioBase);

        return (
          <div className="modelo-preview">
            <h4>{modeloSeleccionado.nombre}</h4>
            <p className="modelo-precio">{precioFormateado}</p>
            <div className="modelo-specs">
              <span>📐 {modeloSeleccionado.metrosCubiertos}m²</span>
              <span>🏠 {modeloSeleccionado.ambientes} amb.</span>
              <span>🚿 {modeloSeleccionado.banos} baños</span>
              <span>🏢 {modeloSeleccionado.pisos} piso(s)</span>
            </div>
            {modeloSeleccionado.descripcion && (
              <p className="modelo-descripcion">{modeloSeleccionado.descripcion}</p>
            )}
          </div>
        );
      })()}
    </div>
  );
};

export default SelectorModeloCasa;
