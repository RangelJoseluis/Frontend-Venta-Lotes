/**
 * PÁGINA: DASHBOARD (MODULAR)
 * Componente principal que orquesta todos los sub-componentes
 */

import { useState } from 'react';
import { useDashboardData, useSidebarState } from './hooks';
import {
    Header,
    Sidebar,
    StatsGrid,
    ValueDistribution,
    ImportantAlerts,
    MoraWidget,
    QuickActions,
    RecentActivity,
    LoadingSpinner
} from './components';
import ErrorMessage from '../../components/ErrorMessage';
import './Dashboard.css';

const Dashboard = () => {
    const { data, loading, error } = useDashboardData();
    const { sidebarOpen, setSidebarOpen } = useSidebarState();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

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
                        <StatsGrid stats={data.lotes} />

                        <div className="dashboard-grid-2">
                            <ValueDistribution stats={data.lotes} />
                            <ImportantAlerts
                                cuotasVencidas={data.cuotas?.cuotasVencidas || 0}
                                cuotasProximasVencer={data.cuotas?.cuotasProximasAVencer || 0}
                                lotesDisponibles={data.lotes?.disponibles || 0}
                                ventasActivas={data.ventas?.ventasActivas || 0}
                            />
                        </div>

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
