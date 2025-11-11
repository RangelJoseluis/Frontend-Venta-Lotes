/**
 * CONSTANTES - REGISTRO DE PAGOS
 * 
 * Valores constantes utilizados en el módulo
 */

import { DollarSign, CreditCard, FileText } from 'lucide-react';
import type { MetodoPago } from '../../types';

/**
 * Opciones de métodos de pago con iconos
 */
export const METODO_PAGO_OPTIONS = [
  { value: 'efectivo' as MetodoPago, label: 'Efectivo 💵', icon: DollarSign },
  { value: 'transferencia' as MetodoPago, label: 'Transferencia Bancaria 🏦', icon: CreditCard },
  { value: 'cheque' as MetodoPago, label: 'Cheque 📝', icon: FileText },
  { value: 'tarjeta' as MetodoPago, label: 'Tarjeta de Crédito/Débito 💳', icon: CreditCard },
];

/**
 * Valores iniciales del formulario
 */
export const INITIAL_FORM_DATA = {
  ventaUid: '',
  cuotaUid: '',
  monto: '',
  fechaPago: new Date().toISOString().split('T')[0],
  metodoPago: 'transferencia' as MetodoPago,
  referencia: '',
  observaciones: '',
};
