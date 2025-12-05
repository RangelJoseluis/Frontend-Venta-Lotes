import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import type { AlertasEstadoProps } from '../../types';
import { TIMEOUTS } from '../../constants';

const AlertasEstado: React.FC<AlertasEstadoProps> = ({
  error,
  success,
  onLimpiarError,
  onLimpiarSuccess
}) => {
  // Auto-hide mensajes después de un tiempo
  useEffect(() => {
    if (success && onLimpiarSuccess) {
      const timer = setTimeout(() => {
        onLimpiarSuccess();
      }, TIMEOUTS.MENSAJE_AUTO_HIDE);
      return () => clearTimeout(timer);
    }
  }, [success, onLimpiarSuccess]);

  useEffect(() => {
    if (error && onLimpiarError) {
      const timer = setTimeout(() => {
        onLimpiarError();
      }, TIMEOUTS.MENSAJE_AUTO_HIDE);
      return () => clearTimeout(timer);
    }
  }, [error, onLimpiarError]);

  if (!error && !success) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 left-5 md:left-auto z-[9999] flex flex-col gap-3 max-w-md md:max-w-sm">
      {/* Mensaje de éxito */}
      {success && (
        <div className="flex items-center gap-3 px-5 py-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 dark:border-emerald-600 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="flex-1 font-medium text-sm text-emerald-900 dark:text-emerald-100">
            {success}
          </span>
          {onLimpiarSuccess && (
            <button
              onClick={onLimpiarSuccess}
              className="p-1 rounded text-emerald-900 dark:text-emerald-100 hover:bg-emerald-600/10 dark:hover:bg-emerald-400/10 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="flex items-center gap-3 px-5 py-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          <AlertCircle size={20} className="text-red-600 dark:text-red-400 shrink-0" />
          <span className="flex-1 font-medium text-sm text-red-900 dark:text-red-100">
            {error}
          </span>
          {onLimpiarError && (
            <button
              onClick={onLimpiarError}
              className="p-1 rounded text-red-900 dark:text-red-100 hover:bg-red-600/10 dark:hover:bg-red-400/10 transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertasEstado;
