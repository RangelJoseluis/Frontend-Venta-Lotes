// Componente SeccionLote - Selector de lote para el formulario
// Maneja la selección de lote con react-select

import { Home } from 'lucide-react';
import Select from 'react-select';
import type { LoteOption } from '../../types';
import { REACT_SELECT_STYLES } from '../../constants';
import './SeccionLote.css';

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
  const handleSelectChange = (selectedOption: any) => {
    onLoteChange(selectedOption ? selectedOption.value : '');
  };

  const selectedValue = lotesOptions.find(option => option.value === loteSeleccionado) || null;

  return (
    <div className="formulario-section">
      <div className="formulario-section-header">
        <Home className="formulario-section-icon" />
        <h3 className="formulario-section-title">Selección del Lote</h3>
      </div>

      <div className="formulario-grid">
        <div className="formulario-field">
          <label htmlFor="lote" className="formulario-label">
            Lote Disponible <span className="formulario-required">*</span>
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
            styles={REACT_SELECT_STYLES}
            className="formulario-select"
            classNamePrefix="formulario-select"
          />
          <p className="formulario-help">
            Solo se muestran lotes con estado "disponible" para la venta
          </p>
        </div>
      </div>
    </div>
  );
};
