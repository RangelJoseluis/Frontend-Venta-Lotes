/**
 * COMPONENTE: FORMULARIO CARACTERÍSTICAS
 * 
 * Campos de características del lote:
 * - Topografía
 * - Orientación
 * - Vista
 * - Estado
 * - Estado de documentación
 * - Amueblado
 */

import React, { useState } from 'react';
import { Settings, Mountain, Compass, Eye, Activity, FileText, Sofa, ChevronDown, AlertCircle } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoteFormData } from '../../types';

interface FormularioCaracteristicasProps {
  register: UseFormRegister<LoteFormData>;
  errors: FieldErrors<LoteFormData>;
}

const FormularioCaracteristicas: React.FC<FormularioCaracteristicasProps> = ({
  register,
  errors
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Header Colapsable */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Settings size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Características del Lote
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Detalles adicionales como topografía, vista y estado legal
            </p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Contenido Colapsable */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Topografía */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Mountain size={16} className="text-slate-400" />
                Topografía <span className="text-red-500">*</span>
              </label>
              <select
                {...register('topografia')}
                className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.topografia
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-300 dark:border-slate-600'
                  }`}
              >
                <option value="plano">Plano</option>
                <option value="inclinado">Inclinado</option>
                <option value="irregular">Irregular</option>
              </select>
              {errors.topografia && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <AlertCircle size={12} />
                  {errors.topografia.message}
                </p>
              )}
            </div>

            {/* Orientación */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Compass size={16} className="text-slate-400" />
                Orientación
              </label>
              <select
                {...register('orientacion')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Seleccionar...</option>
                <option value="norte">Norte</option>
                <option value="sur">Sur</option>
                <option value="este">Este</option>
                <option value="oeste">Oeste</option>
                <option value="noreste">Noreste</option>
                <option value="noroeste">Noroeste</option>
                <option value="sureste">Sureste</option>
                <option value="suroeste">Suroeste</option>
              </select>
            </div>

            {/* Vista */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Eye size={16} className="text-slate-400" />
                Vista
              </label>
              <select
                {...register('vista')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Seleccionar...</option>
                <option value="ciudad">Ciudad</option>
                <option value="montaña">Montaña</option>
                <option value="mar">Mar</option>
                <option value="parque">Parque</option>
                <option value="calle">Calle</option>
                <option value="interior">Interior</option>
              </select>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Activity size={16} className="text-slate-400" />
                Estado <span className="text-red-500">*</span>
              </label>
              <select
                {...register('estado')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="disponible">Disponible</option>
                <option value="en_cuotas">En Cuotas</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>

            {/* Estado Documentación */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FileText size={16} className="text-slate-400" />
                Documentación <span className="text-red-500">*</span>
              </label>
              <select
                {...register('estadoDocumentacion')}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completa">Completa</option>
                <option value="observaciones">Con Observaciones</option>
              </select>
            </div>

            {/* Amueblado */}
            <div className="flex items-center h-full pt-6">
              <label className="relative flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer w-full transition-colors">
                <div className="flex items-center h-5">
                  <input
                    {...register('amueblado')}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Sofa size={18} className="text-slate-400" />
                  <span>Se vende amueblado</span>
                </div>
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCaracteristicas;
