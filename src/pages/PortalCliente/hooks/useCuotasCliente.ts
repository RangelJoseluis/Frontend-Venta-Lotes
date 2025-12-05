import { useState, useEffect } from 'react';
import { cuotasService } from '../../../services/cuotas.service';
import { useAuthStore } from '../../../store/authStore';
import type { Cuota, ResumenCuotas } from '../../../types';

/**
 * Hook personalizado para obtener las cuotas del cliente autenticado
 * Diseñado para el Portal Cliente - Estado de Cuenta
 */
export const useCuotasCliente = () => {
    const user = useAuthStore((state) => state.user);
    const [cuotas, setCuotas] = useState<Cuota[]>([]);
    const [resumen, setResumen] = useState<ResumenCuotas>({
        totalCuotas: 0,
        cuotasPagadas: 0,
        cuotasPendientes: 0,
        cuotasVencidas: 0,
        montoTotalCuotas: 0,
        montoPagado: 0,
        montoPendiente: 0,
        proximoVencimiento: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCuotas = async () => {
        if (!user?.uid) {
            setError('Usuario no autenticado');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await cuotasService.obtenerPorUsuario(user.uid);

            setCuotas(response.cuotas);
            setResumen(response.resumen);
        } catch (err: any) {
            console.error('Error al obtener cuotas:', err);
            setError(err.response?.data?.message || 'Error al cargar las cuotas');
            setCuotas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCuotas();
    }, [user?.uid]);

    return {
        cuotas,
        resumen,
        loading,
        error,
        refetch: fetchCuotas
    };
};
