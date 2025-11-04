/**
 * TIPOS PARA DETALLE DE LOTE
 */

export interface Lote {
  uid: string;
  codigo: string;
  anchoM: string;
  largoM: string;
  superficieM2: string;
  precioLista: string;
  direccion: string;
  manzana: string;
  numeroLote: string;
  topografia: string;
  orientacion?: string;
  vista?: string;
  estado: 'disponible' | 'en_cuotas' | 'vendido';
  estadoDocumentacion: string;
  amueblado: boolean;
  observaciones?: string;
  imagenesUrls?: string;
  ubicacionX?: string;
  ubicacionY?: string;
  geojson?: string;
  modeloCasa?: {
    uid: string;
    nombre: string;
    precioBase?: number;
  };
  servicios?: Array<{
    uid: string;
    nombre: string;
    descripcion?: string;
  }>;
  creadoEn: string;
  actualizadoEn: string;
}

export interface Cuota {
  uid: string;
  numeroCuota: number;
  valor: number;
  fechaVencimiento: string;
  montoPagado: number;
  montoPendiente: number;
  estado: string;
  diasVencimiento?: number;
  estaVencida: boolean;
}
