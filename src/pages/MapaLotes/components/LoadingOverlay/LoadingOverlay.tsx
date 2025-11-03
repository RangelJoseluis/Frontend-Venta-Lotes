/**
 * COMPONENTE: LOADING OVERLAY
 * 
 * Overlay que muestra un spinner mientras se cargan los datos del mapa.
 */

import React from 'react';
import type { LoadingOverlayProps } from '../../types';
import './LoadingOverlay.css';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ mensaje = 'Cargando mapa...' }) => {
  return (
    <div className="mapalotes-loading-overlay">
      <div className="mapalotes-spinner"></div>
      <p>{mensaje}</p>
    </div>
  );
};

export default LoadingOverlay;
