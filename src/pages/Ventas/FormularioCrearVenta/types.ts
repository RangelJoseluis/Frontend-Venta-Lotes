// Tipos específicos para FormularioCrearVenta
// Centraliza todas las interfaces y tipos usados en el módulo

export interface Lote {
  uid: string;
  codigo: string;
  precioLista: number | string; // Puede venir como string del backend
  estado: string;
  direccion?: string;
  manzana?: string;
  numeroLote?: string;
}

export interface VentaFormData {
  loteUid: string;
  clienteUid: string;
  precioVenta: string;
  modalidadPago: 'contado' | 'cuotas';
  cantidadCuotas: string;
  montoInicial: string;
  observaciones: string;
}

export interface LoteOption {
  value: string;
  label: string;
}

export interface ClienteOption {
  value: string;
  label: string;
}

export interface ResumenVenta {
  precioTotal: number;
  montoInicial: number;
  saldoAFinanciar: number;
  valorCuota?: number;
  cantidadCuotas?: number;
}

export interface FormularioState {
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}
