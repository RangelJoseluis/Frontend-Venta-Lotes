// Componente BotonesAccion - Botones de acción del formulario
// Maneja limpiar y registrar venta

import { RotateCcw, Save } from 'lucide-react';
import type { FormularioState } from '../../types';
import './BotonesAccion.css';

interface BotonesAccionProps {
  state: FormularioState;
  onLimpiar: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({
  state,
  onLimpiar,
  onSubmit
}) => {
  return (
    <div className="formulario-actions">
      <button
        type="button"
        onClick={onLimpiar}
        className="formulario-btn formulario-btn-secondary"
        disabled={state.isSubmitting}
      >
        <RotateCcw size={16} />
        Limpiar
      </button>
      
      <button
        type="submit"
        onClick={onSubmit}
        disabled={state.isSubmitting}
        className="formulario-btn formulario-btn-primary"
      >
        <Save size={16} />
        {state.isSubmitting ? 'Registrando...' : 'Registrar Venta'}
      </button>
    </div>
  );
};
