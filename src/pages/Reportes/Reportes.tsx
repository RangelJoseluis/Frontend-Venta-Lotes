// Componente Reportes - Versión Modular
// Orquesta todos los componentes de reportes y estadísticas
import { useState, useEffect } from 'react';
import { BarChart3, History, TrendingUp, Search } from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import Header from '../components/Dashboard/Header/Header';
import LoadingSpinner from '../components/Dashboard/UI/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import TabEstadisticas from './components/TabEstadisticas/TabEstadisticas';
import TabHistorial from './components/TabHistorial/TabHistorial';
import TabCobranza from './components/TabCobranza/TabCobranza';
import TabAlertas from './components/TabAlertas/TabAlertas';
import { useReportesData } from './hooks/useReportesData';
import { useHistorialLote } from './hooks/useHistorialLote';
import { TABS } from './constants';
import type { TabType } from './types';
import './Reportes.css';

const Reportes = () => {
  // ============================================================================
  // ESTADO UI
  // ============================================================================
  const [activeTab, setActiveTab] = useState<TabType>('estadisticas');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? saved === 'true' : window.innerWidth >= 1024;
    }
    return true;
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // ============================================================================
  // CUSTOM HOOKS
  // ============================================================================
  // Hook para cargar todas las estadísticas
  const {
    loading,
    error,
    statsVentas,
    statsCuotas,
    statsPagos,
    statsLotes,
    lotes,
    cuotasVencidas,
    cuotasProximasVencer,
  } = useReportesData();

  // Hook para manejar el historial de lotes
  const {
    loteSeleccionado,
    historialLote,
    loadingHistorial,
    handleLoteChange,
  } = useHistorialLote();

  // ============================================================================
  // EFECTOS
  // ============================================================================
  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  // ============================================================================
  // RENDERIZADO
  // ============================================================================
  return (
    <div className="reportes-container">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido Principal */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Header */}
        <Header
          setSidebarOpen={setSidebarOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
        />

        {/* Página de Reportes */}
        <main className="reportes-main">
          <div className="reportes-content">
            {/* Header de Reportes */}
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

            {/* Error Message */}
            {error && <ErrorMessage message={error} />}

            {/* Loading State */}
            {loading ? (
              <div className="loading-container">
                <LoadingSpinner />
                <p>Cargando reportes...</p>
              </div>
            ) : (
              <>
                {/* Pestañas de Navegación */}
                <div className="reportes-tabs">
                  <button
                    className={`tab-button ${activeTab === TABS.ESTADISTICAS ? 'active' : ''}`}
                    onClick={() => setActiveTab(TABS.ESTADISTICAS as TabType)}
                  >
                    <BarChart3 size={20} />
                    Estadísticas Generales
                  </button>
                  <button
                    className={`tab-button ${activeTab === TABS.HISTORIAL ? 'active' : ''}`}
                    onClick={() => setActiveTab(TABS.HISTORIAL as TabType)}
                  >
                    <History size={20} />
                    Historial de Lotes
                  </button>
                  <button
                    className={`tab-button ${activeTab === TABS.COBRANZA ? 'active' : ''}`}
                    onClick={() => setActiveTab(TABS.COBRANZA as TabType)}
                  >
                    <TrendingUp size={20} />
                    Análisis de Cobranza
                  </button>
                  <button
                    className={`tab-button ${activeTab === TABS.ALERTAS ? 'active' : ''}`}
                    onClick={() => setActiveTab(TABS.ALERTAS as TabType)}
                  >
                    <Search size={20} />
                    Alertas y Vencimientos
                  </button>
                </div>

                {/* Contenido de las Pestañas */}
                <div className="tab-content">
                  {/* Tab Estadísticas */}
                  {activeTab === TABS.ESTADISTICAS && (
                    <TabEstadisticas
                      statsVentas={statsVentas}
                      statsCuotas={statsCuotas}
                      statsPagos={statsPagos}
                      statsLotes={statsLotes}
                    />
                  )}

                  {/* Tab Historial */}
                  {activeTab === TABS.HISTORIAL && (
                    <TabHistorial
                      lotes={lotes}
                      loteSeleccionado={loteSeleccionado}
                      historialLote={historialLote}
                      loadingHistorial={loadingHistorial}
                      onLoteChange={handleLoteChange}
                    />
                  )}

                  {/* Tab Cobranza */}
                  {activeTab === TABS.COBRANZA && (
                    <TabCobranza
                      statsPagos={statsPagos}
                      statsCuotas={statsCuotas}
                    />
                  )}

                  {/* Tab Alertas */}
                  {activeTab === TABS.ALERTAS && (
                    <TabAlertas
                      cuotasVencidas={cuotasVencidas}
                      cuotasProximasVencer={cuotasProximasVencer}
                      statsCuotas={statsCuotas}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reportes;
