// Componente SeccionPago - Configuración de pago y financiación
// Maneja precio, modalidad, cuotas y monto inicial

import { DollarSign, Calendar } from 'lucide-react';
import type { VentaFormData } from '../../types';
import { MODALIDADES_PAGO, OPCIONES_CUOTAS } from '../../constants';
import { formatCurrencyInput } from '../../utils/formatters';
import './SeccionPago.css';

interface SeccionPagoProps {
  formData: VentaFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCurrencyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SeccionPago: React.FC<SeccionPagoProps> = ({
  formData,
  onInputChange,
  onCurrencyChange
}) => {
  return (
    <div className="formulario-section">
      <div className="formulario-section-header">
        <DollarSign className="formulario-section-icon" />
        <h3 className="formulario-section-title">Condiciones de Pago</h3>
      </div>

      <div className="formulario-grid formulario-grid-2">
        {/* Precio de Venta */}
        <div className="formulario-field">
          <label htmlFor="precioVenta" className="formulario-label">
            Precio de Venta <span className="formulario-required">*</span>
          </label>
          <div className="formulario-input-group">
            <span className="formulario-input-prefix">$</span>
            <input
              type="text"
              id="precioVenta"
              name="precioVenta"
              value={formatCurrencyInput(formData.precioVenta)}
              onChange={onCurrencyChange}
              placeholder="0"
              className="formulario-input formulario-input-currency"
              required
            />
          </div>
          <p className="formulario-help">
            Precio final acordado para la venta del lote
          </p>
        </div>

        {/* Modalidad de Pago */}
        <div className="formulario-field">
          <label htmlFor="modalidadPago" className="formulario-label">
            Modalidad de Pago <span className="formulario-required">*</span>
          </label>
          <select
            id="modalidadPago"
            name="modalidadPago"
            value={formData.modalidadPago}
            onChange={onInputChange}
            className="formulario-select-native"
            required
          >
            {MODALIDADES_PAGO.map(modalidad => (
              <option key={modalidad.value} value={modalidad.value}>
                {modalidad.label}
              </option>
            ))}
          </select>
          <p className="formulario-help">
            Forma de pago: contado completo o financiación por cuotas
          </p>
        </div>

        {/* Cantidad de Cuotas - Solo si es modalidad cuotas */}
        {formData.modalidadPago === 'cuotas' && (
          <div className="formulario-field">
            <label htmlFor="cantidadCuotas" className="formulario-label">
              <Calendar className="formulario-label-icon" />
              Cantidad de Cuotas <span className="formulario-required">*</span>
            </label>
            <select
              id="cantidadCuotas"
              name="cantidadCuotas"
              value={formData.cantidadCuotas}
              onChange={onInputChange}
              className="formulario-select-native"
              required
            >
              {OPCIONES_CUOTAS.map(opcion => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </option>
              ))}
            </select>
            <p className="formulario-help">
              Número de cuotas mensuales para el financiamiento
            </p>
          </div>
        )}

        {/* Monto Inicial - Solo si es modalidad cuotas */}
        {formData.modalidadPago === 'cuotas' && (
          <div className="formulario-field">
            <label htmlFor="montoInicial" className="formulario-label">
              Monto Inicial <span className="formulario-required">*</span>
            </label>
            <div className="formulario-input-group">
              <span className="formulario-input-prefix">$</span>
              <input
                type="text"
                id="montoInicial"
                name="montoInicial"
                value={formatCurrencyInput(formData.montoInicial)}
                onChange={onCurrencyChange}
                placeholder="0"
                className="formulario-input formulario-input-currency"
                required
              />
            </div>
            <p className="formulario-help">
              Pago inicial requerido al momento de la firma
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
