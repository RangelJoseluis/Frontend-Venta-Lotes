// Componente TabCobranza - Muestra análisis de cobranza con gráficos
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PaymentMethodCard } from '../../../components/ReportesComponents';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { COLORES_GRAFICO } from '../../constants';
import type { EstadisticasPagos, EstadisticasCuotas } from '../../types';

interface TabCobranzaProps {
  statsPagos: EstadisticasPagos | null;
  statsCuotas: EstadisticasCuotas | null;
}

const TabCobranza = ({ statsPagos, statsCuotas }: TabCobranzaProps) => {
  // Datos para gráfico de pastel (cantidad de pagos)
  const datosPagosPorMetodo = [
    { name: 'Efectivo', value: statsPagos?.pagosPorMetodo.efectivo || 0, color: COLORES_GRAFICO.EFECTIVO },
    { name: 'Transferencia', value: statsPagos?.pagosPorMetodo.transferencia || 0, color: COLORES_GRAFICO.TRANSFERENCIA },
    { name: 'Cheque', value: statsPagos?.pagosPorMetodo.cheque || 0, color: COLORES_GRAFICO.CHEQUE },
    { name: 'Tarjeta', value: statsPagos?.pagosPorMetodo.tarjeta || 0, color: COLORES_GRAFICO.TARJETA },
  ].filter(item => item.value > 0);

  // Datos para gráfico de barras (montos por método)
  const datosMontosPorMetodo = [
    { metodo: 'Efectivo', monto: statsPagos?.montosPorMetodo.efectivo || 0 },
    { metodo: 'Transferencia', monto: statsPagos?.montosPorMetodo.transferencia || 0 },
    { metodo: 'Cheque', monto: statsPagos?.montosPorMetodo.cheque || 0 },
    { metodo: 'Tarjeta', monto: statsPagos?.montosPorMetodo.tarjeta || 0 },
  ].filter(item => item.monto > 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Análisis de Cobranza</h2>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-500/30">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-1">{formatCurrency(statsPagos?.montoTotalPagos || 0)}</h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Total Recaudado (Año Actual)</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-500/30">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-1">{statsPagos?.totalPagos || 0}</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">Total de Pagos</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-500/30">
          <div className="text-4xl mb-3">📈</div>
          <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">{formatCurrency(statsPagos?.promedioMontoPago || 0)}</h3>
          <p className="text-sm text-purple-600 dark:text-purple-400">Promedio por Pago</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-amber-200 dark:border-amber-500/30">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-1">{formatPercentage(statsCuotas?.porcentajeCobranza || 0)}</h3>
          <p className="text-sm text-amber-600 dark:text-amber-400">Tasa de Cobranza</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Métodos de Pago */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Distribución por Método de Pago</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Cantidad de pagos por método</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosPagosPorMetodo}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => {
                    const { name, percent } = props;
                    return `${name}: ${((percent || 0) * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosPagosPorMetodo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Montos por Método */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Montos por Método de Pago</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total recaudado por cada método</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosMontosPorMetodo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metodo" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: '#1e293b' }}
                />
                <Legend />
                <Bar dataKey="monto" fill="#3b82f6" name="Monto Total" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Resumen Detallado por Método */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Resumen Detallado por Método de Pago</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PaymentMethodCard
            method="efectivo"
            icon="💵"
            title="Efectivo"
            quantity={statsPagos?.pagosPorMetodo.efectivo || 0}
            totalAmount={statsPagos?.montosPorMetodo.efectivo || 0}
            average={
              (statsPagos?.pagosPorMetodo.efectivo || 0) > 0
                ? (statsPagos?.montosPorMetodo.efectivo || 0) / (statsPagos?.pagosPorMetodo.efectivo || 1)
                : 0
            }
            formatCurrency={formatCurrency}
          />

          <PaymentMethodCard
            method="transferencia"
            icon="🏦"
            title="Transferencia"
            quantity={statsPagos?.pagosPorMetodo.transferencia || 0}
            totalAmount={statsPagos?.montosPorMetodo.transferencia || 0}
            average={
              (statsPagos?.pagosPorMetodo.transferencia || 0) > 0
                ? (statsPagos?.montosPorMetodo.transferencia || 0) / (statsPagos?.pagosPorMetodo.transferencia || 1)
                : 0
            }
            formatCurrency={formatCurrency}
          />

          <PaymentMethodCard
            method="cheque"
            icon="📝"
            title="Cheque"
            quantity={statsPagos?.pagosPorMetodo.cheque || 0}
            totalAmount={statsPagos?.montosPorMetodo.cheque || 0}
            average={
              (statsPagos?.pagosPorMetodo.cheque || 0) > 0
                ? (statsPagos?.montosPorMetodo.cheque || 0) / (statsPagos?.pagosPorMetodo.cheque || 1)
                : 0
            }
            formatCurrency={formatCurrency}
          />

          <PaymentMethodCard
            method="tarjeta"
            icon="💳"
            title="Tarjeta"
            quantity={statsPagos?.pagosPorMetodo.tarjeta || 0}
            totalAmount={statsPagos?.montosPorMetodo.tarjeta || 0}
            average={
              (statsPagos?.pagosPorMetodo.tarjeta || 0) > 0
                ? (statsPagos?.montosPorMetodo.tarjeta || 0) / (statsPagos?.pagosPorMetodo.tarjeta || 1)
                : 0
            }
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default TabCobranza;
