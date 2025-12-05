// Utilidades de cálculos financieros para FormularioCrearVenta
// Funciones para calcular cuotas, intereses y resúmenes de venta

import type { ResumenVenta } from '../types';

/**
 * Calcula el resumen completo de una venta
 * @param precioVenta - Precio total de la venta
 * @param montoInicial - Monto inicial pagado
 * @param cantidadCuotas - Cantidad de cuotas (opcional)
 * @returns Resumen completo de la venta
 */
export const calcularResumenVenta = (
  precioVenta: string | number,
  montoInicial: string | number,
  cantidadCuotas?: string | number
): ResumenVenta => {
  const precioTotal = typeof precioVenta === 'string' ? parseFloat(precioVenta) : precioVenta;
  const inicial = typeof montoInicial === 'string' ? parseFloat(montoInicial) : montoInicial;
  
  const saldoAFinanciar = precioTotal - inicial;
  
  const resumen: ResumenVenta = {
    precioTotal: Math.round(precioTotal),
    montoInicial: Math.round(inicial),
    saldoAFinanciar: Math.round(saldoAFinanciar)
  };

  // Calcular valor de cuota si se especifica cantidad
  if (cantidadCuotas) {
    const cuotas = typeof cantidadCuotas === 'string' ? parseInt(cantidadCuotas) : cantidadCuotas;
    if (cuotas > 0) {
      resumen.valorCuota = Math.round(saldoAFinanciar / cuotas);
      resumen.cantidadCuotas = cuotas;
    }
  }

  return resumen;
};

/**
 * Calcula el valor de cada cuota
 * @param saldoAFinanciar - Saldo pendiente de financiar
 * @param cantidadCuotas - Cantidad de cuotas
 * @returns Valor de cada cuota
 */
export const calcularValorCuota = (saldoAFinanciar: number, cantidadCuotas: number): number => {
  if (cantidadCuotas <= 0) return 0;
  return Math.round(saldoAFinanciar / cantidadCuotas);
};

/**
 * Calcula el porcentaje que representa el monto inicial del precio total
 * @param montoInicial - Monto inicial
 * @param precioTotal - Precio total
 * @returns Porcentaje (0-100)
 */
export const calcularPorcentajeInicial = (montoInicial: number, precioTotal: number): number => {
  if (precioTotal <= 0) return 0;
  return Math.round((montoInicial / precioTotal) * 100);
};

/**
 * Valida que los cálculos financieros sean coherentes
 * @param precioVenta - Precio de venta
 * @param montoInicial - Monto inicial
 * @param cantidadCuotas - Cantidad de cuotas
 * @returns true si los cálculos son válidos
 */
export const validarCalculosFinancieros = (
  precioVenta: number,
  montoInicial: number,
  cantidadCuotas: number
): boolean => {
  // Validaciones básicas
  if (precioVenta <= 0 || montoInicial < 0 || cantidadCuotas <= 0) {
    return false;
  }

  // El monto inicial no puede ser mayor al precio total
  if (montoInicial >= precioVenta) {
    return false;
  }

  // Debe quedar un saldo mínimo para financiar
  const saldoAFinanciar = precioVenta - montoInicial;
  if (saldoAFinanciar <= 0) {
    return false;
  }

  return true;
};

/**
 * Sugiere un monto inicial recomendado (20% del precio)
 * @param precioVenta - Precio de venta
 * @returns Monto inicial sugerido
 */
export const sugerirMontoInicial = (precioVenta: number): number => {
  return Math.round(precioVenta * 0.2); // 20% del precio
};

/**
 * Calcula el total de intereses si se aplicara una tasa
 * @param saldoAFinanciar - Saldo a financiar
 * @param tasaInteresAnual - Tasa de interés anual (decimal, ej: 0.12 para 12%)
 * @param cantidadCuotas - Cantidad de cuotas
 * @returns Total de intereses
 */
export const calcularIntereses = (
  saldoAFinanciar: number,
  tasaInteresAnual: number,
  cantidadCuotas: number
): number => {
  const tasaMensual = tasaInteresAnual / 12;
  const factor = Math.pow(1 + tasaMensual, cantidadCuotas);
  const cuotaConInteres = saldoAFinanciar * (tasaMensual * factor) / (factor - 1);
  const totalAPagar = cuotaConInteres * cantidadCuotas;
  
  return Math.round(totalAPagar - saldoAFinanciar);
};
