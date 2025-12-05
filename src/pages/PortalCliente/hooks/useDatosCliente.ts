import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../../store/authStore';
import { obtenerVentasPorCliente } from '../../../services/ventas.service';
import type { VentaResumen } from '../../../types';

interface UseDatosClienteReturn {
    ventas: VentaResumen[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook personalizado para obtener los datos del cliente actual
 * Obtiene las ventas/lotes del cliente autenticado
 */
export const useDatosCliente = (): UseDatosClienteReturn => {
    const { user } = useAuthStore();
    const [ventas, setVentas] = useState<VentaResumen[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cargarDatos = useCallback(async () => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Obtener las ventas del cliente actual
            const ventasData = await obtenerVentasPorCliente(user.uid);
            setVentas(ventasData);
        } catch (err) {
            console.error('Error al cargar datos del cliente:', err);
            setError('No se pudieron cargar tus datos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }, [user?.uid]);

    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    return {
        ventas,
        loading,
        error,
        refetch: cargarDatos
    };
};
