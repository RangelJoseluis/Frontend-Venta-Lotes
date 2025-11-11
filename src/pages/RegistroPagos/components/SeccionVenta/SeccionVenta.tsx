/**
 * COMPONENTE: SeccionVenta
 * 
 * Sección del formulario para seleccionar la venta
 * Incluye selector react-select y panel de información
 */

import Select from 'react-select';
import { Home, User, TrendingUp } from 'lucide-react';
import type { VentaResumen } from '../../../../types';
import type { VentaOption } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import InfoPanel from '../InfoPanel/InfoPanel';
import './SeccionVenta.css';

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
  // Opciones para react-select
  const ventasOptions: VentaOption[] = ventas.map(venta => ({
    value: venta.uid,
    label: `${venta.lote.codigo} - ${venta.cliente.nombres} ${venta.cliente.apellidos} - ${formatCurrency(venta.montoPendiente)} pendiente`
  }));

  // Venta seleccionada
  const ventaSeleccionada = ventas.find(v => v.uid === selectedVentaUid);

  return (
    <div className="form-section">
      <h3 className="section-title">
        <Home className="section-icon" />
        Seleccionar Venta
      </h3>

      <div className="form-field">
        <label htmlFor="ventaUid" className="form-label">
          Venta <span className="required">*</span>
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
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '44px',
              borderColor: '#e2e8f0',
              '&:hover': { borderColor: '#cbd5e1' }
            })
          }}
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
              valueClass: 'text-orange-600'
            }
          ]}
        />
      )}
    </div>
  );
}
