// Componente HeaderModelosCasa - Header con navegación y botones (estilo GestionLotes)
import { Home, Plus } from 'lucide-react';
import type { HeaderModelosCasaProps } from '../../types';

const HeaderModelosCasa = ({ onNuevoModelo, totalModelos }: Omit<HeaderModelosCasaProps, 'onVolver'>) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <Home size={22} className="text-blue-600 dark:text-blue-400 shrink-0" />
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white md:text-2xl">
            Gestión de Modelos de Casa
          </h1>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            ({totalModelos} registrado{totalModelos !== 1 ? 's' : ''})
          </span>
        </div>
      </div>

      <button
        onClick={onNuevoModelo}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-all shrink-0"
      >
        <Plus size={20} />
        <span>Nuevo Modelo</span>
      </button>
    </div>
  );
};

export default HeaderModelosCasa;
