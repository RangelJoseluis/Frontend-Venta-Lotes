/**
 * COMPONENTE: FORMULARIO UBICACIÓN
 * 
 * Campos de ubicación del lote:
 * - Dirección
 * - Manzana
 * - Número de lote
 */

import React from 'react';
import { MapPin } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoteFormData } from '../../types';

interface FormularioUbicacionProps {
  register: UseFormRegister<LoteFormData>;
  errors: FieldErrors<LoteFormData>;
}

const FormularioUbicacion: React.FC<FormularioUbicacionProps> = ({
  register,
  errors
}) => {
  return (
    <div className="form-section">
      <h2 className="form-section-title">
        <MapPin size={20} />
        Ubicación
      </h2>

      <div className="form-grid">
        {/* Dirección */}
        <div className="form-field form-field-full">
          <label className="form-label form-label-required">Dirección</label>
          <input
            {...register('direccion')}
            type="text"
            placeholder="Ej: Calle 123 #45-67"
            className={`form-input ${errors.direccion ? 'form-input-error' : ''}`}
          />
          {errors.direccion && (
            <span className="form-error">{errors.direccion.message}</span>
          )}
        </div>

        {/* Manzana */}
        <div className="form-field">
          <label className="form-label form-label-required">Manzana</label>
          <input
            {...register('manzana')}
            type="text"
            placeholder="Ej: A, B, 1, 2"
            className={`form-input ${errors.manzana ? 'form-input-error' : ''}`}
          />
          {errors.manzana && (
            <span className="form-error">{errors.manzana.message}</span>
          )}
        </div>

        {/* Número de Lote */}
        <div className="form-field">
          <label className="form-label form-label-required">Número de Lote</label>
          <input
            {...register('numeroLote')}
            type="text"
            placeholder="Ej: 12, 34"
            className={`form-input ${errors.numeroLote ? 'form-input-error' : ''}`}
          />
          {errors.numeroLote && (
            <span className="form-error">{errors.numeroLote.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioUbicacion;
