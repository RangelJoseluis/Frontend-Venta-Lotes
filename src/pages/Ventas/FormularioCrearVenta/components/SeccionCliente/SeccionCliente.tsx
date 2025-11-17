// Componente SeccionCliente - Selector de cliente para el formulario
// Maneja la selección de cliente con react-select

import { User } from 'lucide-react';
import Select from 'react-select';
import type { ClienteOption } from '../../types';
import { REACT_SELECT_STYLES } from '../../constants';
import './SeccionCliente.css';

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
  const handleSelectChange = (selectedOption: any) => {
    onClienteChange(selectedOption ? selectedOption.value : '');
  };

  const selectedValue = clientesOptions.find(option => option.value === clienteSeleccionado) || null;

  return (
    <div className="formulario-section">
      <div className="formulario-section-header">
        <User className="formulario-section-icon" />
        <h3 className="formulario-section-title">Información del Cliente</h3>
      </div>

      <div className="formulario-grid">
        <div className="formulario-field">
          <label htmlFor="cliente" className="formulario-label">
            Cliente <span className="formulario-required">*</span>
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
            styles={REACT_SELECT_STYLES}
            className="formulario-select"
            classNamePrefix="formulario-select"
          />
          <p className="formulario-help">
            Seleccione el cliente que realizará la compra del lote
          </p>
        </div>
      </div>
    </div>
  );
};
