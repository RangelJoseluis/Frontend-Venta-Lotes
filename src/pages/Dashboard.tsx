import { useState, useEffect } from 'react';
import Sidebar from './components/Dashboard/Sidebar/Sidebar';
import Header from './components/Dashboard/Header/Header';
import StatsGrid from './components/Dashboard/StatsGrid/StatsGrid';
import ValueDistribution from './components/Dashboard/ValueDistribution/ValueDistribution';
import QuickActions from './components/Dashboard/QuickActions/QuickActions';
import LoadingSpinner from './components/Dashboard/UI/LoadingSpinner';
import { lotesService } from '../services/lotes.service';
import { getErrorMessage } from '../services/http.service';
import './Dashboard.css';
import type { EstadisticasLotes } from '../types';

const Dashboard = () => {
  const [stats, setStats] = useState<EstadisticasLotes | null>(null);
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
   * Cargar estadísticas desde el backend
   */
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Cargando estadísticas del backend...');
        console.log('📍 URL:', 'http://localhost:3000/lotes/estadisticas');
        console.log('🔑 Token:', localStorage.getItem('accessToken') ? 'Presente' : 'NO PRESENTE');
        
        const data = await lotesService.getEstadisticas();
        
        console.log('✅ Estadísticas recibidas:', data);
        setStats(data);
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
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
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
            <ValueDistribution stats={stats} />
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
