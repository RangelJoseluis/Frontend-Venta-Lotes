// Hook para gestión de modelos de casa
import { useState, useEffect } from 'react';
import modelosCasaService from '../../../services/modelos-casa.service';
import { getErrorMessage } from '../../../services/http.service';
import type { ModeloCasa, CrearModeloCasaDto, ActualizarModeloCasaDto } from '../types';
import type { UseModelosCasaReturn } from '../types';

export const useModelosCasa = (): UseModelosCasaReturn => {
  const [modelos, setModelos] = useState<ModeloCasa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar modelos al inicializar
  useEffect(() => {
    cargarModelos();
  }, []);

  /**
   * Carga todos los modelos de casa desde el backend
   */
  const cargarModelos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await modelosCasaService.obtenerTodos();
      setModelos(data);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.error('❌ Error al cargar modelos:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea un nuevo modelo de casa
   * @param datos - Datos del modelo a crear
   */
  const crearModelo = async (datos: CrearModeloCasaDto): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await modelosCasaService.crear(datos);

      
      // Recargar la lista de modelos
      await cargarModelos();
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.error('❌ Error al crear modelo:', errorMsg);
      setError(errorMsg);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualiza un modelo existente
   * @param uid - UID del modelo a actualizar
   * @param datos - Datos actualizados
   */
  const actualizarModelo = async (uid: string, datos: ActualizarModeloCasaDto): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await modelosCasaService.actualizar(uid, datos);

      
      // Recargar la lista de modelos
      await cargarModelos();
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.error('❌ Error al actualizar modelo:', errorMsg);
      setError(errorMsg);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  /**
   * Elimina un modelo de casa
   * @param uid - UID del modelo a eliminar
   */
  const eliminarModelo = async (uid: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await modelosCasaService.eliminar(uid);
      console.log('✅ Modelo eliminado exitosamente');
      
      // Recargar la lista de modelos
      await cargarModelos();
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.error('❌ Error al eliminar modelo:', errorMsg);
      setError(errorMsg);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  return {
    modelos,
    loading,
    error,
    cargarModelos,
    crearModelo,
    actualizarModelo,
    eliminarModelo,
  };
};
