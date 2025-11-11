/**
 * HOOK: useVentas
 * 
 * Hook personalizado para cargar y gestionar ventas activas con cuotas
 */

import { useState, useEffect } from 'react';
import { obtenerVentasPaginadas } from '../../../services/ventas.service';
import type { VentaResumen } from '../../../types';

export function useVentas() {
  const [ventas, setVentas] = useState<VentaResumen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await obtenerVentasPaginadas(1, 100);
        
        // Filtrar solo ventas activas y a cuotas
        const ventasActivas = response.ventas.filter(
          v => v.estado === 'activa' && v.modalidadPago === 'cuotas'
        );
        
        setVentas(ventasActivas);
        console.log('✅ Ventas activas cargadas:', ventasActivas.length);
      } catch (err) {
        console.error('❌ Error al cargar ventas:', err);
        setError('Error al cargar las ventas. Por favor, recargue la página.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarVentas();
  }, []);

  return { ventas, isLoading, error };
}
