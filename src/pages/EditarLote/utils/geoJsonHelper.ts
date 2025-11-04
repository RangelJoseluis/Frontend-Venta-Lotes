/**
 * UTILIDADES: HELPER DE GEOJSON
 * 
 * Funciones para manejo de GeoJSON y polígonos de lotes
 */

/**
 * Parsear GeoJSON desde string y extraer coordenadas del polígono
 */
export const parsearGeoJson = (geojsonString: string): [number, number][] => {
  try {
    const geojson = JSON.parse(geojsonString);
    
    if (geojson.type === 'Polygon' && geojson.coordinates && geojson.coordinates[0]) {
      return geojson.coordinates[0].map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
    }
    
    return [];
  } catch (error) {
    console.error('❌ Error al parsear GeoJSON:', error);
    return [];
  }
};

/**
 * Crear GeoJSON Polygon desde array de puntos [lat, lng]
 */
export const crearGeoJsonDesdePoligono = (puntos: [number, number][]): string => {
  if (puntos.length < 3) {
    return '';
  }

  // Convertir [lat, lng] a [lng, lat] para GeoJSON
  const coordinates = puntos.map(punto => [punto[1], punto[0]]);
  
  // GeoJSON requiere que el primer y último punto sean iguales (cerrar el polígono)
  if (JSON.stringify(coordinates[0]) !== JSON.stringify(coordinates[coordinates.length - 1])) {
    coordinates.push(coordinates[0]);
  }

  const geojson = {
    type: 'Polygon',
    coordinates: [coordinates]
  };

  return JSON.stringify(geojson);
};

/**
 * Calcular el centro (centroide) de un polígono
 */
export const calcularCentroPoligono = (puntos: [number, number][]): [number, number] | null => {
  if (puntos.length === 0) {
    return null;
  }

  const sumaLat = puntos.reduce((sum, punto) => sum + punto[0], 0);
  const sumaLng = puntos.reduce((sum, punto) => sum + punto[1], 0);

  return [
    sumaLat / puntos.length,
    sumaLng / puntos.length
  ];
};
