/**
 * COMPONENTE: LOADING OVERLAY
 * 
 * Overlay que muestra un spinner mientras se cargan los datos del mapa.
 */

import React from 'react';
import { Loader } from 'lucide-react';
import type { LoadingOverlayProps } from '../../types';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ mensaje = 'Cargando mapa...' }) => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <Loader size={48} className="animate-spin text-blue-600 dark:text-blue-400 mb-4" />
      <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{mensaje}</p>
    </div>
  );
};

export default LoadingOverlay;
