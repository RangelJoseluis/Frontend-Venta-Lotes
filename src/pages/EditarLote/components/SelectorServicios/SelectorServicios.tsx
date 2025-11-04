/**
 * COMPONENTE: SELECTOR SERVICIOS
 * 
 * Lista de checkboxes para seleccionar servicios disponibles del lote
 */

import React from 'react';
import { Settings } from 'lucide-react';
import type { Servicio } from '../../../../types';
import './SelectorServicios.css';

interface SelectorServiciosProps {
  serviciosDisponibles: Servicio[];
  serviciosSeleccionados: string[];
  onToggleServicio: (servicioUid: string) => void;
}

const SelectorServicios: React.FC<SelectorServiciosProps> = ({
  serviciosDisponibles,
  serviciosSeleccionados,
  onToggleServicio
}) => {
  return (
    <div className="form-section">
      <h2 className="form-section-title">
        <Settings size={20} />
        Servicios Disponibles
      </h2>

      {serviciosDisponibles.length === 0 ? (
        <p className="form-hint">No hay servicios disponibles</p>
      ) : (
        <div className="servicios-grid">
          {serviciosDisponibles.map((servicio) => (
            <div key={servicio.uid} className="servicio-checkbox-wrapper">
              <input
                type="checkbox"
                id={`servicio-${servicio.uid}`}
                checked={serviciosSeleccionados.includes(servicio.uid)}
                onChange={() => onToggleServicio(servicio.uid)}
                className="form-checkbox"
              />
              <label 
                htmlFor={`servicio-${servicio.uid}`} 
                className="servicio-label"
              >
                <span className="servicio-nombre">{servicio.nombre}</span>
                {servicio.descripcion && (
                  <span className="servicio-descripcion">{servicio.descripcion}</span>
                )}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectorServicios;
