// Componente TabAlertas - Muestra cuotas vencidas y próximas a vencer
import { AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage, formatDate } from '../../utils/formatters';
import type { CuotaVencida, CuotaProximaVencer, EstadisticasCuotas } from '../../types';
import './TabAlertas.css';

interface TabAlertasProps {
  cuotasVencidas: CuotaVencida[];
  cuotasProximasVencer: CuotaProximaVencer[];
  statsCuotas: EstadisticasCuotas | null;
}

const TabAlertas = ({
  cuotasVencidas,
  cuotasProximasVencer,
  statsCuotas,
}: TabAlertasProps) => {
  // Calcular monto total vencido
  const montoTotalVencido = cuotasVencidas.reduce((sum, c) => sum + c.montoPendiente, 0);

  return (
    <div className="alertas-section">
      <h2 className="section-title">Alertas y Vencimientos</h2>

      {/* Resumen de alertas */}
      <div className="alertas-resumen">
        <div className="alerta-card alerta-critica">
          <div className="alerta-icon">🚨</div>
          <div className="alerta-info">
            <h3>{cuotasVencidas.length}</h3>
            <p>Cuotas Vencidas</p>
          </div>
        </div>
        <div className="alerta-card alerta-warning">
          <div className="alerta-icon">⏰</div>
          <div className="alerta-info">
            <h3>{cuotasProximasVencer.length}</h3>
            <p>Próximas a Vencer</p>
          </div>
        </div>
        <div className="alerta-card alerta-info">
          <div className="alerta-icon">💰</div>
          <div className="alerta-info">
            <h3>{formatCurrency(montoTotalVencido)}</h3>
            <p>Monto Vencido</p>
          </div>
        </div>
        <div className="alerta-card alerta-success">
          <div className="alerta-icon">📊</div>
          <div className="alerta-info">
            <h3>{formatPercentage(statsCuotas?.porcentajeCobranza || 0)}</h3>
            <p>Tasa de Cobranza</p>
          </div>
        </div>
      </div>

      {/* Cuotas Vencidas */}
      <div className="alertas-tabla-container">
        <div className="tabla-header">
          <h3 className="tabla-title">
            <AlertCircle className="text-red-600" size={24} />
            Cuotas Vencidas ({cuotasVencidas.length})
          </h3>
        </div>
        
        {cuotasVencidas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <h4>¡Excelente!</h4>
            <p>No hay cuotas vencidas en este momento</p>
          </div>
        ) : (
          <div className="tabla-scroll">
            <table className="alertas-tabla">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Lote</th>
                  <th>Cuota #</th>
                  <th>Valor</th>
                  <th>Pendiente</th>
                  <th>Vencimiento</th>
                  <th>Días Atraso</th>
                  <th>Urgencia</th>
                </tr>
              </thead>
              <tbody>
                {cuotasVencidas.map((cuota) => {
                  const diasAtraso = Math.abs(cuota.diasVencimiento);
                  let urgenciaClass = 'urgencia-baja';
                  let urgenciaText = 'Baja';
                  
                  if (diasAtraso > 30) {
                    urgenciaClass = 'urgencia-critica';
                    urgenciaText = 'Crítica';
                  } else if (diasAtraso > 15) {
                    urgenciaClass = 'urgencia-alta';
                    urgenciaText = 'Alta';
                  } else if (diasAtraso > 7) {
                    urgenciaClass = 'urgencia-media';
                    urgenciaText = 'Media';
                  }

                  return (
                    <tr key={cuota.uid}>
                      <td>
                        <div className="cliente-info">
                          <strong>
                            {cuota.cliente?.nombres} {cuota.cliente?.apellidos}
                          </strong>
                        </div>
                      </td>
                      <td>
                        <span className="lote-badge">{cuota.lote?.codigo || 'N/A'}</span>
                      </td>
                      <td>
                        <span className="cuota-numero">#{cuota.numeroCuota}</span>
                      </td>
                      <td>
                        <strong>{formatCurrency(cuota.valor)}</strong>
                      </td>
                      <td>
                        <span className="monto-pendiente">{formatCurrency(cuota.montoPendiente)}</span>
                      </td>
                      <td>{formatDate(cuota.fechaVencimiento)}</td>
                      <td>
                        <span className="dias-atraso">{diasAtraso} días</span>
                      </td>
                      <td>
                        <span className={`urgencia-badge ${urgenciaClass}`}>
                          {urgenciaText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cuotas Próximas a Vencer */}
      <div className="alertas-tabla-container">
        <div className="tabla-header">
          <h3 className="tabla-title">
            <TrendingUp className="text-yellow-600" size={24} />
            Próximas a Vencer - Próximos 7 días ({cuotasProximasVencer.length})
          </h3>
        </div>
        
        {cuotasProximasVencer.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h4>Sin cuotas próximas</h4>
            <p>No hay cuotas que venzan en los próximos 7 días</p>
          </div>
        ) : (
          <div className="tabla-scroll">
            <table className="alertas-tabla">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Lote</th>
                  <th>Cuota #</th>
                  <th>Valor</th>
                  <th>Pendiente</th>
                  <th>Vencimiento</th>
                  <th>Días Restantes</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {cuotasProximasVencer.map((cuota) => {
                  const diasRestantes = cuota.diasVencimiento;
                  let prioridadClass = 'prioridad-baja';
                  let prioridadText = 'Baja';
                  
                  if (diasRestantes <= 2) {
                    prioridadClass = 'prioridad-alta';
                    prioridadText = 'Alta';
                  } else if (diasRestantes <= 4) {
                    prioridadClass = 'prioridad-media';
                    prioridadText = 'Media';
                  }

                  return (
                    <tr key={cuota.uid}>
                      <td>
                        <div className="cliente-info">
                          <strong>
                            {cuota.cliente?.nombres} {cuota.cliente?.apellidos}
                          </strong>
                        </div>
                      </td>
                      <td>
                        <span className="lote-badge">{cuota.lote?.codigo || 'N/A'}</span>
                      </td>
                      <td>
                        <span className="cuota-numero">#{cuota.numeroCuota}</span>
                      </td>
                      <td>
                        <strong>{formatCurrency(cuota.valor)}</strong>
                      </td>
                      <td>
                        <span className="monto-pendiente">{formatCurrency(cuota.montoPendiente)}</span>
                      </td>
                      <td>{formatDate(cuota.fechaVencimiento)}</td>
                      <td>
                        <span className="dias-restantes">{diasRestantes} días</span>
                      </td>
                      <td>
                        <span className={`prioridad-badge ${prioridadClass}`}>
                          {prioridadText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabAlertas;
