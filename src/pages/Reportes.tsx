import { useState, useEffect } from 'react';
import { BarChart3, History, TrendingUp, AlertCircle, Search } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from './components/Dashboard/Sidebar/Sidebar';
import Header from './components/Dashboard/Header/Header';
import LoadingSpinner from './components/Dashboard/UI/LoadingSpinner';
import estadisticasVentasService from '../services/estadisticas-ventas.service';
import estadisticasCuotasService from '../services/estadisticas-cuotas.service';
import estadisticasPagosService from '../services/estadisticas-pagos.service';
import lotesHistorialService from '../services/lotes-historial.service';
import { lotesService } from '../services/lotes.service';
import { getErrorMessage } from '../services/http.service';
import './Reportes.css';
import type { EstadisticasVentas } from '../services/estadisticas-ventas.service';
import type { EstadisticasCuotas, CuotaVencida, CuotaProximaVencer } from '../services/estadisticas-cuotas.service';
import type { EstadisticasPagos } from '../services/estadisticas-pagos.service';
import type { CambioEstadoLote } from '../services/lotes-historial.service';
import type { EstadisticasLotes, Lote } from '../types';

type TabType = 'estadisticas' | 'historial' | 'cobranza' | 'alertas';

const Reportes = () => {
  // ============================================================================
  // ESTADO
  // ============================================================================
  const [activeTab, setActiveTab] = useState<TabType>('estadisticas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? saved === 'true' : window.innerWidth >= 1024;
    }
    return true;
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Estadísticas
  const [statsVentas, setStatsVentas] = useState<EstadisticasVentas | null>(null);
  const [statsCuotas, setStatsCuotas] = useState<EstadisticasCuotas | null>(null);
  const [statsPagos, setStatsPagos] = useState<EstadisticasPagos | null>(null);
  const [statsLotes, setStatsLotes] = useState<EstadisticasLotes | null>(null);
  
  // Datos para pestañas
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loteSeleccionado, setLoteSeleccionado] = useState<string>('');
  const [historialLote, setHistorialLote] = useState<CambioEstadoLote[]>([]);
  const [cuotasVencidas, setCuotasVencidas] = useState<CuotaVencida[]>([]);
  const [cuotasProximasVencer, setCuotasProximasVencer] = useState<CuotaProximaVencer[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);
  const [busquedaLote, setBusquedaLote] = useState('');

  // ============================================================================
  // EFECTOS
  // ============================================================================
  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  /**
   * Cargar todas las estadísticas y datos
   */
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Cargando estadísticas para reportes...');

        const [dataVentas, dataCuotas, dataPagos, dataLotes, dataLotesLista, dataVencidas, dataProximas] = await Promise.all([
          estadisticasVentasService.obtenerEstadisticas(),
          estadisticasCuotasService.obtenerEstadisticas(),
          estadisticasPagosService.obtenerEstadisticasAnioActual(),
          lotesService.getEstadisticas(),
          lotesService.obtenerTodos(),
          estadisticasCuotasService.obtenerCuotasVencidas(),
          estadisticasCuotasService.obtenerCuotasProximasVencer(7)
        ]);

        console.log('✅ Estadísticas cargadas:', {
          ventas: dataVentas,
          cuotas: dataCuotas,
          pagos: dataPagos,
          lotes: dataLotes,
          lotesLista: dataLotesLista,
          vencidas: dataVencidas,
          proximas: dataProximas
        });

        setStatsVentas(dataVentas);
        setStatsCuotas(dataCuotas);
        setStatsPagos(dataPagos);
        setStatsLotes(dataLotes);
        setLotes(dataLotesLista);
        setCuotasVencidas(dataVencidas);
        setCuotasProximasVencer(dataProximas);
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        setError(errorMsg);
        console.error('❌ Error al cargar estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  // ============================================================================
  // FUNCIONES AUXILIARES
  // ============================================================================
  const formatCurrency = (value: number): string => {
    // Formatear número con separadores de miles
    const formatted = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    
    // Retornar con símbolo de peso colombiano explícito
    return `$ ${formatted}`;
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  /**
   * Cargar historial de cambios de un lote específico
   */
  const cargarHistorialLote = async (loteUid: string) => {
    if (!loteUid) {
      setHistorialLote([]);
      return;
    }

    try {
      setLoadingHistorial(true);
      console.log('🔄 Cargando historial del lote:', loteUid);
      
      const historial = await lotesHistorialService.obtenerHistorialPorLote(loteUid);
      
      console.log('✅ Historial cargado:', historial);
      setHistorialLote(historial);
    } catch (err) {
      console.error('❌ Error al cargar historial:', err);
      setHistorialLote([]);
    } finally {
      setLoadingHistorial(false);
    }
  };

  /**
   * Manejar cambio de lote seleccionado
   */
  const handleLoteChange = (loteUid: string) => {
    setLoteSeleccionado(loteUid);
    cargarHistorialLote(loteUid);
  };

  /**
   * Filtrar lotes por búsqueda
   */
  const lotesFiltrados = lotes.filter(lote => 
    lote.codigo.toLowerCase().includes(busquedaLote.toLowerCase())
  );

  // ============================================================================
  // RENDERIZADO CONDICIONAL
  // ============================================================================
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Error al cargar datos</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================
  return (
    <div className="reportes-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header
          setSidebarOpen={setSidebarOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
        />

        <main className="reportes-main">
          <div className="reportes-content">
            {/* Header */}
            <div className="reportes-header">
              <div>
                <h1 className="reportes-title">
                  <BarChart3 size={32} />
                  Reportes y Estadísticas
                </h1>
                <p className="reportes-subtitle">
                  Análisis detallado del sistema de venta de lotes
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="reportes-tabs">
              <button
                className={`tab-button ${activeTab === 'estadisticas' ? 'active' : ''}`}
                onClick={() => setActiveTab('estadisticas')}
              >
                <BarChart3 size={20} />
                Estadísticas Generales
              </button>
              <button
                className={`tab-button ${activeTab === 'historial' ? 'active' : ''}`}
                onClick={() => setActiveTab('historial')}
              >
                <History size={20} />
                Historial de Lotes
              </button>
              <button
                className={`tab-button ${activeTab === 'cobranza' ? 'active' : ''}`}
                onClick={() => setActiveTab('cobranza')}
              >
                <TrendingUp size={20} />
                Análisis de Cobranza
              </button>
              <button
                className={`tab-button ${activeTab === 'alertas' ? 'active' : ''}`}
                onClick={() => setActiveTab('alertas')}
              >
                <AlertCircle size={20} />
                Alertas y Vencimientos
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* ESTADÍSTICAS GENERALES */}
              {activeTab === 'estadisticas' && (
                <div className="estadisticas-section">
                  <h2 className="section-title">Estadísticas Generales</h2>

                  {/* Grid de estadísticas */}
                  <div className="stats-grid-reportes">
                    {/* Ventas */}
                    <div className="stat-card stat-card-ventas">
                      <div className="stat-header">
                        <h3>📈 Ventas</h3>
                      </div>
                      <div className="stat-body">
                        <div className="stat-row">
                          <span>Total Ventas:</span>
                          <strong>{statsVentas?.totalVentas || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Monto Total:</span>
                          <strong>{formatCurrency(statsVentas?.montoTotalVentas || 0)}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Promedio:</span>
                          <strong>{formatCurrency(statsVentas?.montoPromedioPorVenta || 0)}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Activas:</span>
                          <strong>{statsVentas?.ventasActivas || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Completadas:</span>
                          <strong>{statsVentas?.ventasCompletadas || 0}</strong>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-row">
                          <span>Contado:</span>
                          <strong>{statsVentas?.ventasPorModalidad.contado || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Cuotas:</span>
                          <strong>{statsVentas?.ventasPorModalidad.cuotas || 0}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Cuotas */}
                    <div className="stat-card stat-card-cuotas">
                      <div className="stat-header">
                        <h3>💰 Cuotas</h3>
                      </div>
                      <div className="stat-body">
                        <div className="stat-row">
                          <span>Total Cuotas:</span>
                          <strong>{statsCuotas?.totalCuotas || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Pendientes:</span>
                          <strong className="text-warning">{statsCuotas?.cuotasPendientes || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Pagadas:</span>
                          <strong className="text-success">{statsCuotas?.cuotasPagadas || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Vencidas:</span>
                          <strong className="text-danger">{statsCuotas?.cuotasVencidas || 0}</strong>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-row">
                          <span>Monto Total:</span>
                          <strong>{formatCurrency(statsCuotas?.montoTotalCuotas || 0)}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Monto Pagado:</span>
                          <strong className="text-success">{formatCurrency(statsCuotas?.montoTotalPagado || 0)}</strong>
                        </div>
                        <div className="stat-row">
                          <span>% Cobranza:</span>
                          <strong className="text-primary">{formatPercentage(statsCuotas?.porcentajeCobranza || 0)}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Pagos */}
                    <div className="stat-card stat-card-pagos">
                      <div className="stat-header">
                        <h3>💵 Pagos (Año Actual)</h3>
                      </div>
                      <div className="stat-body">
                        <div className="stat-row">
                          <span>Total Pagos:</span>
                          <strong>{statsPagos?.totalPagos || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Monto Total:</span>
                          <strong>{formatCurrency(statsPagos?.montoTotalPagos || 0)}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Promedio:</span>
                          <strong>{formatCurrency(statsPagos?.promedioMontoPago || 0)}</strong>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-row">
                          <span>Efectivo:</span>
                          <strong>{statsPagos?.pagosPorMetodo.efectivo || 0} ({formatCurrency(statsPagos?.montosPorMetodo.efectivo || 0)})</strong>
                        </div>
                        <div className="stat-row">
                          <span>Transferencia:</span>
                          <strong>{statsPagos?.pagosPorMetodo.transferencia || 0} ({formatCurrency(statsPagos?.montosPorMetodo.transferencia || 0)})</strong>
                        </div>
                        <div className="stat-row">
                          <span>Cheque:</span>
                          <strong>{statsPagos?.pagosPorMetodo.cheque || 0} ({formatCurrency(statsPagos?.montosPorMetodo.cheque || 0)})</strong>
                        </div>
                      </div>
                    </div>

                    {/* Lotes */}
                    <div className="stat-card stat-card-lotes">
                      <div className="stat-header">
                        <h3>🏘️ Lotes</h3>
                      </div>
                      <div className="stat-body">
                        <div className="stat-row">
                          <span>Total Lotes:</span>
                          <strong>{statsLotes?.totalLotes || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Disponibles:</span>
                          <strong className="text-success">{statsLotes?.disponibles || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>En Cuotas:</span>
                          <strong className="text-warning">{statsLotes?.enCuotas || 0}</strong>
                        </div>
                        <div className="stat-row">
                          <span>Vendidos:</span>
                          <strong className="text-primary">{statsLotes?.vendidos || 0}</strong>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-row">
                          <span>Superficie Total:</span>
                          <strong>{statsLotes?.superficieTotal || 0} m²</strong>
                        </div>
                        <div className="stat-row">
                          <span>Valor Total:</span>
                          <strong>{formatCurrency(statsLotes?.valorTotal || 0)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* HISTORIAL DE LOTES */}
              {activeTab === 'historial' && (
                <div className="historial-section">
                  <h2 className="section-title">Historial de Cambios de Lote</h2>

                  {/* Selector de Lote */}
                  <div className="historial-selector-container">
                    <div className="selector-header">
                      <h3 className="selector-title">
                        <Search size={20} />
                        Seleccionar Lote
                      </h3>
                      <p className="selector-subtitle">
                        Busca y selecciona un lote para ver su historial de cambios
                      </p>
                    </div>

                    <div className="selector-content">
                      {/* Buscador */}
                      <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                          type="text"
                          placeholder="Buscar por código de lote..."
                          value={busquedaLote}
                          onChange={(e) => setBusquedaLote(e.target.value)}
                          className="search-input"
                        />
                      </div>

                      {/* Selector de Lote */}
                      <div className="lote-select-wrapper">
                        <select
                          value={loteSeleccionado}
                          onChange={(e) => handleLoteChange(e.target.value)}
                          className="lote-select"
                        >
                          <option value="">-- Selecciona un lote --</option>
                          {lotesFiltrados.map((lote) => (
                            <option key={lote.uid} value={lote.uid}>
                              {lote.codigo} - {lote.estado} - {formatCurrency((lote as any).precioLista || lote.precio || 0)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Información del lote seleccionado */}
                      {loteSeleccionado && lotes.find(l => l.uid === loteSeleccionado) && (
                        <div className="lote-info-card">
                          {(() => {
                            const lote = lotes.find(l => l.uid === loteSeleccionado);
                            // Mapear propiedades del backend a las esperadas
                            const superficie = (lote as any)?.superficieM2 || lote?.superficie || 0;
                            const precio = (lote as any)?.precioLista || lote?.precio || 0;
                            
                            return (
                              <>
                                <div className="lote-info-item">
                                  <span className="label">Código:</span>
                                  <span className="value">{lote?.codigo}</span>
                                </div>
                                <div className="lote-info-item">
                                  <span className="label">Estado:</span>
                                  <span className={`badge badge-${lote?.estado.toLowerCase()}`}>
                                    {lote?.estado}
                                  </span>
                                </div>
                                <div className="lote-info-item">
                                  <span className="label">Superficie:</span>
                                  <span className="value">{superficie} m²</span>
                                </div>
                                <div className="lote-info-item">
                                  <span className="label">Precio:</span>
                                  <span className="value">{formatCurrency(precio)}</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tabla de Historial */}
                  {loteSeleccionado && (
                    <div className="historial-tabla-container">
                      <div className="tabla-header">
                        <h3 className="tabla-title">
                          <History size={24} />
                          Historial de Cambios ({historialLote.length})
                        </h3>
                      </div>

                      {loadingHistorial ? (
                        <div className="loading-state">
                          <div className="spinner"></div>
                          <p>Cargando historial...</p>
                        </div>
                      ) : historialLote.length === 0 ? (
                        <div className="empty-state">
                          <div className="empty-icon">📋</div>
                          <h4>Sin cambios registrados</h4>
                          <p>Este lote no tiene cambios de estado registrados en el sistema</p>
                        </div>
                      ) : (
                        <div className="tabla-scroll">
                          <table className="historial-tabla">
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Estado Anterior</th>
                                <th>Estado Nuevo</th>
                                <th>Motivo</th>
                                <th>Usuario</th>
                                <th>Observaciones</th>
                                <th>Requiere Aprobación</th>
                              </tr>
                            </thead>
                            <tbody>
                              {historialLote.map((cambio) => (
                                <tr key={cambio.uid}>
                                  <td>
                                    <div className="fecha-info">
                                      <strong>
                                        {new Date(cambio.fechaCambio).toLocaleDateString('es-CO', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric'
                                        })}
                                      </strong>
                                      <span className="hora">
                                        {new Date(cambio.fechaCambio).toLocaleTimeString('es-CO', {
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <span className={`estado-badge estado-${cambio.estadoAnterior.toLowerCase()}`}>
                                      {cambio.estadoAnterior}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={`estado-badge estado-${cambio.estadoNuevo.toLowerCase()}`}>
                                      {cambio.estadoNuevo}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="motivo-text">{cambio.motivo}</span>
                                  </td>
                                  <td>
                                    <span className="usuario-text">
                                      {cambio.usuarioEmail || 'Sistema'}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="observaciones-text">
                                      {cambio.observaciones || '-'}
                                    </span>
                                  </td>
                                  <td>
                                    {cambio.requiereAprobacionEspecial ? (
                                      <span className="aprobacion-badge aprobacion-si">Sí</span>
                                    ) : (
                                      <span className="aprobacion-badge aprobacion-no">No</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mensaje cuando no hay lote seleccionado */}
                  {!loteSeleccionado && (
                    <div className="no-selection-state">
                      <div className="no-selection-icon">🔍</div>
                      <h3>Selecciona un lote</h3>
                      <p>Elige un lote del selector para ver su historial completo de cambios de estado</p>
                    </div>
                  )}
                </div>
              )}

              {/* ANÁLISIS DE COBRANZA */}
              {activeTab === 'cobranza' && (
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
                              data={[
                                { name: 'Efectivo', value: statsPagos?.pagosPorMetodo.efectivo || 0, color: '#10b981' },
                                { name: 'Transferencia', value: statsPagos?.pagosPorMetodo.transferencia || 0, color: '#3b82f6' },
                                { name: 'Cheque', value: statsPagos?.pagosPorMetodo.cheque || 0, color: '#f59e0b' },
                                { name: 'Tarjeta', value: statsPagos?.pagosPorMetodo.tarjeta || 0, color: '#8b5cf6' },
                              ].filter(item => item.value > 0)}
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
                              {[
                                { name: 'Efectivo', value: statsPagos?.pagosPorMetodo.efectivo || 0, color: '#10b981' },
                                { name: 'Transferencia', value: statsPagos?.pagosPorMetodo.transferencia || 0, color: '#3b82f6' },
                                { name: 'Cheque', value: statsPagos?.pagosPorMetodo.cheque || 0, color: '#f59e0b' },
                                { name: 'Tarjeta', value: statsPagos?.pagosPorMetodo.tarjeta || 0, color: '#8b5cf6' },
                              ].filter(item => item.value > 0).map((entry, index) => (
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
                          <BarChart
                            data={[
                              { metodo: 'Efectivo', monto: statsPagos?.montosPorMetodo.efectivo || 0 },
                              { metodo: 'Transferencia', monto: statsPagos?.montosPorMetodo.transferencia || 0 },
                              { metodo: 'Cheque', monto: statsPagos?.montosPorMetodo.cheque || 0 },
                              { metodo: 'Tarjeta', monto: statsPagos?.montosPorMetodo.tarjeta || 0 },
                            ].filter(item => item.monto > 0)}
                          >
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
                      {/* Efectivo */}
                      <div className="metodo-card metodo-efectivo">
                        <div className="metodo-header">
                          <div className="metodo-icon">💵</div>
                          <h4>Efectivo</h4>
                        </div>
                        <div className="metodo-stats">
                          <div className="stat-item">
                            <span className="stat-label">Cantidad:</span>
                            <span className="stat-value">{statsPagos?.pagosPorMetodo.efectivo || 0} pagos</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Monto Total:</span>
                            <span className="stat-value">{formatCurrency(statsPagos?.montosPorMetodo.efectivo || 0)}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Promedio:</span>
                            <span className="stat-value">
                              {formatCurrency(
                                (statsPagos?.pagosPorMetodo.efectivo || 0) > 0
                                  ? (statsPagos?.montosPorMetodo.efectivo || 0) / (statsPagos?.pagosPorMetodo.efectivo || 1)
                                  : 0
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transferencia */}
                      <div className="metodo-card metodo-transferencia">
                        <div className="metodo-header">
                          <div className="metodo-icon">🏦</div>
                          <h4>Transferencia</h4>
                        </div>
                        <div className="metodo-stats">
                          <div className="stat-item">
                            <span className="stat-label">Cantidad:</span>
                            <span className="stat-value">{statsPagos?.pagosPorMetodo.transferencia || 0} pagos</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Monto Total:</span>
                            <span className="stat-value">{formatCurrency(statsPagos?.montosPorMetodo.transferencia || 0)}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Promedio:</span>
                            <span className="stat-value">
                              {formatCurrency(
                                (statsPagos?.pagosPorMetodo.transferencia || 0) > 0
                                  ? (statsPagos?.montosPorMetodo.transferencia || 0) / (statsPagos?.pagosPorMetodo.transferencia || 1)
                                  : 0
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Cheque */}
                      <div className="metodo-card metodo-cheque">
                        <div className="metodo-header">
                          <div className="metodo-icon">📝</div>
                          <h4>Cheque</h4>
                        </div>
                        <div className="metodo-stats">
                          <div className="stat-item">
                            <span className="stat-label">Cantidad:</span>
                            <span className="stat-value">{statsPagos?.pagosPorMetodo.cheque || 0} pagos</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Monto Total:</span>
                            <span className="stat-value">{formatCurrency(statsPagos?.montosPorMetodo.cheque || 0)}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Promedio:</span>
                            <span className="stat-value">
                              {formatCurrency(
                                (statsPagos?.pagosPorMetodo.cheque || 0) > 0
                                  ? (statsPagos?.montosPorMetodo.cheque || 0) / (statsPagos?.pagosPorMetodo.cheque || 1)
                                  : 0
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tarjeta */}
                      {(statsPagos?.pagosPorMetodo.tarjeta || 0) > 0 && (
                        <div className="metodo-card metodo-tarjeta">
                          <div className="metodo-header">
                            <div className="metodo-icon">💳</div>
                            <h4>Tarjeta</h4>
                          </div>
                          <div className="metodo-stats">
                            <div className="stat-item">
                              <span className="stat-label">Cantidad:</span>
                              <span className="stat-value">{statsPagos?.pagosPorMetodo.tarjeta || 0} pagos</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Monto Total:</span>
                              <span className="stat-value">{formatCurrency(statsPagos?.montosPorMetodo.tarjeta || 0)}</span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Promedio:</span>
                              <span className="stat-value">
                                {formatCurrency(
                                  (statsPagos?.pagosPorMetodo.tarjeta || 0) > 0
                                    ? (statsPagos?.montosPorMetodo.tarjeta || 0) / (statsPagos?.pagosPorMetodo.tarjeta || 1)
                                    : 0
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Indicadores de Cobranza */}
                  <div className="cobranza-indicadores">
                    <div className="indicador-card">
                      <h4>Estado de Cuotas</h4>
                      <div className="indicador-content">
                        <div className="indicador-item">
                          <span className="indicador-label">Total Cuotas:</span>
                          <span className="indicador-valor">{statsCuotas?.totalCuotas || 0}</span>
                        </div>
                        <div className="indicador-item">
                          <span className="indicador-label">Pagadas:</span>
                          <span className="indicador-valor indicador-success">{statsCuotas?.cuotasPagadas || 0}</span>
                        </div>
                        <div className="indicador-item">
                          <span className="indicador-label">Pendientes:</span>
                          <span className="indicador-valor indicador-warning">{statsCuotas?.cuotasPendientes || 0}</span>
                        </div>
                        <div className="indicador-item">
                          <span className="indicador-label">Vencidas:</span>
                          <span className="indicador-valor indicador-danger">{statsCuotas?.cuotasVencidas || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="indicador-card">
                      <h4>Montos</h4>
                      <div className="indicador-content">
                        <div className="indicador-item">
                          <span className="indicador-label">Total a Cobrar:</span>
                          <span className="indicador-valor">{formatCurrency(statsCuotas?.montoTotalCuotas || 0)}</span>
                        </div>
                        <div className="indicador-item">
                          <span className="indicador-label">Cobrado:</span>
                          <span className="indicador-valor indicador-success">{formatCurrency(statsCuotas?.montoTotalPagado || 0)}</span>
                        </div>
                        <div className="indicador-item">
                          <span className="indicador-label">Pendiente:</span>
                          <span className="indicador-valor indicador-warning">{formatCurrency(statsCuotas?.montoTotalPendiente || 0)}</span>
                        </div>
                        <div className="indicador-item">
                          <span className="indicador-label">Eficiencia:</span>
                          <span className="indicador-valor indicador-primary">{formatPercentage(statsCuotas?.porcentajeCobranza || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ALERTAS Y VENCIMIENTOS */}
              {activeTab === 'alertas' && (
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
                        <h3>{formatCurrency(cuotasVencidas.reduce((sum, c) => sum + c.montoPendiente, 0))}</h3>
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
                                  <td>
                                    {new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </td>
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
                                  <td>
                                    {new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </td>
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reportes;
