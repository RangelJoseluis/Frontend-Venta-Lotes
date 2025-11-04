/**
 * COMPONENTE: FORMULARIO BÁSICO
 * 
 * Campos básicos del lote:
 * - Código
 * - Dimensiones (ancho, largo)
 * - Superficie (calculada automáticamente)
 * - Precio de lista
 */

import React, { useState } from 'react';
import { FileText, Ruler, DollarSign } from 'lucide-react';
import type { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import type { LoteFormData } from '../../types.ts';

interface FormularioBasicoProps {
  register: UseFormRegister<LoteFormData>;
  errors: FieldErrors<LoteFormData>;
  superficieM2: number;
  setValue: UseFormSetValue<LoteFormData>;
  precioLista: number;
}

/**
 * Formatea un número con separadores de miles
 */
const formatearPrecio = (valor: string): string => {
  // Remover todo excepto números
  const soloNumeros = valor.replace(/\D/g, '');
  if (!soloNumeros) return '';
  
  // Formatear con puntos como separadores de miles
  return new Intl.NumberFormat('es-CO').format(parseInt(soloNumeros, 10));
};

const FormularioBasico: React.FC<FormularioBasicoProps> = ({
  register,
  errors,
  superficieM2,
  setValue,
  precioLista
}) => {
  // Estado local para el valor formateado del precio
  const [precioFormateado, setPrecioFormateado] = useState(() => 
    precioLista ? formatearPrecio(precioLista.toString()) : ''
  );

  /**
   * Manejar cambio en el input de precio
   */
  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    
    // Remover todo excepto números
    const soloNumeros = valor.replace(/\D/g, '');
    
    // Actualizar el valor formateado para mostrar
    const formateado = formatearPrecio(soloNumeros);
    setPrecioFormateado(formateado);
    
    // Actualizar el valor numérico real en el formulario
    const valorNumerico = soloNumeros ? parseInt(soloNumeros, 10) : 0;
    setValue('precioLista', valorNumerico, { shouldValidate: true });
  };

  // Actualizar precio formateado si cambia desde afuera
  React.useEffect(() => {
    if (precioLista && !precioFormateado) {
      setPrecioFormateado(formatearPrecio(precioLista.toString()));
    }
  }, [precioLista, precioFormateado]);
  return (
    <div className="form-section">
      <h2 className="form-section-title">
        <FileText size={20} />
        Información Básica
      </h2>

      <div className="form-grid">
        {/* Código del Lote */}
        <div className="form-field">
          <label className="form-label form-label-required">Código del Lote</label>
          <input
            {...register('codigo')}
            type="text"
            placeholder="Ej: LOTE-001"
            className={`form-input ${errors.codigo ? 'form-input-error' : ''}`}
          />
          {errors.codigo && (
            <span className="form-error">{errors.codigo.message}</span>
          )}
        </div>

        {/* Ancho */}
        <div className="form-field">
          <label className="form-label form-label-required">Ancho (metros)</label>
          <input
            {...register('anchoM', { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="Ej: 10.5"
            className={`form-input ${errors.anchoM ? 'form-input-error' : ''}`}
          />
          {errors.anchoM && (
            <span className="form-error">{errors.anchoM.message}</span>
          )}
        </div>

        {/* Largo */}
        <div className="form-field">
          <label className="form-label form-label-required">Largo (metros)</label>
          <input
            {...register('largoM', { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="Ej: 20.5"
            className={`form-input ${errors.largoM ? 'form-input-error' : ''}`}
          />
          {errors.largoM && (
            <span className="form-error">{errors.largoM.message}</span>
          )}
        </div>

        {/* Superficie (calculada) */}
        <div className="form-field">
          <label className="form-label form-label-required">
            <Ruler size={16} />
            Superficie Total (m²)
          </label>
          <input
            {...register('superficieM2', { valueAsNumber: true })}
            type="number"
            step="0.01"
            value={superficieM2 || ''}
            readOnly
            className="form-input form-input-readonly"
          />
          {errors.superficieM2 && (
            <span className="form-error">{errors.superficieM2.message}</span>
          )}
          <span className="form-hint">
            Calculado automáticamente: {superficieM2 ? `${superficieM2} m²` : '-'}
          </span>
        </div>

        {/* Precio de Lista - Input formateado */}
        <div className="form-field form-field-full">
          <label className="form-label form-label-required">
            <DollarSign size={16} />
            Precio de Lista (COP)
          </label>
          <input
            type="text"
            value={precioFormateado}
            onChange={handlePrecioChange}
            placeholder="Ej: 25.000.000"
            className={`form-input ${errors.precioLista ? 'form-input-error' : ''}`}
          />
          {/* Input oculto para react-hook-form */}
          <input
            {...register('precioLista', { valueAsNumber: true })}
            type="hidden"
          />
          {errors.precioLista && (
            <span className="form-error">{errors.precioLista.message}</span>
          )}
          {precioFormateado && (
            <span className="form-hint">
              Valor: ${precioFormateado} COP
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioBasico;
