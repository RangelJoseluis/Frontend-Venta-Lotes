// Componente TabCobranza - Muestra análisis de cobranza con gráficos
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PaymentMethodCard } from '../../../components/ReportesComponents';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { COLORES_GRAFICO } from '../../constants';
import type { EstadisticasPagos, EstadisticasCuotas } from '../../types';
import './TabCobranza.css';

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
    <div className="cobranza-section">
      <h2 className="section-title">Análisis de Cobranza</h2>

      {/* Métricas Principales */}
      <div className="cobranza-metricas">
        <div className="metrica-card metrica-total">
          <div className="metrica-icon">💰</div>
          <div className="metrica-content">
            <h3>{formatCurrency(statsPagos?.montoTotalPagos || 0)}</h3>
            <p>Total Recaudado (Año Actual)</p>
          </div>
        </div>
        <div className="metrica-card metrica-pagos">
          <div className="metrica-icon">📊</div>
          <div className="metrica-content">
            <h3>{statsPagos?.totalPagos || 0}</h3>
            <p>Total de Pagos</p>
          </div>
        </div>
        <div className="metrica-card metrica-promedio">
          <div className="metrica-icon">📈</div>
          <div className="metrica-content">
            <h3>{formatCurrency(statsPagos?.promedioMontoPago || 0)}</h3>
            <p>Promedio por Pago</p>
          </div>
        </div>
        <div className="metrica-card metrica-tasa">
          <div className="metrica-icon">✅</div>
          <div className="metrica-content">
            <h3>{formatPercentage(statsCuotas?.porcentajeCobranza || 0)}</h3>
            <p>Tasa de Cobranza</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="cobranza-graficos">
        {/* Gráfico de Métodos de Pago */}
        <div className="grafico-card">
          <div className="grafico-header">
            <h3 className="grafico-title">Distribución por Método de Pago</h3>
            <p className="grafico-subtitle">Cantidad de pagos por método</p>
          </div>
          <div className="grafico-content">
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
        <div className="grafico-card">
          <div className="grafico-header">
            <h3 className="grafico-title">Montos por Método de Pago</h3>
            <p className="grafico-subtitle">Total recaudado por cada método</p>
          </div>
          <div className="grafico-content">
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
      <div className="cobranza-detalle">
        <div className="detalle-header">
          <h3 className="detalle-title">Resumen Detallado por Método de Pago</h3>
        </div>
        <div className="detalle-grid">
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
