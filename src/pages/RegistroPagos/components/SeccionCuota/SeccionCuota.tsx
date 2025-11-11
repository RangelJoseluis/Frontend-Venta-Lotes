/**
 * COMPONENTE: SeccionCuota
 * 
 * Sección del formulario para seleccionar la cuota a pagar
 * Incluye selector react-select y panel de información con alertas
 */

import Select from 'react-select';
import { FileText, Clock } from 'lucide-react';
import type { Cuota } from '../../../../types';
import type { CuotaOption } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import InfoPanel from '../InfoPanel/InfoPanel';
import './SeccionCuota.css';

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
  // Opciones para react-select
  const cuotasOptions: CuotaOption[] = cuotas.map(cuota => ({
    value: cuota.uid,
    label: `Cuota #${cuota.numeroCuota} - ${formatCurrency(cuota.montoPendiente)} pendiente - Vence: ${formatDate(cuota.fechaVencimiento)}`
  }));

  return (
    <div className="form-section">
      <h3 className="section-title">
        <FileText className="section-icon" />
        Seleccionar Cuota
      </h3>

      <div className="form-field">
        <label htmlFor="cuotaUid" className="form-label">
          Cuota <span className="required">*</span>
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
              valueClass: 'text-green-600'
            },
            {
              label: 'Pendiente',
              value: formatCurrency(cuotaSeleccionada.montoPendiente),
              valueClass: 'text-orange-600'
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
  );
}
