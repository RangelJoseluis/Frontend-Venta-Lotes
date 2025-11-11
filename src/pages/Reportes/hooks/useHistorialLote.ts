// Hook para manejar el historial de un lote específico
import { useState } from 'react';
import lotesHistorialService from '../../../services/lotes-historial.service';
import { getErrorMessage } from '../../../services/http.service';
import type { CambioEstadoLote } from '../types';

export const useHistorialLote = () => {
  const [loteSeleccionado, setLoteSeleccionado] = useState<string>('');
  const [historialLote, setHistorialLote] = useState<CambioEstadoLote[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);
  const [errorHistorial, setErrorHistorial] = useState<string | null>(null);

  /**
   * Cargar historial de cambios de un lote específico
   */
  const cargarHistorialLote = async (loteUid: string) => {
    if (!loteUid) {
      setHistorialLote([]);
      return;
    }

    try {
      setLoadingHistorial(true);
      setErrorHistorial(null);

      console.log('🔄 Cargando historial del lote:', loteUid);
      const data = await lotesHistorialService.obtenerHistorialLote(loteUid);
      
      console.log('✅ Historial cargado:', data);
      setHistorialLote(data);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.error('❌ Error al cargar historial:', errorMsg);
      setErrorHistorial(errorMsg);
      setHistorialLote([]);
    } finally {
      setLoadingHistorial(false);
    }
  };

  /**
   * Manejar cambio de lote seleccionado
   */
  const handleLoteChange = (loteUid: string) => {
    setLoteSeleccionado(loteUid);
    if (loteUid) {
      cargarHistorialLote(loteUid);
    } else {
      setHistorialLote([]);
    }
  };

  return {
    loteSeleccionado,
    historialLote,
    loadingHistorial,
    errorHistorial,
    handleLoteChange,
    cargarHistorialLote,
  };
};
