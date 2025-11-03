/**
 * UTILIDADES: GEOJSON PARSER
 * 
 * Funciones para parsear y extraer coordenadas de GeoJSON.
 * Soporta formatos Point y Polygon.
 */

import type { GeoData } from '../types';

/**
 * Parsear GeoJSON y extraer coordenadas
 * Soporta Point y Polygon
 * @param geojsonStr - String con formato GeoJSON
 * @returns Objeto con tipo, centro y coordenadas, o null si hay error
 */
export const parsearGeoJSON = (geojsonStr: string): GeoData | null => {
  try {
    const geojson = JSON.parse(geojsonStr);
    
    if (geojson.type === 'Point') {
      // Formato Point: {"type":"Point","coordinates":[-72.222,11.376]}
      const [longitud, latitud] = geojson.coordinates;
      return {
        tipo: 'point' as const,
        centro: { latitud, longitud },
        coordenadas: [[latitud, longitud]]
      };
    } else if (geojson.type === 'Polygon') {
      // Formato Polygon: {"type":"Polygon","coordinates":[[[lng,lat],[lng,lat],...]]}
      const coords = geojson.coordinates[0].map(([lng, lat]: [number, number]) => [lat, lng]);
      
      // Calcular centro del polígono (promedio de coordenadas)
      const sumLat = coords.reduce((sum: number, [lat]: [number, number]) => sum + lat, 0);
      const sumLng = coords.reduce((sum: number, [, lng]: [number, number]) => sum + lng, 0);
      const centro = {
        latitud: sumLat / coords.length,
        longitud: sumLng / coords.length
      };
      
      return {
        tipo: 'polygon' as const,
        centro,
        coordenadas: coords
      };
    }
    
    console.warn('⚠️ Tipo de GeoJSON no soportado:', geojson.type);
    return null;
  } catch (error) {
    console.error('❌ Error al parsear GeoJSON:', error);
    return null;
  }
};
