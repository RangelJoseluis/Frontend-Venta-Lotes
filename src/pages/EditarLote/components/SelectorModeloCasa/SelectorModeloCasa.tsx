/**
 * COMPONENTE: SELECTOR MODELO DE CASA
 * 
 * Galería de tarjetas para seleccionar un modelo de casa opcional
 */

import React from 'react';
import { Home, Square, Bath, Bed, Building2, DollarSign, X } from 'lucide-react';
import type { ModeloCasa } from '../../../../types';

interface SelectorModeloCasaProps {
  modelosCasaDisponibles: ModeloCasa[];
  modeloCasaSeleccionado: string;
  onChangeModelo: (modeloUid: string) => void;
}

const SelectorModeloCasa: React.FC<SelectorModeloCasaProps> = ({
  modelosCasaDisponibles,
  modeloCasaSeleccionado,
  onChangeModelo
}) => {
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Home size={20} className="text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Modelo de Casa
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Opcional - Selecciona un modelo para el lote
            </p>
          </div>
        </div>
        {modeloCasaSeleccionado && (
          <button
            onClick={() => onChangeModelo('')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <X size={16} />
            Quitar modelo
          </button>
        )}
      </div>

      {modelosCasaDisponibles.length === 0 ? (
        <div className="text-center py-12">
          <Home size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-slate-500 dark:text-slate-400">No hay modelos de casa disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Opción: Sin modelo */}
          <label
            className={`relative flex flex-col cursor-pointer rounded-lg border-2 transition-all overflow-hidden ${!modeloCasaSeleccionado
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
          >
            <input
              type="radio"
              name="modeloCasa"
              value=""
              checked={!modeloCasaSeleccionado}
              onChange={() => onChangeModelo('')}
              className="sr-only"
            />

            {/* Imagen placeholder */}
            <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
              <Home size={48} className="text-slate-400 dark:text-slate-600" />
            </div>

            {/* Contenido */}
            <div className="p-4">
              <h3 className={`font-semibold mb-1 ${!modeloCasaSeleccionado
                  ? 'text-blue-900 dark:text-blue-100'
                  : 'text-slate-800 dark:text-white'
                }`}>
                Sin modelo de casa
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                El lote no incluye un modelo de casa
              </p>
            </div>

            {/* Indicador de selección */}
            {!modeloCasaSeleccionado && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </label>

          {/* Modelos disponibles */}
          {modelosCasaDisponibles.map((modelo) => {
            const isSelected = modeloCasaSeleccionado === modelo.uid;

            return (
              <label
                key={modelo.uid}
                className={`relative flex flex-col cursor-pointer rounded-lg border-2 transition-all overflow-hidden ${isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
              >
                <input
                  type="radio"
                  name="modeloCasa"
                  value={modelo.uid}
                  checked={isSelected}
                  onChange={() => onChangeModelo(modelo.uid)}
                  className="sr-only"
                />

                {/* Imagen del modelo */}
                <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                  {modelo.imagenUrl ? (
                    <img
                      src={modelo.imagenUrl}
                      alt={modelo.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center ${modelo.imagenUrl ? 'hidden' : ''}`}>
                    <Home size={48} className="text-slate-400 dark:text-slate-600" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className={`font-semibold mb-1 ${isSelected
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-slate-800 dark:text-white'
                    }`}>
                    {modelo.nombre}
                  </h3>

                  {modelo.descripcion && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                      {modelo.descripcion}
                    </p>
                  )}

                  {/* Especificaciones */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Square size={14} className="text-slate-400" />
                      <span>{modelo.metrosCubiertos}m²</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Bed size={14} className="text-slate-400" />
                      <span>{modelo.ambientes} amb.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Bath size={14} className="text-slate-400" />
                      <span>{modelo.banos} baños</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Building2 size={14} className="text-slate-400" />
                      <span>{modelo.pisos} piso(s)</span>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className={`mt-3 pt-3 border-t ${isSelected
                      ? 'border-blue-200 dark:border-blue-800'
                      : 'border-slate-200 dark:border-slate-700'
                    }`}>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={14} className="text-green-600 dark:text-green-400" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {formatearPrecio(modelo.precioBase)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Indicador de selección */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectorModeloCasa;
