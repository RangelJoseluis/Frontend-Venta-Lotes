/**
 * EXPORTS CENTRALIZADOS - REGISTRO DE PAGOS
 * 
 * Punto de entrada único del módulo para imports limpios
 */

export { default } from './RegistroPagos';
export { default as RegistroPagos } from './RegistroPagos';

// Re-exportar tipos si otros módulos los necesitan
export type { PagoFormData, VentaOption, CuotaOption } from './types';
