import { useState, useEffect } from 'react';
import Sidebar from './components/Dashboard/Sidebar/Sidebar';
import Header from './components/Dashboard/Header/Header';
import StatsGrid from './components/Dashboard/StatsGrid/StatsGrid';
import ValueDistribution from './components/Dashboard/ValueDistribution/ValueDistribution';
import QuickActions from './components/Dashboard/QuickActions/QuickActions';
import RecentActivity from './components/Dashboard/RecentActivity/RecentActivity';
import ImportantAlerts from './components/Dashboard/ImportantAlerts/ImportantAlerts';
import MoraWidget from './components/Dashboard/MoraWidget/MoraWidget';
import LoadingSpinner from './components/Dashboard/UI/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { lotesService } from '../services/lotes.service';
import estadisticasVentasService from '../services/estadisticas-ventas.service';
import estadisticasCuotasService from '../services/estadisticas-cuotas.service';
import estadisticasPagosService from '../services/estadisticas-pagos.service';
import { getErrorMessage } from '../services/http.service';
import './Dashboard.css';
import type { EstadisticasLotes } from '../types';
import type { EstadisticasVentas } from '../services/estadisticas-ventas.service';
import type { EstadisticasCuotas } from '../services/estadisticas-cuotas.service';

const Dashboard = () => {
  const [stats, setStats] = useState<EstadisticasLotes | null>(null);
  const [statsVentas, setStatsVentas] = useState<EstadisticasVentas | null>(null);
  const [statsCuotas, setStatsCuotas] = useState<EstadisticasCuotas | null>(null);
  // const [statsPagos, setStatsPagos] = useState<EstadisticasPagos | null>(null);
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

  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  /**
   * Cargar todas las estadísticas desde el backend
   */
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Cargando estadísticas del backend...');
        console.log('🔑 Token:', localStorage.getItem('accessToken') ? 'Presente' : 'NO PRESENTE');
        
        // Cargar estadísticas en paralelo
        const [dataLotes, dataVentas, dataCuotas, dataPagos] = await Promise.all([
          lotesService.getEstadisticas(),
          estadisticasVentasService.obtenerEstadisticas(),
          estadisticasCuotasService.obtenerEstadisticas(),
          estadisticasPagosService.obtenerEstadisticasMesActual()
        ]);
        
        console.log('✅ Todas las estadísticas cargadas:', {
          lotes: dataLotes,
          ventas: dataVentas,
          cuotas: dataCuotas,
          pagos: dataPagos
        });
        
        setStats(dataLotes);
        setStatsVentas(dataVentas);
        setStatsCuotas(dataCuotas);
        // setStatsPagos(dataPagos);
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        setError(errorMsg);
        console.error('❌ Error al cargar estadísticas:', err);
        console.error('📋 Detalles del error:', {
          message: errorMsg,
          error: err
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header
          setSidebarOpen={setSidebarOpen}
          userMenuOpen={userMenuOpen}
          setUserMenuOpen={setUserMenuOpen}
        />

        <main className="dashboard-main">
          <div className="dashboard-content">
            <StatsGrid stats={stats} />
            
            <div className="dashboard-grid-2">
              <ValueDistribution stats={stats} />
              <ImportantAlerts
                cuotasVencidas={statsCuotas?.cuotasVencidas || 0}
                cuotasProximasVencer={statsCuotas?.cuotasProximasAVencer || 0}
                lotesDisponibles={stats?.disponibles || 0}
                ventasActivas={statsVentas?.ventasActivas || 0}
              />
            </div>

            {/* Widget de Mora */}
            <MoraWidget />

            <QuickActions />

            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
