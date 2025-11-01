import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  RefreshCw,
  ArrowLeft,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';
import { getErrorMessage } from '../services/http.service';
import { reportesService } from '../services/reportes.service';
import type {
  ReporteMoraPorCliente,
  ReporteMoraPorPeriodo,
  ReporteMoraDetallado,
  EstadisticasEfectividad
} from '../services/reportes.service';
import GraficasMora from '../components/GraficasMora';
import './ReportesMora.css';

type TipoReporte = 'cliente' | 'periodo' | 'detallado' | 'top';

export default function ReportesMora() {
  const navigate = useNavigate();

  const [tipoReporte, setTipoReporte] = useState<TipoReporte>('cliente');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mostrarGraficas, setMostrarGraficas] = useState(false);

  const [reporteClientes, setReporteClientes] = useState<ReporteMoraPorCliente[]>([]);
  const [reportePeriodo, setReportePeriodo] = useState<ReporteMoraPorPeriodo[]>([]);
  const [reporteDetallado, setReporteDetallado] = useState<ReporteMoraDetallado[]>([]);
  const [efectividad, setEfectividad] = useState<EstadisticasEfectividad | null>(null);

  const [fechaInicio, setFechaInicio] = useState(() => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - 6);
    return fecha.toISOString().split('T')[0];
  });

  const [fechaFin, setFechaFin] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    cargarReporte();
  }, [tipoReporte]);

  const cargarReporte = async () => {
    try {
      setIsLoading(true);
      setError(null);

      switch (tipoReporte) {
        case 'cliente':
          const clientes = await reportesService.obtenerPorCliente();
          setReporteClientes(clientes);
          break;

        case 'periodo':
          const periodo = await reportesService.obtenerPorPeriodo(fechaInicio, fechaFin);
          setReportePeriodo(periodo);
          break;

        case 'detallado':
          const detallado = await reportesService.obtenerDetallado();
          setReporteDetallado(detallado);
          break;

        case 'top':
          const top = await reportesService.obtenerTopClientes(10);
          setReporteClientes(top);
          const efectividadData = await reportesService.obtenerEfectividadCobro();
          setEfectividad(efectividadData);
          break;
      }
    } catch (err) {
      console.error('Error al cargar reporte:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const exportarReporte = () => {
    let datos: any[] = [];
    let nombre = '';

    switch (tipoReporte) {
      case 'cliente':
        datos = reporteClientes;
        nombre = 'reporte-mora-por-cliente';
        break;
      case 'periodo':
        datos = reportePeriodo;
        nombre = 'reporte-mora-por-periodo';
        break;
      case 'detallado':
        datos = reporteDetallado;
        nombre = 'reporte-mora-detallado';
        break;
      case 'top':
        datos = reporteClientes;
        nombre = 'top-10-clientes-mora';
        break;
    }

    if (datos.length > 0) {
      reportesService.exportarACSV(datos, nombre);
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

  return (
    <div className="mora-container">
      <div className="mora-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          <ArrowLeft size={18} />
          Volver
        </button>
        <div className="header-content">
          <div className="header-icon">
            <FileText size={32} />
          </div>
          <div>
            <h1 className="header-title">Reportes de Mora</h1>
            <p className="header-subtitle">Análisis integral y exportación de datos de mora</p>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={cargarReporte} className="btn-action" disabled={isLoading}>
            <RefreshCw size={18} className={isLoading ? 'spinning' : ''} />
            Actualizar
          </button>
          <button onClick={exportarReporte} className="btn-export">
            <Download size={18} />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="filtros-seccion">
        <div className="selector-tipo-reporte">
          <button
            className={`tipo-btn ${tipoReporte === 'cliente' ? 'active' : ''}`}
            onClick={() => setTipoReporte('cliente')}
          >
            <Users size={20} />
            <span>Por Cliente</span>
          </button>
          <button
            className={`tipo-btn ${tipoReporte === 'periodo' ? 'active' : ''}`}
            onClick={() => setTipoReporte('periodo')}
          >
            <Calendar size={20} />
            <span>Por Período</span>
          </button>
          <button
            className={`tipo-btn ${tipoReporte === 'detallado' ? 'active' : ''}`}
            onClick={() => setTipoReporte('detallado')}
          >
            <FileText size={20} />
            <span>Detallado</span>
          </button>
          <button
            className={`tipo-btn ${tipoReporte === 'top' ? 'active' : ''}`}
            onClick={() => setTipoReporte('top')}
          >
            <TrendingUp size={20} />
            <span>Top 10</span>
          </button>
        </div>
      </div>

      {tipoReporte === 'periodo' && (
        <div className="filtros-seccion">
          <div className="filtros-grid">
            <div className="filtro-field">
              <label>Fecha Inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="filtro-input"
              />
            </div>
            <div className="filtro-field">
              <label>Fecha Fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="filtro-input"
              />
            </div>
            <div className="filtro-field">
              <button onClick={cargarReporte} className="btn-aplicar">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Cargando reporte...</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="reporte-content">
          {tipoReporte === 'cliente' && (
            <>
              {/* Botón para mostrar/ocultar gráficas */}
              <button 
                onClick={() => setMostrarGraficas(!mostrarGraficas)}
                className="btn-toggle-graficas"
              >
                <BarChart3 size={18} />
                <span>{mostrarGraficas ? 'Ocultar' : 'Ver'} Análisis Gráfico</span>
                {mostrarGraficas ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {/* Gráficas colapsables */}
              {mostrarGraficas && (
                <div className="graficas-container">
                  <div className="full-width">
                    <GraficasMora
                      reporteClientes={reporteClientes}
                      tipo="clientes"
                    />
                  </div>
                </div>
              )}

              <div className="tabla-container">
                <h3>Reporte de Mora por Cliente ({reporteClientes.length})</h3>
                <div className="tabla-wrapper">
                  <table className="tabla-mora">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Documento</th>
                        <th>Cuotas con Mora</th>
                        <th>Mora Acumulada</th>
                        <th>Mora Pendiente</th>
                        <th>Días Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporteClientes.map((cliente) => (
                        <tr key={cliente.clienteUid}>
                          <td>{cliente.clienteNombre}</td>
                          <td>{cliente.clienteDocumento}</td>
                          <td>{cliente.totalCuotasConMora}</td>
                          <td className="text-danger">{formatCurrency(cliente.moraAcumulada)}</td>
                          <td className="text-warning">{formatCurrency(cliente.moraPendiente)}</td>
                          <td>{Math.round(cliente.diasPromedioMora)} días</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tipoReporte === 'periodo' && (
            <>
              {/* Botón para mostrar/ocultar gráficas */}
              <button 
                onClick={() => setMostrarGraficas(!mostrarGraficas)}
                className="btn-toggle-graficas"
              >
                <BarChart3 size={18} />
                <span>{mostrarGraficas ? 'Ocultar' : 'Ver'} Análisis Gráfico</span>
                {mostrarGraficas ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {/* Gráficas colapsables */}
              {mostrarGraficas && (
                <div className="graficas-container">
                  <div className="graficas-horizontales">
                    <GraficasMora
                      reportePeriodo={reportePeriodo}
                      tipo="tendencia"
                    />

                    <GraficasMora
                      reportePeriodo={reportePeriodo}
                      tipo="efectividad"
                    />
                  </div>
                </div>
              )}

              <div className="tabla-container">
                <h3>Reporte de Mora por Período ({reportePeriodo.length} meses)</h3>
                <div className="tabla-wrapper">
                  <table className="tabla-mora">
                    <thead>
                      <tr>
                        <th>Período</th>
                        <th>Cuotas Vencidas</th>
                        <th>Con Mora</th>
                        <th>Mora Generada</th>
                        <th>Mora Pagada</th>
                        <th>Efectividad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportePeriodo.map((periodo) => (
                        <tr key={periodo.periodo}>
                          <td>{periodo.periodo}</td>
                          <td>{periodo.totalCuotasVencidas}</td>
                          <td>{periodo.cuotasConMora}</td>
                          <td>{formatCurrency(periodo.moraGenerada)}</td>
                          <td>{formatCurrency(periodo.moraPagada)}</td>
                          <td>
                            <span className="badge badge-pendiente">
                              {periodo.porcentajeMoraCobrada.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {tipoReporte === 'detallado' && (
            <div className="tabla-container">
              <h3>Reporte Detallado de Mora ({reporteDetallado.length} cuotas)</h3>
              <div className="tabla-wrapper">
                <table className="tabla-mora">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Lote</th>
                      <th>Cuota</th>
                      <th>Vencimiento</th>
                      <th>Días Mora</th>
                      <th>Mora Acumulada</th>
                      <th>Mora Pagada</th>
                      <th>Mora Pendiente</th>
                      <th>Tasa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporteDetallado.map((detalle, index) => (
                      <tr key={index}>
                        <td>{detalle.clienteNombre}</td>
                        <td>{detalle.lotecodigo}</td>
                        <td>#{detalle.numeroCuota}</td>
                        <td>{new Date(detalle.fechaVencimiento).toLocaleDateString('es-CO')}</td>
                        <td>{detalle.diasMora}</td>
                        <td>{formatCurrency(detalle.montoMora)}</td>
                        <td>{formatCurrency(detalle.montoMoraPagado)}</td>
                        <td className="text-danger">{formatCurrency(detalle.moraPendiente)}</td>
                        <td>{(detalle.tasaMoraAplicada * 100).toFixed(3)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tipoReporte === 'top' && (
            <>
              {efectividad && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Mora Generada</div>
                    <div className="stat-value text-danger">{formatCurrency(efectividad.moraGeneradaTotal)}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Mora Cobrada</div>
                    <div className="stat-value text-success">{formatCurrency(efectividad.moraCobradaTotal)}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Mora Pendiente</div>
                    <div className="stat-value text-warning">{formatCurrency(efectividad.moraPendienteTotal)}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Efectividad</div>
                    <div className="stat-value">{efectividad.porcentajeEfectividad.toFixed(1)}%</div>
                  </div>
                </div>
              )}

              <div className="tabla-container">
                <h3>Top 10 Clientes con Mayor Mora</h3>
                <div className="tabla-wrapper">
                  <table className="tabla-mora">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Documento</th>
                        <th>Cuotas</th>
                        <th>Mora Pendiente</th>
                        <th>Días Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporteClientes.map((cliente, index) => (
                        <tr key={cliente.clienteUid}>
                          <td className="font-bold">#{index + 1}</td>
                          <td>{cliente.clienteNombre}</td>
                          <td>{cliente.clienteDocumento}</td>
                          <td>{cliente.totalCuotasConMora}</td>
                          <td className="text-danger font-bold">{formatCurrency(cliente.moraPendiente)}</td>
                          <td>{Math.round(cliente.diasPromedioMora)} días</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
