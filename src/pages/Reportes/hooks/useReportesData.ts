// Hook para cargar todas las estadísticas de reportes
import { useState, useEffect } from 'react';
import estadisticasVentasService from '../../../services/estadisticas-ventas.service';
import estadisticasCuotasService from '../../../services/estadisticas-cuotas.service';
import estadisticasPagosService from '../../../services/estadisticas-pagos.service';
import { lotesService } from '../../../services/lotes.service';
import { getErrorMessage } from '../../../services/http.service';
import type {
  EstadisticasVentas,
  EstadisticasCuotas,
  EstadisticasPagos,
  EstadisticasLotes,
  Lote,
  CuotaVencida,
  CuotaProximaVencer,
} from '../types';

export const useReportesData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estadísticas
  const [statsVentas, setStatsVentas] = useState<EstadisticasVentas | null>(null);
  const [statsCuotas, setStatsCuotas] = useState<EstadisticasCuotas | null>(null);
  const [statsPagos, setStatsPagos] = useState<EstadisticasPagos | null>(null);
  const [statsLotes, setStatsLotes] = useState<EstadisticasLotes | null>(null);

  // Datos adicionales
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [cuotasVencidas, setCuotasVencidas] = useState<CuotaVencida[]>([]);
  const [cuotasProximasVencer, setCuotasProximasVencer] = useState<CuotaProximaVencer[]>([]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Cargando estadísticas para reportes...');

        const [
          dataVentas,
          dataCuotas,
          dataPagos,
          dataLotes,
          dataLotesLista,
          dataVencidas,
          dataProximas,
        ] = await Promise.all([
          estadisticasVentasService.obtenerEstadisticas(),
          estadisticasCuotasService.obtenerEstadisticas(),
          estadisticasPagosService.obtenerEstadisticasAnioActual(),
          lotesService.getEstadisticas(),
          lotesService.obtenerTodos(),
          estadisticasCuotasService.obtenerCuotasVencidas(),
          estadisticasCuotasService.obtenerCuotasProximasVencer(7),
        ]);

        console.log('✅ Estadísticas cargadas:', {
          ventas: dataVentas,
          cuotas: dataCuotas,
          pagos: dataPagos,
          lotes: dataLotes,
        });

        setStatsVentas(dataVentas);
        setStatsCuotas(dataCuotas);
        setStatsPagos(dataPagos);
        setStatsLotes(dataLotes);
        setLotes(dataLotesLista);
        setCuotasVencidas(dataVencidas);
        setCuotasProximasVencer(dataProximas);
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        console.error('❌ Error al cargar estadísticas:', errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  return {
    loading,
    error,
    statsVentas,
    statsCuotas,
    statsPagos,
    statsLotes,
    lotes,
    cuotasVencidas,
    cuotasProximasVencer,
  };
};
