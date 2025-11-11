/**
 * HOOK: useCuotas
 * 
 * Hook personalizado para cargar cuotas de una venta específica
 */

import { useState, useEffect } from 'react';
import { cuotasService } from '../../../services/cuotas.service';
import type { Cuota } from '../../../types';

export function useCuotas(ventaUid: string | null) {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarCuotas = async () => {
      if (!ventaUid) {
        setCuotas([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const cuotasData = await cuotasService.obtenerPorVenta(ventaUid);
        
        // Filtrar solo cuotas pendientes (no pagadas completamente)
        const cuotasPendientes = cuotasData.filter(c => !c.estaPagada);
        
        setCuotas(cuotasPendientes);
        console.log('✅ Cuotas pendientes cargadas:', cuotasPendientes.length);
      } catch (err) {
        console.error('❌ Error al cargar cuotas:', err);
        setError('Error al cargar las cuotas de la venta.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarCuotas();
  }, [ventaUid]);

  return { cuotas, isLoading, error };
}
