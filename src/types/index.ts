/**
 * TIPOS Y INTERFACES DEL PROYECTO
 * 
 * Define todos los tipos TypeScript para el frontend
 */

// ============================================================================
// AUTENTICACIÓN
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  usuario: Usuario;
}

export interface Usuario {
  uid: string;
  email: string;
  nombre: string;
  cedula?: string;
  telefono?: string;
  roles: string[];
  creadoEn?: string;
}

// ============================================================================
// LOTES
// ============================================================================

export type EstadoLote = 'disponible' | 'en_cuotas' | 'vendido';
export type TipoTopografia = 'plano' | 'inclinado' | 'irregular';
export type EstadoDocumentacion = 'completo' | 'pendiente' | 'en_proceso';

export interface Lote {
  uid: string;
  codigo: string;
  superficie: number;
  precio: number;
  ubicacion: string;
  coordenadas: string;
  topografia: TipoTopografia;
  estado: EstadoLote;
  estadoDocumentacion: EstadoDocumentacion;
  imagenesUrls: string[];
  amueblado: boolean;
  modeloCasa?: ModeloCasa;
  creadoEn: string;
  actualizadoEn: string;
}

export interface ModeloCasa {
  uid: string;
  nombre: string;
  descripcion: string;
  habitaciones: number;
  banos: number;
  areaTotal: number;
  precio: number;
  imagenesUrls: string[];
}

// ============================================================================
// VENTAS
// ============================================================================

export type ModalidadPago = 'contado' | 'cuotas';

export interface Venta {
  uid: string;
  lote: Lote;
  cliente: Cliente;
  precioVenta: number;
  modalidadPago: ModalidadPago;
  cantidadCuotas?: number;
  montoInicial: number;
  observaciones?: string;
  fechaVenta: string;
  estado: string;
}

export interface Cliente {
  uid: string;
  nombre: string;
  email: string;
  cedula: string;
  telefono: string;
}

// ============================================================================
// CUOTAS
// ============================================================================

export type EstadoCuota = 'pendiente' | 'parcial' | 'pagada' | 'vencida';

export interface Cuota {
  uid: string;
  venta: {
    uid: string;
    codigo: string;
    cliente: string;
  };
  numeroCuota: number;
  valor: number;
  montoPagado: number;
  montoPendiente: number;
  porcentajePagado: number;
  fechaVencimiento: string;
  estado: EstadoCuota;
  diasVencimiento: number;
  estaPagada: boolean;
  estaVencida: boolean;
  tienePagoParcial: boolean;
  proximaAVencer: boolean;
  resumen: string;
  colorUI: {
    color: string;
    background: string;
    texto: string;
  };
}

// ============================================================================
// PAGOS
// ============================================================================

export type MetodoPago = 'efectivo' | 'transferencia' | 'cheque';

export interface Pago {
  uid: string;
  cuota: {
    uid: string;
    numeroCuota: number;
  };
  monto: number;
  montoFormateado: string;
  fechaPago: string;
  metodoPago: MetodoPago;
  referencia?: string;
  observaciones?: string;
  descripcion: string;
}

// ============================================================================
// ESTADÍSTICAS
// ============================================================================

export interface EstadisticasLotes {
  totalLotes: number;
  disponibles: number;
  enCuotas: number;
  vendidos: number;
  superficieTotal: number;
  valorTotal: number;
}

export interface EstadisticasPagos {
  totalPagos: number;
  montoTotalPagos: number;
  promedioMontoPago: number;
  pagosPorMetodo: {
    efectivo: number;
    transferencia: number;
    cheque: number;
  };
  montosPorMetodo: {
    efectivo: number;
    transferencia: number;
    cheque: number;
  };
}

// ============================================================================
// UI / COMPONENTES
// ============================================================================

export interface DashboardStats {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: string;
  roles?: string[];
}
