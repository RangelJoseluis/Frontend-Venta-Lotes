/**
 * COMPONENTE: SeccionCuota
 * 
 * Sección del formulario para seleccionar la cuota a pagar
 * Diseño moderno con Tailwind CSS
 */

import Select from 'react-select';
import { FileText, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Cuota } from '../../../../types';
import type { CuotaOption } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import InfoPanel from '../InfoPanel/InfoPanel';
import { getReactSelectStyles } from '../../constants';

interface SeccionCuotaProps {
  cuotas: Cuota[];
  selectedCuotaUid: string;
  cuotaSeleccionada: Cuota | null;
  onChange: (cuotaUid: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export default function SeccionCuota({
  cuotas,
  selectedCuotaUid,
  cuotaSeleccionada,
  onChange,
  isLoading,
  isDisabled
}: SeccionCuotaProps) {
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

  // Opciones para react-select
  const cuotasOptions: CuotaOption[] = cuotas.map(cuota => ({
    value: cuota.uid,
    label: `Cuota #${cuota.numeroCuota} - ${formatCurrency(cuota.montoPendiente)} pendiente - Vence: ${formatDate(cuota.fechaVencimiento)}`
  }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <FileText size={20} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Seleccionar Cuota
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Elige la cuota que se va a pagar
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="cuotaUid" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText size={16} className="text-slate-400" />
            Cuota <span className="text-red-500">*</span>
          </label>
          <Select
            id="cuotaUid"
            name="cuotaUid"
            options={cuotasOptions}
            value={cuotasOptions.find(option => option.value === selectedCuotaUid) || null}
            onChange={(selectedOption) => {
              onChange(selectedOption?.value || '');
            }}
            placeholder="Seleccione una cuota..."
            isLoading={isLoading}
            isDisabled={isDisabled}
            isClearable
            isSearchable
            noOptionsMessage={() => 'No hay cuotas pendientes'}
            loadingMessage={() => 'Cargando cuotas...'}
            styles={getReactSelectStyles()}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {cuotaSeleccionada && (
          <InfoPanel
            items={[
              {
                label: 'Valor Total',
                value: formatCurrency(cuotaSeleccionada.valor)
              },
              {
                label: 'Pagado',
                value: formatCurrency(cuotaSeleccionada.montoPagado),
                valueClass: 'text-green-600 dark:text-green-400 font-medium'
              },
              {
                label: 'Pendiente',
                value: formatCurrency(cuotaSeleccionada.montoPendiente),
                valueClass: 'text-orange-600 dark:text-orange-400 font-bold'
              },
              {
                label: 'Vencimiento',
                value: formatDate(cuotaSeleccionada.fechaVencimiento)
              }
            ]}
            alert={cuotaSeleccionada.estaVencida ? {
              icon: Clock,
              message: `Esta cuota está vencida (${cuotaSeleccionada.diasVencimiento} días)`,
              type: 'warning'
            } : undefined}
          />
        )}
      </div>
    </div>
  );
}
