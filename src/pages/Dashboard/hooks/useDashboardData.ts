// Hook para cargar datos del dashboard
import { useState, useEffect, useCallback } from 'react';
import { lotesService } from '../../../services/lotes.service';
import estadisticasVentasService from '../../../services/estadisticas-ventas.service';
import estadisticasCuotasService from '../../../services/estadisticas-cuotas.service';
import estadisticasPagosService from '../../../services/estadisticas-pagos.service';
import { getErrorMessage } from '../../../services/http.service';
import type { DashboardData, UseDashboardDataReturn } from '../types';

export const useDashboardData = (): UseDashboardDataReturn => {
    const [data, setData] = useState<DashboardData>({
        lotes: null,
        ventas: null,
        cuotas: null,
        pagos: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEstadisticas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔄 Cargando estadísticas del backend...');
            console.log('🔑 Token:', localStorage.getItem('accessToken') ? 'Presente' : 'NO PRESENTE');

            // Cargar estadísticas en paralelo
            const [dataLotes, dataVentas, dataCuotas, dataPagos] = await Promise.all([
                lotesService.getEstadisticas(),
                estadisticasVentasService.obtenerEstadisticas(),
                estadisticasCuotasService.obtenerEstadisticas(),
                estadisticasPagosService.obtenerEstadisticasMesActual()
            ]);

            console.log('✅ Todas las estadísticas cargadas:', {
                lotes: dataLotes,
                ventas: dataVentas,
                cuotas: dataCuotas,
                pagos: dataPagos
            });

            setData({
                lotes: dataLotes,
                ventas: dataVentas,
                cuotas: dataCuotas,
                pagos: dataPagos
            });
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            console.error('❌ Error al cargar estadísticas:', err);
            console.error('📋 Detalles del error:', {
                message: errorMsg,
                error: err
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEstadisticas();
    }, [fetchEstadisticas]);

    return {
        data,
        loading,
        error,
        refetch: fetchEstadisticas
    };
};

export default useDashboardData;
