/**
 * CONFIGURACIÓN DE ZONA PREDETERMINADA
 * 
 * Define el área geográfica donde se encuentran los lotes.
 * Esta configuración se aplica a todos los mapas del sistema.
 * 
 * INSTRUCCIONES PARA CONFIGURAR TU ZONA:
 * 1. Ve a Google Maps
 * 2. Busca tu urbanización/proyecto
 * 3. Centra el mapa en tu zona
 * 4. Click derecho → copiar coordenadas
 * 5. Pega las coordenadas aquí (latitud, longitud)
 * 6. Ajusta el zoom (15-18 recomendado)
 */

export interface ConfiguracionZona {
  // Centro de la zona (donde se centrará el mapa)
  centro: {
    latitud: number;   // Coordenada Y (Norte-Sur)
    longitud: number;  // Coordenada X (Este-Oeste)
  };
  
  // Nivel de zoom inicial
  zoom: number;  // 15 = ciudad, 17 = barrio, 19 = calle
  
  // Nombre descriptivo de la zona
  nombre: string;
  
  // Límites opcionales de la zona (para restringir el mapa)
  limites?: {
    norte: number;
    sur: number;
    este: number;
    oeste: number;
  };
}

/**
 * CONFIGURACIÓN ACTIVA
 * 
 * ⚠️ IMPORTANTE: Cambia estas coordenadas a tu zona real
 * 
 * Ejemplo actual: Valledupar, Colombia
 * Coordenadas: 11.375731862352247, -72.22181748754002
 */
export const ZONA_PREDETERMINADA: ConfiguracionZona = {
  centro: {
    latitud: 11.375731862352247,   // Tu coordenada
    longitud: -72.22181748754002,  // Tu coordenada
  },
  zoom: 18,  // Zoom cercano para ver lotes (máximo 22)
  nombre: "Urbanización Principal - Valledupar",
  
  // Límites opcionales (descomenta y ajusta si quieres restringir el área)
  limites: {
    norte: 11.380,   // Límite norte
    sur: 11.370,     // Límite sur
    este: -72.215,   // Límite este
    oeste: -72.230,  // Límite oeste
  }
};

/**
 * Obtener configuración de zona activa
 */
export const obtenerZonaPredeterminada = (): ConfiguracionZona => {
  // Aquí podrías leer de localStorage si el admin cambió la configuración
  const zonaGuardada = localStorage.getItem('zona_configurada');
  
  if (zonaGuardada) {
    try {
      return JSON.parse(zonaGuardada);
    } catch (error) {
      console.warn('Error al leer zona guardada, usando predeterminada');
    }
  }
  
  return ZONA_PREDETERMINADA;
};

/**
 * Guardar nueva configuración de zona
 */
export const guardarZonaPredeterminada = (zona: ConfiguracionZona): void => {
  localStorage.setItem('zona_configurada', JSON.stringify(zona));
  console.log('✅ Zona predeterminada guardada:', zona.nombre);
};

/**
 * Verificar si una coordenada está dentro de los límites de la zona
 */
export const estaDentroDeZona = (lat: number, lng: number): boolean => {
  const zona = obtenerZonaPredeterminada();
  
  if (!zona.limites) {
    return true; // Sin límites, todo es válido
  }
  
  return (
    lat <= zona.limites.norte &&
    lat >= zona.limites.sur &&
    lng <= zona.limites.este &&
    lng >= zona.limites.oeste
  );
};

/**
 * Obtener centro de la zona como array [lat, lng]
 */
export const obtenerCentroZona = (): [number, number] => {
  const zona = obtenerZonaPredeterminada();
  return [zona.centro.latitud, zona.centro.longitud];
};

/**
 * Obtener zoom de la zona
 */
export const obtenerZoomZona = (): number => {
  const zona = obtenerZonaPredeterminada();
  return zona.zoom;
};

export default {
  ZONA_PREDETERMINADA,
  obtenerZonaPredeterminada,
  guardarZonaPredeterminada,
  estaDentroDeZona,
  obtenerCentroZona,
  obtenerZoomZona,
};
