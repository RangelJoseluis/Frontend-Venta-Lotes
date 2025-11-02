/**
 * TIPOS E INTERFACES PARA EL MAPA DE LOTES
 * 
 * Define las estructuras de datos necesarias para el mapa interactivo
 */

import type { EstadoLote } from './index';

// ============================================================================
// COORDENADAS Y UBICACIÓN
// ============================================================================

/**
 * Coordenadas GPS para el mapa
 */
export interface Coordenadas {
  latitud: number;
  longitud: number;
}

/**
 * Bounds del mapa (viewport)
 */
export interface MapBounds {
  norte: number;
  sur: number;
  este: number;
  oeste: number;
}

// ============================================================================
// LOTE PARA MAPA
// ============================================================================

/**
 * Lote con información para mostrar en el mapa
 * Basado en el endpoint GET /lotes/visibles del backend
 */
export interface LoteParaMapa {
  uid: string;
  codigo: string;
  superficie: number;
  precio: number;
  ubicacion: string;
  coordenadas?: string; // Formato: "4.6097,-74.0817" (opcional, legacy)
  geojson?: string; // Formato GeoJSON: Point o Polygon (nuevo)
  estado: EstadoLote;
  topografia?: string;
  estadoDocumentacion?: string;
  amueblado: boolean;
  esDelCliente?: boolean; // true si el lote pertenece al cliente autenticado
  modeloCasa?: {
    uid: string;
    nombre: string;
    precioBase: number;
    descripcion?: string;
  };
  imagenesUrls?: string[];
  creadoEn: string;
  actualizadoEn: string;
  // Información del cliente propietario (solo cuando está vendido o en cuotas)
  clienteUid?: string;
  clienteNombre?: string;
  clienteCedula?: string;
  clienteTelefono?: string;
}

// ============================================================================
// FILTROS
// ============================================================================

/**
 * Filtros para el mapa de lotes
 */
export interface FiltrosMapaLotes {
  precioMin?: number;
  precioMax?: number;
  superficieMin?: number;
  superficieMax?: number;
  estado?: EstadoLote | 'todos';
  servicios?: string[];
  modeloCasa?: string;
  busqueda?: string;
}

// ============================================================================
// CONFIGURACIÓN Y ESTILOS
// ============================================================================

/**
 * Configuración de colores para el mapa según estado
 */
export interface ColoresEstadoLote {
  disponible: string;
  en_cuotas: string;
  vendido: string;
}

/**
 * Constantes de colores para el mapa
 */
export const COLORES_MAPA: ColoresEstadoLote = {
  disponible: '#10b981',  // Verde
  en_cuotas: '#f59e0b',   // Amarillo
  vendido: '#ef4444'      // Rojo
};

/**
 * Rol del usuario para permisos del mapa
 */
export type RolMapa = 'invitado' | 'cliente' | 'admin';

/**
 * Tipo de capa del mapa
 */
export type TipoCapaMapa = 'mapa' | 'satelite' | 'hibrido';

/**
 * Configuración de tiles para diferentes capas
 */
export interface ConfiguracionTiles {
  url: string;
  atribucion: string;
  maxZoom: number;
}

/**
 * Configuración del mapa
 */
export interface ConfiguracionMapa {
  centroInicial: Coordenadas;
  zoomInicial: number;
  zoomMin: number;
  zoomMax: number;
  urlTiles: string;
  atribucion: string;
}

/**
 * Configuración por defecto del mapa (Maicao, La Guajira, Colombia)
 * Ubicación: Cerca de la piscina Mi Finquita
 */
export const CONFIG_MAPA_DEFAULT: ConfiguracionMapa = {
  centroInicial: {
    latitud: 11.375534086690372,
    longitud: -72.22197236150969
  },
  zoomInicial: 17,
  zoomMin: 8,
  zoomMax: 19,
  urlTiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  atribucion: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

/**
 * Configuraciones de tiles para diferentes capas del mapa
 */
export const TILES_CONFIG: Record<TipoCapaMapa, ConfiguracionTiles> = {
  mapa: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    atribucion: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  },
  satelite: {
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    atribucion: '&copy; Google',
    maxZoom: 20
  },
  hibrido: {
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    atribucion: '&copy; Google',
    maxZoom: 20
  }
};

// ============================================================================
// EVENTOS Y ACCIONES
// ============================================================================

/**
 * Evento al hacer click en un lote
 */
export interface EventoClickLote {
  lote: LoteParaMapa;
  coordenadas: Coordenadas;
}

/**
 * Estado del mapa
 */
export interface EstadoMapa {
  centro: Coordenadas;
  zoom: number;
  lotesVisibles: LoteParaMapa[];
  loteSeleccionado: LoteParaMapa | null;
  filtrosActivos: FiltrosMapaLotes;
  cargando: boolean;
  error: string | null;
}
