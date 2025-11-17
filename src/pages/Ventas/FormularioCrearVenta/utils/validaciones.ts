// Utilidades de validación para FormularioCrearVenta
// Funciones para validar formulario y datos de entrada

import type { VentaFormData } from '../types';
import { VALIDATION_MESSAGES } from '../constants';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valida que un valor numérico sea válido y mayor a 0
 * @param value - Valor a validar
 * @returns true si es válido
 */
export const isValidNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num > 0;
};

/**
 * Valida que un campo requerido no esté vacío
 * @param value - Valor a validar
 * @returns true si no está vacío
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Valida el formulario completo de venta
 * @param formData - Datos del formulario
 * @returns Resultado de validación con errores
 */
export const validateFormularioVenta = (formData: VentaFormData): ValidationResult => {
  const errors: string[] = [];

  // Validar cliente
  if (!isRequired(formData.clienteUid)) {
    errors.push(VALIDATION_MESSAGES.CLIENTE_REQUIRED);
  }

  // Validar lote
  if (!isRequired(formData.loteUid)) {
    errors.push(VALIDATION_MESSAGES.LOTE_REQUIRED);
  }

  // Validar precio de venta
  if (!isRequired(formData.precioVenta)) {
    errors.push(VALIDATION_MESSAGES.PRECIO_REQUIRED);
  } else if (!isValidNumber(formData.precioVenta)) {
    errors.push(VALIDATION_MESSAGES.PRECIO_INVALID);
  }

  // Validaciones específicas para cuotas
  if (formData.modalidadPago === 'cuotas') {
    // Validar cantidad de cuotas
    if (!isRequired(formData.cantidadCuotas)) {
      errors.push(VALIDATION_MESSAGES.CUOTAS_REQUIRED);
    }

    // Validar monto inicial
    if (!isRequired(formData.montoInicial)) {
      errors.push(VALIDATION_MESSAGES.INICIAL_REQUIRED);
    } else if (isValidNumber(formData.montoInicial) && isValidNumber(formData.precioVenta)) {
      const inicial = parseFloat(formData.montoInicial);
      const precio = parseFloat(formData.precioVenta);
      
      if (inicial >= precio) {
        errors.push(VALIDATION_MESSAGES.INICIAL_INVALID);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida que el monto inicial sea menor al precio total
 * @param inicial - Monto inicial
 * @param precio - Precio total
 * @returns true si es válido
 */
export const validateMontoInicial = (inicial: string, precio: string): boolean => {
  if (!isValidNumber(inicial) || !isValidNumber(precio)) {
    return false;
  }

  const montoInicial = parseFloat(inicial);
  const precioTotal = parseFloat(precio);

  return montoInicial < precioTotal && montoInicial > 0;
};

/**
 * Valida que la cantidad de cuotas sea válida
 * @param cuotas - Cantidad de cuotas
 * @returns true si es válido
 */
export const validateCantidadCuotas = (cuotas: string): boolean => {
  const num = parseInt(cuotas);
  return !isNaN(num) && num > 0 && num <= 60; // Máximo 60 cuotas
};
