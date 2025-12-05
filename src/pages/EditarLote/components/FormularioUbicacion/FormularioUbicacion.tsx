/**
 * COMPONENTE: FORMULARIO UBICACIÓN
 * 
 * Campos de ubicación del lote:
 * - Dirección
 * - Manzana
 * - Número de lote
 */

import React from 'react';
import { MapPin, Navigation, Grid3x3 } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoteFormData } from '../../types';

interface FormularioUbicacionProps {
  register: UseFormRegister<LoteFormData>;
  errors: FieldErrors<LoteFormData>;
}

const FormularioUbicacion: React.FC<FormularioUbicacionProps> = ({
  register,
  errors
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Ubicación
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dirección */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Navigation size={14} className="text-slate-400" />
            Dirección
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('direccion')}
            type="text"
            placeholder="Ej: Calle 123 #45-67"
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.direccion
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.direccion && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.direccion.message}
            </p>
          )}
        </div>

        {/* Manzana */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Grid3x3 size={14} className="text-slate-400" />
            Manzana
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('manzana')}
            type="text"
            placeholder="Ej: A, B, 1, 2"
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.manzana
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.manzana && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.manzana.message}
            </p>
          )}
        </div>

        {/* Número de Lote */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Grid3x3 size={14} className="text-slate-400" />
            Número de Lote
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('numeroLote')}
            type="text"
            placeholder="Ej: 12, 34"
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.numeroLote
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.numeroLote && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.numeroLote.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioUbicacion;
