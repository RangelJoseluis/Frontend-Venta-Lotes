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
import './MoraWidget.css';

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
      <div className="mora-widget loading">
        <div className="spinner-small"></div>
        <p>Cargando estadísticas de mora...</p>
      </div>
    );
  }

  if (error || !estadisticas) {
    return (
      <div className="mora-widget error">
        <AlertTriangle size={24} />
        <p>Error al cargar mora</p>
      </div>
    );
  }

  const tieneMora = estadisticas.totalCuotasConMora > 0;
  const severidad = estadisticas.totalCuotasConMora >= 10 ? 'alta' : 
                    estadisticas.totalCuotasConMora >= 5 ? 'media' : 'baja';

  return (
    <div className={`mora-widget ${tieneMora ? `severidad-${severidad}` : 'sin-mora'}`}>
      {/* Header */}
      <div className="mora-widget-header">
        <div className="mora-widget-title">
          <AlertTriangle className="mora-widget-icon" />
          <h3>Mora Acumulada</h3>
        </div>
        {tieneMora && (
          <span className={`mora-badge badge-${severidad}`}>
            {estadisticas.totalCuotasConMora} cuotas
          </span>
        )}
      </div>

      {/* Contenido */}
      {tieneMora ? (
        <>
          {/* Monto principal */}
          <div className="mora-monto-principal">
            <DollarSign className="monto-icon" />
            <div className="monto-content">
              <span className="monto-label">Mora Total</span>
              <span className="monto-valor">
                {formatCurrency(estadisticas.moraAcumuladaTotal)}
              </span>
            </div>
          </div>

          {/* Estadísticas secundarias */}
          <div className="mora-stats-grid">
            <div className="mora-stat-item">
              <Clock size={16} />
              <div className="stat-content">
                <span className="stat-label">Pendiente</span>
                <span className="stat-valor">
                  {formatCurrency(estadisticas.moraPendientePago)}
                </span>
              </div>
            </div>

            <div className="mora-stat-item">
              <TrendingUp size={16} />
              <div className="stat-content">
                <span className="stat-label">Promedio</span>
                <span className="stat-valor">
                  {formatCurrency(estadisticas.promedioMoraPorCuota)}
                </span>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <button 
            className="mora-action-button"
            onClick={() => navigate('/gestion-mora')}
          >
            Ver Detalle Completo
          </button>
        </>
      ) : (
        <div className="mora-sin-datos">
          <div className="check-icon">✓</div>
          <p className="sin-mora-title">Sin Mora Pendiente</p>
          <p className="sin-mora-subtitle">
            ¡Excelente! No hay cuotas vencidas con mora acumulada
          </p>
        </div>
      )}
    </div>
  );
};

export default MoraWidget;
