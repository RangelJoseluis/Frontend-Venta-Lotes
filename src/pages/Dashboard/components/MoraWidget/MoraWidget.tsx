/**
 * WIDGET: ESTADÍSTICAS DE MORA
 * 
 * Muestra un resumen visual de la mora acumulada en el dashboard principal
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { moraService } from '../../../../services/mora.service';
import type { EstadisticasMora } from '../../../../services/mora.service';
import { getErrorMessage } from '../../../../services/http.service';

const MoraWidget = () => {
  const navigate = useNavigate();
  const [estadisticas, setEstadisticas] = useState<EstadisticasMora | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setIsLoading(true);
      const data = await moraService.obtenerEstadisticas();
      setEstadisticas(data);
    } catch (err) {
      console.error('❌ Error al cargar estadísticas de mora:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm text-slate-600">Cargando estadísticas de mora...</p>
      </div>
    );
  }

  if (error || !estadisticas) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[200px] text-red-600">
        <AlertTriangle size={24} className="mb-2" />
        <p className="text-sm">Error al cargar mora</p>
      </div>
    );
  }

  const tieneMora = estadisticas.totalCuotasConMora > 0;
  const severidad = estadisticas.totalCuotasConMora >= 10 ? 'alta' :
    estadisticas.totalCuotasConMora >= 5 ? 'media' : 'baja';

  const severidadColors = {
    alta: 'border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/10',
    media: 'border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10',
    baja: 'border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10'
  };

  const badgeColors = {
    alta: 'bg-red-600 text-white',
    media: 'bg-amber-600 text-white',
    baja: 'bg-blue-600 text-white'
  };

  return (
    <div className={`rounded-2xl shadow-sm border-2 overflow-hidden transition-colors duration-200 ${tieneMora ? severidadColors[severidad] : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center gap-3 flex-wrap bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-6 h-6 ${tieneMora ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400'}`} />
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white m-0">Mora Acumulada</h3>
        </div>
        {tieneMora && (
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColors[severidad]}`}>
            {estadisticas.totalCuotasConMora} cuotas
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-6">
        {tieneMora ? (
          <>
            {/* Monto principal */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-white/80 dark:bg-slate-800/80 rounded-xl backdrop-blur-sm">
              <DollarSign className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Mora Total</span>
                <span className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(estadisticas.moraAcumuladaTotal)}
                </span>
              </div>
            </div>

            {/* Estadísticas secundarias */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg backdrop-blur-sm">
                <Clock size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-600 dark:text-slate-300">Pendiente</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {formatCurrency(estadisticas.moraPendientePago)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg backdrop-blur-sm">
                <TrendingUp size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-600 dark:text-slate-300">Promedio</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {formatCurrency(estadisticas.promedioMoraPorCuota)}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de acción */}
            <button
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
              onClick={() => navigate('/gestion-mora')}
            >
              Ver Detalle Completo
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
              <span className="text-3xl text-emerald-600 dark:text-emerald-400">✓</span>
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Sin Mora Pendiente</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              ¡Excelente! No hay cuotas vencidas con mora acumulada
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoraWidget;
