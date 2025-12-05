// Barrel export para el módulo FormularioCrearVenta
// Punto de entrada principal para importar el componente

export { default } from './FormularioCrearVenta';

// Exportar tipos si se necesitan en otros módulos
export type { 
  VentaFormData, 
  Lote, 
  ResumenVenta, 
  FormularioState 
} from './types';

// Exportar utilidades si se necesitan en otros módulos
export { 
  formatCurrency, 
  parsePrecio, 
  formatLoteLabel, 
  formatClienteLabel 
} from './utils/formatters';

export { 
  validateFormularioVenta, 
  validateMontoInicial, 
  validateCantidadCuotas 
} from './utils/validaciones';

export { 
  calcularResumenVenta, 
  calcularValorCuota, 
  calcularPorcentajeInicial 
} from './utils/calculosFinancieros';
