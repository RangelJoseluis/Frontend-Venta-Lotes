/**
 * Utilidades para crear iconos de marcadores en el mapa
 */

import L from 'leaflet';
import type { LoteParaMapa } from '../../../types/mapa';

// Colores según estado del lote
export const COLORES_MAPA = {
    disponible: '#10b981',    // Verde esmeralda
    en_cuotas: '#f59e0b',     // Ámbar
    vendido: '#ef4444',       // Rojo
    destacado: '#f59e0b'      // Ámbar para lotes del cliente
};

/**
 * Crear icono personalizado para un lote
 */
export const crearIconoLote = (lote: LoteParaMapa, esDestacado: boolean = false): L.DivIcon => {
    const color = esDestacado ? COLORES_MAPA.destacado : COLORES_MAPA[lote.estado];

    const iconHtml = `
    <div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="
        transform: rotate(45deg);
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">
        ${esDestacado ? '⭐' : ''}
      </span>
    </div>
  `;

    return L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

/**
 * Formatear precio
 */
export const formatearPrecio = (precio: number): string => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
};

/**
 * Obtener estilo para polígono (si se usan polígonos en lugar de marcadores)
 */
export const getEstiloPoligono = (lote: LoteParaMapa, esDestacado: boolean = false) => {
    const color = esDestacado ? COLORES_MAPA.destacado : COLORES_MAPA[lote.estado];

    return {
        color: color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 2
    };
};
