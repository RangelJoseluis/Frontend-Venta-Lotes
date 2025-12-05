// Componente TabAlertas - Muestra cuotas vencidas y próximas a vencer
import { AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage, formatDate } from '../../utils/formatters';
import type { CuotaVencida, CuotaProximaVencer, EstadisticasCuotas } from '../../types';

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

  const getUrgenciaClasses = (diasAtraso: number) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
    if (diasAtraso > 30) {
      return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30`;
    } else if (diasAtraso > 15) {
      return `${baseClasses} bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30`;
    } else if (diasAtraso > 7) {
      return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30`;
    }
    return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30`;
  };

  const getPrioridadClasses = (diasRestantes: number) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
    if (diasRestantes <= 2) {
      return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30`;
    } else if (diasRestantes <= 4) {
      return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30`;
    }
    return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Alertas y Vencimientos</h2>

      {/* Resumen de alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200 dark:border-red-500/30">
          <div className="text-4xl mb-3">🚨</div>
          <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-1">{cuotasVencidas.length}</h3>
          <p className="text-sm text-red-600 dark:text-red-400">Cuotas Vencidas</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-500/30">
          <div className="text-4xl mb-3">⏰</div>
          <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-1">{cuotasProximasVencer.length}</h3>
          <p className="text-sm text-amber-600 dark:text-amber-400">Próximas a Vencer</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-500/30">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">{formatCurrency(montoTotalVencido)}</h3>
          <p className="text-sm text-purple-600 dark:text-purple-400">Monto Vencido</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-500/30">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">{formatPercentage(statsCuotas?.porcentajeCobranza || 0)}</h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Tasa de Cobranza</p>
        </div>
      </div>

      {/* Cuotas Vencidas */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Cuotas Vencidas ({cuotasVencidas.length})
            </h3>
          </div>
        </div>

        {cuotasVencidas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
            <div className="text-6xl mb-4">✅</div>
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">¡Excelente!</h4>
            <p className="text-sm">No hay cuotas vencidas en este momento</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Lote</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Cuota #</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Pendiente</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Vencimiento</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Días Atraso</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Urgencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {cuotasVencidas.map((cuota) => {
                  const diasAtraso = Math.abs(cuota.diasVencimiento);
                  let urgenciaText = 'Baja';

                  if (diasAtraso > 30) {
                    urgenciaText = 'Crítica';
                  } else if (diasAtraso > 15) {
                    urgenciaText = 'Alta';
                  } else if (diasAtraso > 7) {
                    urgenciaText = 'Media';
                  }

                  return (
                    <tr key={cuota.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 align-middle">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {cuota.cliente?.nombres} {cuota.cliente?.apellidos}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                          {cuota.lote?.codigo || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">#{cuota.numeroCuota}</span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <strong className="text-slate-900 dark:text-white">{formatCurrency(cuota.valor)}</strong>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className="text-red-600 dark:text-red-400 font-medium">{formatCurrency(cuota.montoPendiente)}</span>
                      </td>
                      <td className="px-6 py-4 align-middle text-slate-700 dark:text-slate-300">{formatDate(cuota.fechaVencimiento)}</td>
                      <td className="px-6 py-4 align-middle">
                        <span className="font-semibold text-red-600 dark:text-red-400">{diasAtraso} días</span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className={getUrgenciaClasses(diasAtraso)}>
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
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-yellow-600 dark:text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Próximas a Vencer - Próximos 7 días ({cuotasProximasVencer.length})
            </h3>
          </div>
        </div>

        {cuotasProximasVencer.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
            <div className="text-6xl mb-4">📅</div>
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">Sin cuotas próximas</h4>
            <p className="text-sm">No hay cuotas que venzan en los próximos 7 días</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Lote</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Cuota #</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Pendiente</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Vencimiento</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Días Restantes</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Prioridad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {cuotasProximasVencer.map((cuota) => {
                  const diasRestantes = cuota.diasVencimiento;
                  let prioridadText = 'Baja';

                  if (diasRestantes <= 2) {
                    prioridadText = 'Alta';
                  } else if (diasRestantes <= 4) {
                    prioridadText = 'Media';
                  }

                  return (
                    <tr key={cuota.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 align-middle">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {cuota.cliente?.nombres} {cuota.cliente?.apellidos}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
                          {cuota.lote?.codigo || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">#{cuota.numeroCuota}</span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <strong className="text-slate-900 dark:text-white">{formatCurrency(cuota.valor)}</strong>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className="text-amber-600 dark:text-amber-400 font-medium">{formatCurrency(cuota.montoPendiente)}</span>
                      </td>
                      <td className="px-6 py-4 align-middle text-slate-700 dark:text-slate-300">{formatDate(cuota.fechaVencimiento)}</td>
                      <td className="px-6 py-4 align-middle">
                        <span className="font-semibold text-amber-600 dark:text-amber-400">{diasRestantes} días</span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className={getPrioridadClasses(diasRestantes)}>
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
