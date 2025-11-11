/**
 * TIPOS Y INTERFACES - REGISTRO DE PAGOS
 * 
 * Definiciones de tipos específicos del módulo de registro de pagos
 */

import type { MetodoPago } from '../../types';

/**
 * Datos del formulario de pago
 */
export interface PagoFormData {
  ventaUid: string;
  cuotaUid: string;
  monto: string;
  fechaPago: string;
  metodoPago: MetodoPago;
  referencia: string;
  observaciones: string;
}

/**
 * Props para react-select opciones de venta
 */
export interface VentaOption {
  value: string;
  label: string;
}

/**
 * Props para react-select opciones de cuota
 */
export interface CuotaOption {
  value: string;
  label: string;
}
