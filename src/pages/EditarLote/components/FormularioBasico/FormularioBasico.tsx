/**
 * COMPONENTE: FORMULARIO BÁSICO
 * 
 * Campos básicos del lote:
 * - Código
 * - Dimensiones (ancho, largo)
 * - Superficie (calculada automáticamente)
 * - Precio de lista
 */

import React, { useState } from 'react';
import { FileText, Ruler, DollarSign, Hash } from 'lucide-react';
import type { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import type { LoteFormData } from '../../types.ts';

interface FormularioBasicoProps {
  register: UseFormRegister<LoteFormData>;
  errors: FieldErrors<LoteFormData>;
  superficieM2: number;
  setValue: UseFormSetValue<LoteFormData>;
  precioLista: number;
}

/**
 * Formatea un número con separadores de miles
 */
const formatearPrecio = (valor: string): string => {
  // Remover todo excepto números
  const soloNumeros = valor.replace(/\D/g, '');
  if (!soloNumeros) return '';

  // Formatear con puntos como separadores de miles
  return new Intl.NumberFormat('es-CO').format(parseInt(soloNumeros, 10));
};

const FormularioBasico: React.FC<FormularioBasicoProps> = ({
  register,
  errors,
  superficieM2,
  setValue,
  precioLista
}) => {
  // Estado local para el valor formateado del precio
  const [precioFormateado, setPrecioFormateado] = useState(() =>
    precioLista ? formatearPrecio(precioLista.toString()) : ''
  );

  /**
   * Manejar cambio en el input de precio
   */
  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    // Remover todo excepto números
    const soloNumeros = valor.replace(/\D/g, '');

    // Actualizar el valor formateado para mostrar
    const formateado = formatearPrecio(soloNumeros);
    setPrecioFormateado(formateado);

    // Actualizar el valor numérico real en el formulario
    const valorNumerico = soloNumeros ? parseInt(soloNumeros, 10) : 0;
    setValue('precioLista', valorNumerico, { shouldValidate: true });
  };

  // Actualizar precio formateado si cambia desde afuera
  React.useEffect(() => {
    if (precioLista && !precioFormateado) {
      setPrecioFormateado(formatearPrecio(precioLista.toString()));
    }
  }, [precioLista, precioFormateado]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <FileText size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Información Básica
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Código del Lote */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Hash size={14} className="text-slate-400" />
            Código del Lote
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('codigo')}
            type="text"
            placeholder="Ej: LOTE-001"
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.codigo
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.codigo && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              {errors.codigo.message}
            </p>
          )}
        </div>

        {/* Ancho */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Ruler size={14} className="text-slate-400" />
            Ancho (metros)
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('anchoM', { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="Ej: 10.5"
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.anchoM
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.anchoM && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.anchoM.message}
            </p>
          )}
        </div>

        {/* Largo */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Ruler size={14} className="text-slate-400" />
            Largo (metros)
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register('largoM', { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="Ej: 20.5"
            className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.largoM
                ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
              } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.largoM && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.largoM.message}
            </p>
          )}
        </div>

        {/* Superficie (calculada) */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Ruler size={14} className="text-slate-400" />
            Superficie Total (m²)
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register('superficieM2', { valueAsNumber: true })}
              type="number"
              step="0.01"
              value={superficieM2 || ''}
              readOnly
              className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white cursor-not-allowed"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
              Auto
            </div>
          </div>
          {errors.superficieM2 && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.superficieM2.message}
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {superficieM2 ? `Calculado: ${superficieM2.toFixed(2)} m²` : 'Se calcula automáticamente'}
          </p>
        </div>

        {/* Precio de Lista - Input formateado */}
        <div className="md:col-span-2 space-y-2">
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <DollarSign size={14} className="text-slate-400" />
            Precio de Lista (COP)
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium">
              $
            </span>
            <input
              type="text"
              value={precioFormateado}
              onChange={handlePrecioChange}
              placeholder="25.000.000"
              className={`w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border ${errors.precioLista
                  ? 'border-red-300 dark:border-red-700 focus:ring-red-500'
                  : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500'
                } rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all`}
            />
          </div>
          {/* Input oculto para react-hook-form */}
          <input
            {...register('precioLista', { valueAsNumber: true })}
            type="hidden"
          />
          {errors.precioLista && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.precioLista.message}
            </p>
          )}
          {precioFormateado && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Valor ingresado: <span className="font-medium text-slate-700 dark:text-slate-300">${precioFormateado} COP</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioBasico;
