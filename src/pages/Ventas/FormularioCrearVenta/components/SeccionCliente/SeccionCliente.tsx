// Componente SeccionCliente - Selector de cliente para el formulario
// Diseño moderno con Tailwind CSS

import { User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import type { ClienteOption } from '../../types';
import { getReactSelectStyles } from '../../constants';

interface SeccionClienteProps {
  clienteSeleccionado: string;
  clientesOptions: ClienteOption[];
  onClienteChange: (value: string) => void;
  isLoading?: boolean;
}

export const SeccionCliente: React.FC<SeccionClienteProps> = ({
  clienteSeleccionado,
  clientesOptions,
  onClienteChange,
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
    onClienteChange(selectedOption ? selectedOption.value : '');
  };

  const selectedValue = clientesOptions.find(option => option.value === clienteSeleccionado) || null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <User size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Información del Cliente
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Selecciona el cliente que realizará la compra
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="cliente" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <User size={16} className="text-slate-400" />
          Cliente <span className="text-red-500">*</span>
        </label>
        <Select
          id="cliente"
          value={selectedValue}
          onChange={handleSelectChange}
          options={clientesOptions}
          placeholder="Buscar cliente por nombre, documento o teléfono..."
          isSearchable
          isClearable
          isLoading={isLoading}
          loadingMessage={() => "Cargando clientes..."}
          noOptionsMessage={() => "No se encontraron clientes"}
          styles={getReactSelectStyles()}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Busca y selecciona el cliente que realizará la compra del lote
        </p>
      </div>
    </div>
  );
};
