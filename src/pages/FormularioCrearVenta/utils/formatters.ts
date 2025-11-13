// Utilidades de formateo para FormularioCrearVenta
// Funciones para formatear moneda, números y texto

/**
 * Formatea un valor numérico como moneda colombiana
 * @param value - Valor a formatear (string o número)
 * @returns String formateado con separadores de miles
 */
export const formatCurrency = (value: string | number): string => {
  if (!value) return '0';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) return '0';
  
  return Math.round(numericValue).toLocaleString('es-CO');
};

/**
 * Parsea un precio que puede venir como string del backend
 * @param precio - Precio a parsear
 * @returns Número parseado y redondeado
 */
export const parsePrecio = (precio: number | string): number => {
  const numericValue = typeof precio === 'string' ? parseFloat(precio) : precio;
  return Math.round(numericValue);
};

/**
 * Formatea la etiqueta de un lote para react-select
 * @param lote - Objeto lote
 * @returns String formateado para mostrar en el selector
 */
export const formatLoteLabel = (lote: { codigo: string; manzana?: string; numeroLote?: string; precioLista: number | string }): string => {
  const precio = parsePrecio(lote.precioLista);
  const manzanaText = lote.manzana ? `Manzana ${lote.manzana}` : '';
  const numeroText = lote.numeroLote ? `#${lote.numeroLote}` : '';
  
  return `${lote.codigo} - ${manzanaText} ${numeroText} - $${formatCurrency(precio)}`.trim();
};

/**
 * Formatea la etiqueta de un cliente para react-select
 * @param cliente - Objeto cliente
 * @returns String formateado para mostrar en el selector
 */
export const formatClienteLabel = (cliente: { nombres: string; apellidos: string; documento: string; telefono: string }): string => {
  return `${cliente.nombres} ${cliente.apellidos} - Doc: ${cliente.documento} - Tel: ${cliente.telefono}`;
};

/**
 * Limpia y formatea un input de moneda
 * @param value - Valor del input
 * @returns Valor limpio sin caracteres especiales
 */
export const cleanCurrencyInput = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

/**
 * Formatea un input de moneda para mostrar con separadores
 * @param value - Valor a formatear
 * @returns String formateado para mostrar en el input
 */
export const formatCurrencyInput = (value: string): string => {
  const cleaned = cleanCurrencyInput(value);
  if (!cleaned) return '';
  
  const numeric = parseInt(cleaned);
  return numeric.toLocaleString('es-CO');
};
