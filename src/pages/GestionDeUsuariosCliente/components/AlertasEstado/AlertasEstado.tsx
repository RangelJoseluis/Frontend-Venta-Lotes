import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import type { AlertasEstadoProps } from '../../types';
import { TIMEOUTS } from '../../constants';
import './AlertasEstado.css';

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
    <div className="alertas-container">
      {/* Mensaje de éxito */}
      {success && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{success}</span>
          {onLimpiarSuccess && (
            <button onClick={onLimpiarSuccess} className="alert-close">
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
          {onLimpiarError && (
            <button onClick={onLimpiarError} className="alert-close">
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertasEstado;
