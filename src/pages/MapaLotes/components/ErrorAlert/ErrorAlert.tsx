/**
 * COMPONENTE: ERROR ALERT
 * 
 * Muestra un mensaje de error con botón para reintentar la carga de datos.
 */

import React from 'react';
import type { ErrorAlertProps } from '../../types';
import './ErrorAlert.css';

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onReintentar }) => {
  return (
    <div className="mapalotes-alert-error">
      <p>{error}</p>
      <button onClick={onReintentar}>Reintentar</button>
    </div>
  );
};

export default ErrorAlert;
