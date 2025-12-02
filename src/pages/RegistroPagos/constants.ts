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

/**
 * Función para obtener estilos de react-select dinámicamente según el tema actual
 */
export const getReactSelectStyles = () => {
  const isDark = document.documentElement.classList.contains('dark');

  return {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '42px',
      fontSize: '14px',
      backgroundColor: isDark ? '#0f172a' : 'white',
      borderColor: state.isFocused
        ? '#3b82f6'
        : (isDark ? '#475569' : '#e2e8f0'),
      color: isDark ? 'white' : '#1e293b',
      '&:hover': {
        borderColor: '#3b82f6',
      },
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1e293b' : 'white',
      border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    }),
    option: (base: any, state: any) => ({
      ...base,
      fontSize: '14px',
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
          ? (isDark ? '#334155' : '#f1f5f9')
          : (isDark ? '#1e293b' : 'white'),
      color: state.isSelected ? 'white' : (isDark ? '#f1f5f9' : '#1e293b'),
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3b82f6',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#1e293b',
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#1e293b',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: isDark ? '#94a3b8' : '#94a3b8',
    }),
  };
};
