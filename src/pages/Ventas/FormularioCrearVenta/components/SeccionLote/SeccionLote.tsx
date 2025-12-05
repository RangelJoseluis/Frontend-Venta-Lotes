// Componente SeccionLote - Selector de lote para el formulario
// Diseño moderno con Tailwind CSS

import { Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import type { LoteOption } from '../../types';
import { getReactSelectStyles } from '../../constants';

interface SeccionLoteProps {
  loteSeleccionado: string;
  lotesOptions: LoteOption[];
  onLoteChange: (value: string) => void;
  isLoading?: boolean;
}

export const SeccionLote: React.FC<SeccionLoteProps> = ({
  loteSeleccionado,
  lotesOptions,
  onLoteChange,
  isLoading = false
}) => {
  const [, setTheme] = useState(document.documentElement.classList.contains('dark'));

  // Detectar cambios en el tema
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectChange = (selectedOption: any) => {
    onLoteChange(selectedOption ? selectedOption.value : '');
  };

  const selectedValue = lotesOptions.find(option => option.value === loteSeleccionado) || null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Home size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Selección del Lote
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Elige el lote que se venderá
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="lote" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Home size={16} className="text-slate-400" />
          Lote Disponible <span className="text-red-500">*</span>
        </label>
        <Select
          id="lote"
          value={selectedValue}
          onChange={handleSelectChange}
          options={lotesOptions}
          placeholder="Buscar lote por código, manzana o precio..."
          isSearchable
          isClearable
          isLoading={isLoading}
          loadingMessage={() => "Cargando lotes disponibles..."}
          noOptionsMessage={() => "No se encontraron lotes disponibles"}
          styles={getReactSelectStyles()}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Solo se muestran lotes con estado "disponible" para la venta
        </p>
      </div>
    </div>
  );
};
