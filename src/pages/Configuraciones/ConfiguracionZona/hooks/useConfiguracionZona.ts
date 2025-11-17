import { useState } from 'react';
import type { ConfiguracionZona, MensajeConfig } from '../../shared/types';
import { obtenerZonaPredeterminada, guardarZonaPredeterminada } from '../services/zona.service';

export const useConfiguracionZona = () => {
  const [zona, setZona] = useState<ConfiguracionZona>(obtenerZonaPredeterminada());
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<MensajeConfig | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setZona(prev => ({
      ...prev,
      centro: {
        latitud: lat,
        longitud: lng
      }
    }));
  };

  const handleGuardar = () => {
    setGuardando(true);
    try {
      guardarZonaPredeterminada(zona);
      setMensaje({ tipo: 'success', texto: '✅ Configuración guardada exitosamente' });
      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: '❌ Error al guardar la configuración' });
    } finally {
      setGuardando(false);
    }
  };

  return {
    zona,
    setZona,
    guardando,
    mensaje,
    handleMapClick,
    handleGuardar
  };
};
