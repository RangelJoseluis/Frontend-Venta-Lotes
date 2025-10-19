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
export type EstadoDocumentacion = 'pendiente' | 'en_proceso' | 'completa' | 'observaciones';
export type OrientacionLote = 'norte' | 'sur' | 'este' | 'oeste' | 'noreste' | 'noroeste' | 'sureste' | 'suroeste';
export type VistaLote = 'ciudad' | 'montaña' | 'mar' | 'parque' | 'calle' | 'interior';

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

/**
 * DTO para crear un nuevo lote
 * Basado en el endpoint POST /lotes del backend
 */
export interface CrearLoteDto {
  codigo: string;
  anchoM: number;
  largoM: number;
  superficieM2: number;
  modeloCasaUid?: string; // UID del modelo de casa (string UUID)
  precioLista: number;
  direccion: string;
  manzana: string;
  numeroLote: string;
  topografia: TipoTopografia;
  orientacion?: OrientacionLote;
  vista?: VistaLote;
  estadoDocumentacion: EstadoDocumentacion;
  estado: EstadoLote;
  amueblado: boolean;
  imagenesUrls?: string;
  observaciones?: string;
  ubicacionX?: number;
  ubicacionY?: number;
  geojson?: string;
  fechaEntregaEstimada?: string;
  // UIDs de servicios a asociar al lote (strings UUID)
  serviciosIds?: string[];
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

/**
 * DTO para crear una nueva venta
 * Basado en el endpoint POST /ventas del backend
 */
export interface CrearVentaDto {
  loteUid: string;
  clienteUid: string;
  precioVenta: number;
  modalidadPago: 'contado' | 'cuotas';
  cantidadCuotas?: number;
  montoInicial: number;
  observaciones?: string;
}

export interface Cliente {
  uid: string;
  usuarioUid: string;
  nombres: string;
  apellidos: string;
  documento: string;
  telefono: string;
  direccion?: string;
  estado: string;
  creadoEn?: string;
  actualizadoEn?: string;
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

export type MetodoPago = 'efectivo' | 'transferencia' | 'cheque' | 'tarjeta';

export interface Pago {
  uid: string;
  cuota: {
    uid: string;
    numeroCuota: number;
    venta?: {
      uid: string;
      codigo: string;
      cliente: string;
    };
  };
  monto: number;
  montoFormateado: string;
  fechaPago: string;
  fechaPagoFormateada: string;
  metodoPago: MetodoPago;
  metodoPagoFormateado: string;
  referencia?: string;
  observaciones?: string;
  descripcion: string;
  requiereReferencia: boolean;
  creadoEn: string;
  actualizadoEn: string;
}

/**
 * DTO para crear un nuevo pago
 * Basado en el endpoint POST /pagos del backend
 */
export interface CrearPagoDto {
  cuotaUid: string;
  monto: number;
  fechaPago?: string; // Opcional, por defecto es la fecha actual
  metodoPago: MetodoPago;
  referencia?: string;
  observaciones?: string;
}

/**
 * Respuesta al crear un pago
 */
export interface CrearPagoResponse {
  pago: Pago;
  cuotaActualizada: Cuota;
  excedente: number;
  mensaje: string;
}

/**
 * Venta con información resumida para el selector de pagos
 */
export interface VentaResumen {
  uid: string;
  lote: {
    codigo: string;
    superficieM2: string;
    estado: string;
    modeloCasa?: {
      nombre: string;
      descripcion?: string;
    };
  };
  cliente: {
    documento: string;
    nombres: string;
    apellidos: string;
    telefono: string;
  };
  fechaVenta: string;
  precioVenta: number;
  modalidadPago: 'contado' | 'cuotas';
  cantidadCuotas?: number;
  montoInicial: number;
  montoPendiente: number;
  estado: string;
  valorCuota?: number;
  porcentajeEnganche?: number;
}

/**
 * Respuesta paginada de ventas
 */
export interface VentasResponse {
  ventas: VentaResumen[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
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
