/**
 * COMPONENTE: SELECTOR SERVICIOS
 * 
 * Lista de checkboxes para seleccionar servicios disponibles del lote
 */

import React from 'react';
import { Settings, Check } from 'lucide-react';
import type { Servicio } from '../../../../types';

interface SelectorServiciosProps {
  serviciosDisponibles: Servicio[];
  serviciosSeleccionados: string[];
  onToggleServicio: (servicioUid: string) => void;
}

const SelectorServicios: React.FC<SelectorServiciosProps> = ({
  serviciosDisponibles,
  serviciosSeleccionados,
  onToggleServicio
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Settings size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Servicios Disponibles
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Selecciona los servicios que incluye el lote
          </p>
        </div>
      </div>

      {serviciosDisponibles.length === 0 ? (
        <div className="text-center py-8">
          <Settings size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-slate-500 dark:text-slate-400">No hay servicios disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviciosDisponibles.map((servicio) => {
            const isSelected = serviciosSeleccionados.includes(servicio.uid);

            return (
              <label
                key={servicio.uid}
                className={`relative flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-900/50'
                  }`}
              >
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={`servicio-${servicio.uid}`}
                    checked={isSelected}
                    onChange={() => onToggleServicio(servicio.uid)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                    }`}>
                    {isSelected && (
                      <Check size={14} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`block text-sm font-medium ${isSelected
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-slate-700 dark:text-slate-300'
                    }`}>
                    {servicio.nombre}
                  </span>
                  {servicio.descripcion && (
                    <span className={`block text-xs mt-1 ${isSelected
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-slate-500 dark:text-slate-400'
                      }`}>
                      {servicio.descripcion}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}

      {serviciosSeleccionados.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium text-blue-600 dark:text-blue-400">{serviciosSeleccionados.length}</span> servicio{serviciosSeleccionados.length !== 1 ? 's' : ''} seleccionado{serviciosSeleccionados.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectorServicios;
