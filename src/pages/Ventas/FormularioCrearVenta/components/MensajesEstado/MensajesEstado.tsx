// Componente MensajesEstado - Mensajes de error y éxito
// Diseño moderno con Tailwind CSS

import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import type { FormularioState } from '../../types';
import { MESSAGES } from '../../constants';

interface MensajesEstadoProps {
  state: FormularioState;
}

export const MensajesEstado: React.FC<MensajesEstadoProps> = ({ state }) => {
  // Mensaje de carga
  if (state.isLoading) {
    return (
      <div className="flex items-center gap-3 p-4 mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-400">
        <Loader2 size={20} className="flex-shrink-0 animate-spin" />
        <span>{MESSAGES.LOADING}</span>
      </div>
    );
  }

  // Mensaje de error
  if (state.error) {
    return (
      <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
        <AlertCircle size={20} className="flex-shrink-0" />
        <span>{state.error}</span>
      </div>
    );
  }

  // Mensaje de éxito
  if (state.success) {
    return (
      <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
        <CheckCircle size={20} className="flex-shrink-0" />
        <span>{MESSAGES.SUCCESS_CREAR_VENTA}</span>
      </div>
    );
  }

  // No mostrar nada si no hay estado especial
  return null;
};
