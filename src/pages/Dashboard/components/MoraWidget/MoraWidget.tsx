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
    alta: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100',
    media: 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
    baja: 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100'
  };

  const badgeColors = {
    alta: 'bg-red-600 text-white',
    media: 'bg-amber-600 text-white',
    baja: 'bg-blue-600 text-white'
  };

  return (
    <div className={`rounded-2xl shadow-sm border-2 overflow-hidden ${tieneMora ? severidadColors[severidad] : 'bg-white border-slate-200'}`}>
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-200 flex justify-between items-center gap-3 flex-wrap bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-6 h-6 ${tieneMora ? 'text-red-600' : 'text-slate-600'}`} />
          <h3 className="text-base md:text-lg font-bold text-slate-900 m-0">Mora Acumulada</h3>
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
            <div className="flex items-center gap-4 mb-6 p-4 bg-white/80 rounded-xl backdrop-blur-sm">
              <DollarSign className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-slate-600 font-medium">Mora Total</span>
                <span className="text-2xl md:text-3xl font-bold text-red-600">
                  {formatCurrency(estadisticas.moraAcumuladaTotal)}
                </span>
              </div>
            </div>

            {/* Estadísticas secundarias */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 bg-white/80 rounded-lg backdrop-blur-sm">
                <Clock size={16} className="text-amber-600 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-600">Pendiente</span>
                  <span className="text-sm font-semibold text-slate-900 truncate">
                    {formatCurrency(estadisticas.moraPendientePago)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-white/80 rounded-lg backdrop-blur-sm">
                <TrendingUp size={16} className="text-blue-600 flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-slate-600">Promedio</span>
                  <span className="text-sm font-semibold text-slate-900 truncate">
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
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <span className="text-3xl text-emerald-600">✓</span>
            </div>
            <p className="text-base font-bold text-slate-900 mb-1">Sin Mora Pendiente</p>
            <p className="text-sm text-slate-600 max-w-xs">
              ¡Excelente! No hay cuotas vencidas con mora acumulada
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoraWidget;
