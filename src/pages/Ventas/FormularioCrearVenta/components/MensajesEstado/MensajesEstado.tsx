// Componente MensajesEstado - Mensajes de error y éxito
// Maneja la visualización de estados del formulario

import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { FormularioState } from '../../types';
import { MESSAGES } from '../../constants';
import './MensajesEstado.css';

interface MensajesEstadoProps {
  state: FormularioState;
}

export const MensajesEstado: React.FC<MensajesEstadoProps> = ({ state }) => {
  // Mensaje de carga
  if (state.isLoading) {
    return (
      <div className="formulario-message formulario-message-loading">
        <Loader2 size={20} className="formulario-message-icon animate-spin" />
        <span>{MESSAGES.LOADING}</span>
      </div>
    );
  }

  // Mensaje de error
  if (state.error) {
    return (
      <div className="formulario-message formulario-message-error">
        <AlertCircle size={20} className="formulario-message-icon" />
        <span>{state.error}</span>
      </div>
    );
  }

  // Mensaje de éxito
  if (state.success) {
    return (
      <div className="formulario-message formulario-message-success">
        <CheckCircle size={20} className="formulario-message-icon" />
        <span>{MESSAGES.SUCCESS_CREAR_VENTA}</span>
      </div>
    );
  }

  // No mostrar nada si no hay estado especial
  return null;
};
