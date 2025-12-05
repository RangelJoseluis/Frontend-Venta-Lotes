/**
 * COMPONENTE: SeccionVenta
 * 
 * Sección del formulario para seleccionar la venta
 * Diseño moderno con Tailwind CSS
 */

import Select from 'react-select';
import { Home, User, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { VentaResumen } from '../../../../types';
import type { VentaOption } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import InfoPanel from '../InfoPanel/InfoPanel';
import { getReactSelectStyles } from '../../constants';

interface SeccionVentaProps {
  ventas: VentaResumen[];
  selectedVentaUid: string;
  onChange: (ventaUid: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
}

export default function SeccionVenta({
  ventas,
  selectedVentaUid,
  onChange,
  isLoading,
  isDisabled
}: SeccionVentaProps) {
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
  const ventasOptions: VentaOption[] = ventas.map(venta => ({
    value: venta.uid,
    label: `${venta.lote.codigo} - ${venta.cliente.nombres} ${venta.cliente.apellidos} - ${formatCurrency(venta.montoPendiente)} pendiente`
  }));

  // Venta seleccionada
  const ventaSeleccionada = ventas.find(v => v.uid === selectedVentaUid);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Home size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Seleccionar Venta
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Busca la venta a la que deseas abonar
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="ventaUid" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Home size={16} className="text-slate-400" />
            Venta <span className="text-red-500">*</span>
          </label>
          <Select
            id="ventaUid"
            name="ventaUid"
            options={ventasOptions}
            value={ventasOptions.find(option => option.value === selectedVentaUid) || null}
            onChange={(selectedOption) => {
              onChange(selectedOption?.value || '');
            }}
            placeholder="Seleccione una venta..."
            isLoading={isLoading}
            isDisabled={isDisabled}
            isClearable
            isSearchable
            noOptionsMessage={() => 'No hay ventas activas con cuotas pendientes'}
            loadingMessage={() => 'Cargando ventas...'}
            styles={getReactSelectStyles()}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {ventaSeleccionada && (
          <InfoPanel
            items={[
              {
                icon: User,
                label: 'Cliente',
                value: `${ventaSeleccionada.cliente.nombres} ${ventaSeleccionada.cliente.apellidos}`
              },
              {
                icon: Home,
                label: 'Lote',
                value: ventaSeleccionada.lote.codigo
              },
              {
                icon: TrendingUp,
                label: 'Pendiente',
                value: formatCurrency(ventaSeleccionada.montoPendiente),
                valueClass: 'text-orange-600 dark:text-orange-400 font-semibold'
              }
            ]}
          />
        )}
      </div>
    </div>
  );
}
