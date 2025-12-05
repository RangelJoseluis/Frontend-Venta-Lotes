import type { ConfiguracionZona } from '../../shared/types';

const STORAGE_KEY = 'zona_predeterminada';

const ZONA_DEFAULT: ConfiguracionZona = {
  nombre: 'Maicao, La Guajira',
  centro: {
    latitud: 11.375534086690372,
    longitud: -72.22197236150969
  },
  zoom: 17,
  limites: {
    norte: 11.380,
    sur: 11.370,
    este: -72.215,
    oeste: -72.230
  }
};

export const obtenerZonaPredeterminada = (): ConfiguracionZona => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error al cargar zona predeterminada:', error);
  }
  return ZONA_DEFAULT;
};

export const guardarZonaPredeterminada = (zona: ConfiguracionZona): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(zona));
  } catch (error) {
    console.error('Error al guardar zona predeterminada:', error);
    throw error;
  }
};
