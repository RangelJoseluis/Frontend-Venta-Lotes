/**
 * COMPONENTE: GRÁFICAS DE MORA
 * 
 * Visualizaciones con Victory para análisis de mora
 */

import {
  VictoryLine,
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLegend,
  VictoryLabel,
} from 'victory';
import type { ReporteMoraPorPeriodo, ReporteMoraPorCliente } from '../../services/reportes.service';
import './GraficasMora.css';

interface GraficasMoraProps {
  reportePeriodo?: ReporteMoraPorPeriodo[];
  reporteClientes?: ReporteMoraPorCliente[];
  tipo: 'tendencia' | 'clientes' | 'efectividad';
}

export default function GraficasMora({ reportePeriodo, reporteClientes, tipo }: GraficasMoraProps) {
  
  // Formatear moneda en pesos colombianos
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  // GRÁFICA 1: Tendencia de Mora Mensual (Línea)
  if (tipo === 'tendencia' && reportePeriodo && reportePeriodo.length > 0) {
    // Validar que haya datos reales (no solo ceros)
    const hayDatosReales = reportePeriodo.some(p => p.moraGenerada > 0 || p.moraPagada > 0);
    
    if (!hayDatosReales) {
      return (
        <div className="grafica-container">
          <h3 className="grafica-titulo">Tendencia de Mora Mensual</h3>
          <div className="sin-datos">
            <p>📊 No hay datos de mora para este período</p>
            <p className="sin-datos-hint">Los datos aparecerán cuando se genere mora en las cuotas vencidas</p>
          </div>
        </div>
      );
    }
    const dataMoraGenerada = reportePeriodo.map(p => ({
      x: p.periodo,
      y: p.moraGenerada,
    }));

    const dataMoraCobrada = reportePeriodo.map(p => ({
      x: p.periodo,
      y: p.moraPagada,
    }));

    return (
      <div className="grafica-container">
        <h3 className="grafica-titulo">Tendencia de Mora Mensual</h3>
        <VictoryChart
          theme={VictoryTheme.material}
          height={150}
          padding={{ top: 10, bottom: 25, left: 50, right: 10 }}
        >
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 10, angle: -45, textAnchor: 'end' }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => formatCurrency(t)}
            style={{
              tickLabels: { fontSize: 10 }
            }}
          />
          
          {/* Línea de Mora Generada */}
          <VictoryLine
            data={dataMoraGenerada}
            style={{
              data: { stroke: '#dc2626', strokeWidth: 3 }
            }}
            labels={({ datum }) => formatCurrency(datum.y)}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
                flyoutStyle={{ fill: 'white', stroke: '#dc2626' }}
              />
            }
          />
          
          {/* Línea de Mora Cobrada */}
          <VictoryLine
            data={dataMoraCobrada}
            style={{
              data: { stroke: '#059669', strokeWidth: 3 }
            }}
            labels={({ datum }) => formatCurrency(datum.y)}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
                flyoutStyle={{ fill: 'white', stroke: '#059669' }}
              />
            }
          />

          <VictoryLegend
            x={120}
            y={10}
            orientation="horizontal"
            gutter={20}
            style={{ labels: { fontSize: 10 } }}
            data={[
              { name: 'Mora Generada', symbol: { fill: '#dc2626' } },
              { name: 'Mora Cobrada', symbol: { fill: '#059669' } }
            ]}
          />
        </VictoryChart>
      </div>
    );
  }

  // GRÁFICA 2: Mora por Cliente (Barras Horizontales - Top 10)
  if (tipo === 'clientes' && reporteClientes && reporteClientes.length > 0) {
    // Validar que haya clientes con mora real
    const clientesConMora = reporteClientes.filter(c => c.moraPendiente > 0);
    
    if (clientesConMora.length === 0) {
      return (
        <div className="grafica-container">
          <h3 className="grafica-titulo">Top 10 Clientes por Mora Pendiente</h3>
          <div className="sin-datos">
            <p>📊 No hay clientes con mora pendiente</p>
            <p className="sin-datos-hint">¡Excelente! Todos los pagos están al día</p>
          </div>
        </div>
      );
    }
    const top10 = reporteClientes.slice(0, 10);
    const dataClientes = top10.map((cliente, index) => ({
      x: index + 1,
      y: cliente.moraPendiente,
      label: `${cliente.clienteNombre.substring(0, 20)}...\n${formatCurrency(cliente.moraPendiente)}`
    }));

    return (
      <div className="grafica-container">
        <h3 className="grafica-titulo">Top 10 Clientes por Mora Pendiente</h3>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
          height={150}
          padding={{ top: 10, bottom: 25, left: 60, right: 25 }}
        >
          <VictoryAxis
            tickValues={dataClientes.map(d => d.x)}
            tickFormat={dataClientes.map((_, i) => `#${i + 1}`)}
            style={{
              tickLabels: { fontSize: 10 }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => formatCurrency(t)}
            style={{
              tickLabels: { fontSize: 10 }
            }}
          />
          <VictoryBar
            data={dataClientes}
            style={{
              data: {
                fill: ({ datum }) => {
                  if (datum.x <= 3) return '#dc2626'; // Top 3 rojo
                  if (datum.x <= 7) return '#f59e0b'; // 4-7 naranja
                  return '#fbbf24'; // 8-10 amarillo
                }
              }
            }}
            labels={({ datum }) => formatCurrency(datum.y)}
            labelComponent={
              <VictoryLabel
                style={{ fontSize: 9, fill: 'white' }}
                dy={-10}
              />
            }
          />
        </VictoryChart>
      </div>
    );
  }

  // GRÁFICA 3: Efectividad de Cobro (Pie Chart)
  if (tipo === 'efectividad' && reportePeriodo && reportePeriodo.length > 0) {
    // Validar que haya mora generada
    const hayMora = reportePeriodo.some(p => p.moraGenerada > 0);
    
    if (!hayMora) {
      return (
        <div className="grafica-container">
          <h3 className="grafica-titulo">Efectividad de Cobro de Mora</h3>
          <div className="sin-datos">
            <p>📊 No hay datos de mora para analizar</p>
            <p className="sin-datos-hint">Las estadísticas aparecerán cuando se genere y cobre mora</p>
          </div>
        </div>
      );
    }
    const totalGenerada = reportePeriodo.reduce((sum, p) => sum + p.moraGenerada, 0);
    const totalCobrada = reportePeriodo.reduce((sum, p) => sum + p.moraPagada, 0);
    const totalPendiente = reportePeriodo.reduce((sum, p) => sum + p.moraPendiente, 0);

    const dataPie = [
      { x: 'Cobrada', y: totalCobrada, label: `Cobrada\n${formatCurrency(totalCobrada)}` },
      { x: 'Pendiente', y: totalPendiente, label: `Pendiente\n${formatCurrency(totalPendiente)}` }
    ];

    const porcentajeCobrado = totalGenerada > 0 ? ((totalCobrada / totalGenerada) * 100).toFixed(1) : 0;

    return (
      <div className="grafica-container">
        <h3 className="grafica-titulo">Efectividad de Cobro de Mora</h3>
        <div className="porcentaje-efectividad">
          <span className="porcentaje-label">Efectividad Global:</span>
          <span className="porcentaje-valor">{porcentajeCobrado}%</span>
        </div>
        <VictoryPie
          data={dataPie}
          colorScale={['#059669', '#f59e0b']}
          labelRadius={60}
          style={{
            labels: { fontSize: 10, fill: 'white', fontWeight: 'bold' }
          }}
          innerRadius={60}
          labelComponent={<VictoryLabel />}
          height={200}
          padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
        />
        <div className="leyenda-pie">
          <div className="leyenda-item">
            <span className="leyenda-color" style={{ background: '#059669' }}></span>
            <span>Mora Cobrada ({((totalCobrada / totalGenerada) * 100).toFixed(1)}%)</span>
          </div>
          <div className="leyenda-item">
            <span className="leyenda-color" style={{ background: '#f59e0b' }}></span>
            <span>Mora Pendiente ({((totalPendiente / totalGenerada) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grafica-container">
      <p className="sin-datos">No hay datos suficientes para generar gráfica</p>
    </div>
  );
}
