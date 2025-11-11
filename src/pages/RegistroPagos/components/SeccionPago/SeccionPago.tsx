/**
 * COMPONENTE: SeccionPago
 * 
 * Sección del formulario con los campos de información del pago
 * Incluye: monto, fecha, método de pago, referencia, observaciones
 */

import { DollarSign, Calendar } from 'lucide-react';
import type { Cuota } from '../../../../types';
import type { PagoFormData } from '../../types';
import { METODO_PAGO_OPTIONS } from '../../constants';
import './SeccionPago.css';

interface SeccionPagoProps {
  formData: PagoFormData;
  cuotaSeleccionada: Cuota | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onAutocompletarMonto: () => void;
}

export default function SeccionPago({
  formData,
  cuotaSeleccionada,
  onChange,
  onAutocompletarMonto
}: SeccionPagoProps) {
  return (
    <div className="form-section">
      <h3 className="section-title">
        <DollarSign className="section-icon" />
        Información del Pago
      </h3>

      <div className="form-grid">
        {/* Monto */}
        <div className="form-field">
          <label htmlFor="monto" className="form-label">
            Monto <span className="required">*</span>
          </label>
          <div className="input-currency">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={onChange}
              placeholder="0"
              step="0.01"
              min="0"
              className="form-input input-with-symbol"
              required
            />
          </div>
          {cuotaSeleccionada && (
            <button
              type="button"
              onClick={onAutocompletarMonto}
              className="btn-autocomplete"
            >
              Usar monto pendiente ({cuotaSeleccionada.montoPendiente.toLocaleString('es-CO')})
            </button>
          )}
        </div>

        {/* Fecha de Pago */}
        <div className="form-field">
          <label htmlFor="fechaPago" className="form-label">
            Fecha de Pago <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Calendar className="input-icon" />
            <input
              type="date"
              id="fechaPago"
              name="fechaPago"
              value={formData.fechaPago}
              onChange={onChange}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Método de Pago */}
        <div className="form-field">
          <label htmlFor="metodoPago" className="form-label">
            Método de Pago <span className="required">*</span>
          </label>
          <select
            id="metodoPago"
            name="metodoPago"
            value={formData.metodoPago}
            onChange={onChange}
            className="form-select"
            required
          >
            {METODO_PAGO_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Referencia */}
        <div className="form-field">
          <label htmlFor="referencia" className="form-label">
            Referencia
          </label>
          <input
            type="text"
            id="referencia"
            name="referencia"
            value={formData.referencia}
            onChange={onChange}
            placeholder="Ej: TRANS-2025-001"
            className="form-input"
          />
          <p className="field-hint">
            Opcional. Se genera automáticamente si no se especifica.
          </p>
        </div>
      </div>

      {/* Observaciones */}
      <div className="form-field">
        <label htmlFor="observaciones" className="form-label">
          Observaciones
        </label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={onChange}
          placeholder="Información adicional sobre el pago..."
          className="form-textarea"
          rows={3}
        />
      </div>
    </div>
  );
}
