// Componente BotonesAccion - Botones de acción del formulario
// Diseño moderno con Tailwind CSS

import { RotateCcw, Save, Loader } from 'lucide-react';
import type { FormularioState } from '../../types';

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
    <div className="flex items-center justify-end gap-3 pt-4">
      <button
        type="button"
        onClick={onLimpiar}
        disabled={state.isSubmitting}
        className="px-6 py-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RotateCcw size={16} className="inline mr-2" />
        Limpiar
      </button>

      <button
        type="submit"
        onClick={onSubmit}
        disabled={state.isSubmitting}
        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {state.isSubmitting ? (
          <>
            <Loader size={16} className="animate-spin" />
            Registrando...
          </>
        ) : (
          <>
            <Save size={16} />
            Registrar Venta
          </>
        )}
      </button>
    </div>
  );
};
