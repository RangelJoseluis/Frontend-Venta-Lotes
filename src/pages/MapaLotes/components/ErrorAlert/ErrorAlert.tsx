/**
 * COMPONENTE: ERROR ALERT
 * 
 * Muestra un mensaje de error con botón para reintentar la carga de datos.
 */

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import type { ErrorAlertProps } from '../../types';

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onReintentar }) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
          </div>
          <button
            onClick={onReintentar}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
