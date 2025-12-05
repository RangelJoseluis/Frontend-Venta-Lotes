import { useState, useEffect } from 'react';
import { pagosService } from '../../../services/pagos.service';
import { useAuthStore } from '../../../store/authStore';
import type { Pago, EstadisticasPagosCliente } from '../../../types';

/**
 * Hook personalizado para obtener los pagos del cliente autenticado
 * Diseñado para el Portal Cliente
 */
export const usePagosCliente = () => {
    const user = useAuthStore((state) => state.user);
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [estadisticas, setEstadisticas] = useState<EstadisticasPagosCliente>({
        totalPagos: 0,
        montoTotal: 0,
        pagosMesActual: 0,
        montoMesActual: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPagos = async () => {
        if (!user?.uid) {
            setError('Usuario no autenticado');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await pagosService.obtenerPorUsuario(user.uid);

            setPagos(response.pagos);
            setEstadisticas(response.estadisticas);
        } catch (err: any) {
            console.error('Error al obtener pagos:', err);
            setError(err.response?.data?.message || 'Error al cargar los pagos');
            setPagos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPagos();
    }, [user?.uid]);

    return {
        pagos,
        estadisticas,
        loading,
        error,
        refetch: fetchPagos
    };
};
