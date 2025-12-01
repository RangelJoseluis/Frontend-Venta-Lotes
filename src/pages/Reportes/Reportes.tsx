// Componente Reportes - Versión Modular
// Orquesta todos los componentes de reportes y estadísticas
import { useState, useEffect } from 'react';
import { BarChart3, History, TrendingUp, Search } from 'lucide-react';
import Sidebar from '../Dashboard/components/Sidebar/Sidebar';
import LoadingSpinner from '../Dashboard/components/UI/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import TabEstadisticas from './components/TabEstadisticas/TabEstadisticas';
import TabHistorial from './components/TabHistorial/TabHistorial';
import TabCobranza from './components/TabCobranza/TabCobranza';
import TabAlertas from './components/TabAlertas/TabAlertas';
import { useReportesData } from './hooks/useReportesData';
import { useHistorialLote } from './hooks/useHistorialLote';
import { TABS } from './constants';
import type { TabType } from './types';

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
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Contenido Principal */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Página de Reportes */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {/* Header de Reportes */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={32} className="text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                Reportes y Estadísticas
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Análisis detallado del sistema de venta de lotes
            </p>
          </div>

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <LoadingSpinner />
              <p className="mt-4 text-slate-500 dark:text-slate-400">Cargando reportes...</p>
            </div>
          ) : (
            <>
              {/* Pestañas de Navegación */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${activeTab === TABS.ESTADISTICAS
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  onClick={() => setActiveTab(TABS.ESTADISTICAS as TabType)}
                >
                  <BarChart3 size={18} />
                  <span>Estadísticas Generales</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${activeTab === TABS.HISTORIAL
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  onClick={() => setActiveTab(TABS.HISTORIAL as TabType)}
                >
                  <History size={18} />
                  <span>Historial de Lotes</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${activeTab === TABS.COBRANZA
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  onClick={() => setActiveTab(TABS.COBRANZA as TabType)}
                >
                  <TrendingUp size={18} />
                  <span>Análisis de Cobranza</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${activeTab === TABS.ALERTAS
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  onClick={() => setActiveTab(TABS.ALERTAS as TabType)}
                >
                  <Search size={18} />
                  <span>Alertas y Vencimientos</span>
                </button>
              </div>

              {/* Contenido de las Pestañas */}
              <div>
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
        </main>
      </div>
    </div>
  );
};

export default Reportes;
