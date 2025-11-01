/**
 * PÁGINA: REPORTES DE MORA
 * 
 * Visualización y exportación de reportes de mora
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Calendar,
  Users,
  TrendingUp,
  FileText,
  RefreshCw
} from 'lucide-react';
import { reportesService } from '../services/reportes.service';
import type {
  ReporteMoraPorCliente,
  ReporteMoraPorPeriodo,
  ReporteMoraDetallado,
  EstadisticasEfectividad
} from '../services/reportes.service';
import { getErrorMessage } from '../services/http.service';
import GraficasMora from '../components/GraficasMora';
import './ReportesMora.css';

type TipoReporte = 'cliente' | 'periodo' | 'detallado' | 'top';

export default function ReportesMora() {
  const navigate = useNavigate();

  // Estados
  const [tipoReporte, setTipoReporte] = useState<TipoReporte>('cliente');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos
  const [reporteClientes, setReporteClientes] = useState<ReporteMoraPorCliente[]>([]);
  const [reportePeriodo, setReportePeriodo] = useState<ReporteMoraPorPeriodo[]>([]);
  const [reporteDetallado, setReporteDetallado] = useState<ReporteMoraDetallado[]>([]);
  const [topClientes, setTopClientes] = useState<ReporteMoraPorCliente[]>([]);
  const [efectividad, setEfectividad] = useState<EstadisticasEfectividad | null>(null);

  // Filtros de fecha
  const [fechaInicio, setFechaInicio] = useState(() => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - 6); // 6 meses atrás
    return fecha.toISOString().split('T')[0];
  });
  const [fechaFin, setFechaFin] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Cargar reporte inicial
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
          setTopClientes(top);
          const efe = await reportesService.obtenerEfectividadCobro();
          setEfectividad(efe);
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
        datos = topClientes;
        nombre = 'top-clientes-mora';
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
    <div className="reportes-container">
      {/* Header */}
      <div className="reportes-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          <ArrowLeft size={20} />
          Volver
        </button>
        <div className="header-content">
          <div className="header-icon">
            <FileText size={32} />
          </div>
          <div>
            <h1 className="header-title">Reportes de Mora</h1>
            <p className="header-subtitle">Análisis y exportación de datos</p>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={cargarReporte} className="btn-refresh" disabled={isLoading}>
            <RefreshCw size={18} className={isLoading ? 'spinning' : ''} />
            Actualizar
          </button>
          <button onClick={exportarReporte} className="btn-export">
            <Download size={18} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Selector de Tipo de Reporte */}
      <div className="selector-reportes">
        <button
          className={`selector-btn ${tipoReporte === 'cliente' ? 'active' : ''}`}
          onClick={() => setTipoReporte('cliente')}
        >
          <Users size={20} />
          <span>Por Cliente</span>
        </button>
        <button
          className={`selector-btn ${tipoReporte === 'periodo' ? 'active' : ''}`}
          onClick={() => setTipoReporte('periodo')}
        >
          <Calendar size={20} />
          <span>Por Período</span>
        </button>
        <button
          className={`selector-btn ${tipoReporte === 'detallado' ? 'active' : ''}`}
          onClick={() => setTipoReporte('detallado')}
        >
          <FileText size={20} />
          <span>Detallado</span>
        </button>
        <button
          className={`selector-btn ${tipoReporte === 'top' ? 'active' : ''}`}
          onClick={() => setTipoReporte('top')}
        >
          <TrendingUp size={20} />
          <span>Top Clientes</span>
        </button>
      </div>

      {/* Filtros de Período */}
      {tipoReporte === 'periodo' && (
        <div className="filtros-periodo">
          <div className="filtro-field">
            <label>Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="filtro-field">
            <label>Fecha Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="date-input"
            />
          </div>
          <button onClick={cargarReporte} className="btn-aplicar">
            Aplicar Filtros
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando reporte...</p>
        </div>
      )}

      {/* Contenido del Reporte */}
      {!isLoading && !error && (
        <div className="reporte-content">
          {/* Reporte por Cliente */}
          {tipoReporte === 'cliente' && (
            <>
              {/* Gráfica de Clientes */}
              <GraficasMora
                reporteClientes={reporteClientes}
                tipo="clientes"
              />
              
              <div className="tabla-container">
              <h3>Reporte de Mora por Cliente ({reporteClientes.length})</h3>
              <div className="tabla-wrapper">
                <table className="tabla-reporte">
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

          {/* Reporte por Período */}
          {tipoReporte === 'periodo' && (
            <>
              {/* Gráficas de Período */}
              <GraficasMora
                reportePeriodo={reportePeriodo}
                tipo="tendencia"
              />
              
              <GraficasMora
                reportePeriodo={reportePeriodo}
                tipo="efectividad"
              />
              
              <div className="tabla-container">
              <h3>Reporte de Mora por Período ({reportePeriodo.length} meses)</h3>
              <div className="tabla-wrapper">
                <table className="tabla-reporte">
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
                          <span className="badge badge-success">
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

          {/* Reporte Detallado */}
          {tipoReporte === 'detallado' && (
            <div className="tabla-container">
              <h3>Reporte Detallado de Mora ({reporteDetallado.length} cuotas)</h3>
              <div className="tabla-wrapper">
                <table className="tabla-reporte">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Lote</th>
                      <th>Cuota #</th>
                      <th>Valor</th>
                      <th>Días Mora</th>
                      <th>Mora</th>
                      <th>Pendiente</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporteDetallado.map((cuota) => (
                      <tr key={cuota.cuotaUid}>
                        <td>{cuota.clienteNombre}</td>
                        <td>{cuota.lotecodigo}</td>
                        <td>#{cuota.numeroCuota}</td>
                        <td>{formatCurrency(cuota.valorCuota)}</td>
                        <td>
                          <span className="badge badge-danger">
                            {cuota.diasMora} días
                          </span>
                        </td>
                        <td className="text-danger">{formatCurrency(cuota.montoMora)}</td>
                        <td className="text-warning">{formatCurrency(cuota.moraPendiente)}</td>
                        <td>
                          <span className={`badge badge-${cuota.estado}`}>
                            {cuota.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Top Clientes */}
          {tipoReporte === 'top' && (
            <>
              {/* Estadísticas de Efectividad */}
              {efectividad && (
                <div className="efectividad-card">
                  <h3>Efectividad de Cobro de Mora</h3>
                  <div className="efectividad-grid">
                    <div className="efectividad-item">
                      <span className="label">Mora Generada</span>
                      <span className="valor danger">{formatCurrency(efectividad.moraGeneradaTotal)}</span>
                    </div>
                    <div className="efectividad-item">
                      <span className="label">Mora Cobrada</span>
                      <span className="valor success">{formatCurrency(efectividad.moraCobradaTotal)}</span>
                    </div>
                    <div className="efectividad-item">
                      <span className="label">Mora Pendiente</span>
                      <span className="valor warning">{formatCurrency(efectividad.moraPendienteTotal)}</span>
                    </div>
                    <div className="efectividad-item highlight">
                      <span className="label">Efectividad</span>
                      <span className="valor">{efectividad.porcentajeEfectividad.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Top 10 Clientes */}
              <div className="tabla-container">
                <h3>Top 10 Clientes con Mayor Mora</h3>
                <div className="tabla-wrapper">
                  <table className="tabla-reporte">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Cuotas</th>
                        <th>Mora Pendiente</th>
                        <th>Días Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topClientes.map((cliente, index) => (
                        <tr key={cliente.clienteUid}>
                          <td>
                            <span className="ranking">{index + 1}</span>
                          </td>
                          <td>{cliente.clienteNombre}</td>
                          <td>{cliente.totalCuotasConMora}</td>
                          <td className="text-danger font-bold">
                            {formatCurrency(cliente.moraPendiente)}
                          </td>
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
