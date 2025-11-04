/**
 * COMPONENTE: FORMULARIO CARACTERÍSTICAS
 * 
 * Campos de características del lote:
 * - Topografía
 * - Orientación
 * - Vista
 * - Estado
 * - Estado de documentación
 * - Amueblado
 */

import React from 'react';
import { Settings } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoteFormData } from '../../types';

interface FormularioCaracteristicasProps {
  register: UseFormRegister<LoteFormData>;
  errors: FieldErrors<LoteFormData>;
}

const FormularioCaracteristicas: React.FC<FormularioCaracteristicasProps> = ({
  register,
  errors
}) => {
  return (
    <div className="form-section">
      <h2 className="form-section-title">
        <Settings size={20} />
        Características
      </h2>

      <div className="form-grid">
        {/* Topografía */}
        <div className="form-field">
          <label className="form-label form-label-required">Topografía</label>
          <select {...register('topografia')} className="form-select">
            <option value="plano">Plano</option>
            <option value="inclinado">Inclinado</option>
            <option value="irregular">Irregular</option>
          </select>
          {errors.topografia && (
            <span className="form-error">{errors.topografia.message}</span>
          )}
        </div>

        {/* Orientación */}
        <div className="form-field">
          <label className="form-label">Orientación</label>
          <select {...register('orientacion')} className="form-select">
            <option value="">Seleccionar...</option>
            <option value="norte">Norte</option>
            <option value="sur">Sur</option>
            <option value="este">Este</option>
            <option value="oeste">Oeste</option>
            <option value="noreste">Noreste</option>
            <option value="noroeste">Noroeste</option>
            <option value="sureste">Sureste</option>
            <option value="suroeste">Suroeste</option>
          </select>
        </div>

        {/* Vista */}
        <div className="form-field">
          <label className="form-label">Vista</label>
          <select {...register('vista')} className="form-select">
            <option value="">Seleccionar...</option>
            <option value="ciudad">Ciudad</option>
            <option value="montaña">Montaña</option>
            <option value="mar">Mar</option>
            <option value="parque">Parque</option>
            <option value="calle">Calle</option>
            <option value="interior">Interior</option>
          </select>
        </div>

        {/* Estado */}
        <div className="form-field">
          <label className="form-label form-label-required">Estado</label>
          <select {...register('estado')} className="form-select">
            <option value="disponible">Disponible</option>
            <option value="en_cuotas">En Cuotas</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>

        {/* Estado Documentación */}
        <div className="form-field">
          <label className="form-label form-label-required">Estado Documentación</label>
          <select {...register('estadoDocumentacion')} className="form-select">
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En Proceso</option>
            <option value="completa">Completa</option>
            <option value="observaciones">Con Observaciones</option>
          </select>
        </div>
      </div>

      {/* Amueblado */}
      <div className="form-checkbox-wrapper" style={{ marginTop: '1.5rem' }}>
        <input
          {...register('amueblado')}
          type="checkbox"
          id="amueblado"
          className="form-checkbox"
        />
        <label htmlFor="amueblado" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
          Amueblado
        </label>
      </div>
    </div>
  );
};

export default FormularioCaracteristicas;
