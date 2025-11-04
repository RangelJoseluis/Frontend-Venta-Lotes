/**
 * TIPOS Y SCHEMAS PARA EDITAR LOTE
 */

import { z } from 'zod';

// Schema de validación con Zod
export const loteSchema = z.object({
  codigo: z.string().min(1, 'El código es requerido').max(20, 'Máximo 20 caracteres'),
  anchoM: z.number().min(1, 'El ancho debe ser mayor a 0'),
  largoM: z.number().min(1, 'El largo debe ser mayor a 0'),
  superficieM2: z.number().min(1, 'La superficie debe ser mayor a 0'),
  precioLista: z.number().min(1, 'El precio debe ser mayor a 0'),
  direccion: z.string().min(1, 'La dirección es requerida'),
  manzana: z.string().min(1, 'La manzana es requerida'),
  numeroLote: z.string().min(1, 'El número de lote es requerido'),
  topografia: z.enum(['plano', 'inclinado', 'irregular']),
  orientacion: z.enum(['norte', 'sur', 'este', 'oeste', 'noreste', 'noroeste', 'sureste', 'suroeste']).optional(),
  vista: z.enum(['ciudad', 'montaña', 'mar', 'parque', 'calle', 'interior']).optional(),
  estadoDocumentacion: z.enum(['pendiente', 'en_proceso', 'completa', 'observaciones']),
  estado: z.enum(['disponible', 'en_cuotas', 'vendido']),
  amueblado: z.boolean(),
  imagenesUrls: z.string().optional(),
  observaciones: z.string().optional(),
  modeloCasa: z.number().optional(),
  // Campos de coordenadas
  ubicacionX: z.number().optional(),
  ubicacionY: z.number().optional(),
  geojson: z.string().optional(),
});

export type LoteFormData = z.infer<typeof loteSchema>;

// Props para componentes del mapa
export interface MapaEditorProps {
  modoDibujo: boolean;
  puntosPoligono: [number, number][];
  ubicacionX: number | undefined;
  ubicacionY: number | undefined;
  onIniciarDibujo: () => void;
  onFinalizarDibujo: () => void;
  onCancelarDibujo: () => void;
  onLimpiarPoligono: () => void;
  onEliminarUltimoPunto: () => void;
  onAgregarPunto: (latlng: L.LatLng) => void;
}
