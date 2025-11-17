import { useState } from 'react';
import type { ConfigMora, MensajeConfig } from '../../shared/types';

export const useConfiguracionMora = () => {
  const [config, setConfig] = useState<ConfigMora>({
    moraHabilitada: true,
    tasaMoraDiaria: 0.05,
    tasaMoraMensual: 1.5,
    diasGracia: 3,
    calculoMora: 'diario',
    moraMaximaPorCuotaPorcentaje: 200,
    tasaMoraMaximaLegal: 3.0,
  });

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<MensajeConfig | null>(null);

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      setMensaje({ tipo: 'success', texto: '✅ Configuración de mora guardada exitosamente' });
      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: '❌ Error al guardar la configuración de mora' });
    } finally {
      setGuardando(false);
    }
  };

  return {
    config,
    setConfig,
    guardando,
    mensaje,
    handleGuardar
  };
};
