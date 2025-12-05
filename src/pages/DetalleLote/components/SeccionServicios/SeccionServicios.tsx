/**
 * Componente SeccionServicios - Listado de servicios del lote
 * Migrado a Tailwind CSS
 */

import { CheckCircle } from 'lucide-react';
import type { Lote } from '../../types';

interface SeccionServiciosProps {
  lote: Lote;
}

const SeccionServicios = ({ lote }: SeccionServiciosProps) => {
  // Si no hay servicios, no mostrar el componente
  if (!lote.servicios || lote.servicios.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
        <CheckCircle size={20} className="text-blue-600 dark:text-blue-400" />
        Servicios Disponibles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {lote.servicios.map((servicio, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
          >
            <CheckCircle size={16} className="text-green-600 dark:text-green-400 shrink-0" />
            <span className="text-sm font-medium text-green-900 dark:text-green-200">{servicio.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionServicios;
