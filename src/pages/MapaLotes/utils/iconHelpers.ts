/**
 * UTILIDADES: ICON HELPERS
 * 
 * Funciones para crear iconos personalizados de Leaflet
 * según el estado del lote.
 */

import { Icon } from 'leaflet';
import { COLORES_MAPA } from '../../../types/mapa';

/**
 * Crear icono personalizado según el estado del lote
 * @param estado - Estado del lote ('disponible', 'en_cuotas', 'vendido')
 * @param esDelCliente - Si es el lote del cliente autenticado (opcional)
 * @returns Icono personalizado de Leaflet
 */
export const crearIconoLote = (estado: string, esDelCliente: boolean = false): Icon => {
  // Si es el lote del cliente, usar icono dorado especial
  if (esDelCliente) {
    return new Icon({
      iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M18 0C9.716 0 3 6.716 3 15c0 8.284 15 33 15 33s15-24.716 15-33C33 6.716 26.284 0 18 0z" 
                fill="url(#goldGradient)" stroke="#d97706" stroke-width="2"/>
          <circle cx="18" cy="15" r="7" fill="white"/>
          <text x="18" y="19" font-size="12" text-anchor="middle" fill="#f59e0b">⭐</text>
        </svg>
      `)}`,
      iconSize: [36, 48],
      iconAnchor: [18, 48],
      popupAnchor: [0, -48]
    });
  }

  // Icono normal según estado
  const color = COLORES_MAPA[estado as keyof typeof COLORES_MAPA] || '#6b7280';

  return new Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42">
        <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 27 15 27s15-18.716 15-27C30 6.716 23.284 0 15 0z" 
              fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="15" cy="15" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });
};
