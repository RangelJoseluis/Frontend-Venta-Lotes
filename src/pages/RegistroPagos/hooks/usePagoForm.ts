/**
 * HOOK: usePagoForm
 * 
 * Hook personalizado para gestionar el estado y lógica del formulario de pago
 */

import { useState } from 'react';
import { pagosService } from '../../../services/pagos.service';
import { getErrorMessage } from '../../../services/http.service';
import type { CrearPagoResponse, Cuota } from '../../../types';
import type { PagoFormData } from '../types';
import { INITIAL_FORM_DATA } from '../constants';

export function usePagoForm() {
  const [formData, setFormData] = useState<PagoFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pagoResponse, setPagoResponse] = useState<CrearPagoResponse | null>(null);

  /**
   * Maneja cambios en los inputs del formulario
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Actualiza un campo específico del formulario
   */
  const updateField = (field: keyof PagoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Autocompleta el monto con el pendiente de la cuota
   * NOTA: cuota.montoPendiente viene en PESOS (no centavos)
   * porque Colombia maneja pesos colombianos (moneda indivisible)
   */
  const autocompletarMonto = (cuota: Cuota | null) => {
    if (cuota) {
      // Asignar directamente en pesos (sin conversión)
      setFormData(prev => ({ ...prev, monto: cuota.montoPendiente.toString() }));
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validar monto
      const montoNumerico = parseFloat(formData.monto);
      if (isNaN(montoNumerico) || montoNumerico <= 0) {
        throw new Error('El monto debe ser mayor a cero');
      }

      // Preparar datos para enviar (sin conversión, todo en pesos)
      const pagoDto = {
        cuotaUid: formData.cuotaUid,
        monto: montoNumerico, // Ya está en pesos (sin conversión)
        fechaPago: formData.fechaPago,
        metodoPago: formData.metodoPago,
        referencia: formData.referencia || undefined,
        observaciones: formData.observaciones || undefined,
      };

      console.log('📤 Enviando pago:', pagoDto);

      // Llamar al servicio
      const response = await pagosService.crear(pagoDto);

      console.log('✅ Pago registrado exitosamente:', response);

      // Actualizar estado de éxito
      setPagoResponse(response);
      setSuccess(true);
    } catch (err) {
      console.error('❌ Error al registrar pago:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resetea el formulario para registrar otro pago
   */
  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setSuccess(false);
    setPagoResponse(null);
    setError(null);
  };

  return {
    formData,
    setFormData,
    handleChange,
    updateField,
    autocompletarMonto,
    handleSubmit,
    resetForm,
    isSubmitting,
    error,
    setError,
    success,
    pagoResponse,
  };
}
