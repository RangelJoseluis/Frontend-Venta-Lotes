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
        <div className="min-h-screen bg-slate-50 flex relative">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className={`flex-1 flex flex-col min-w-0 w-full transition-[margin-left] duration-300 ease-in-out
                ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
                <Header
                    setSidebarOpen={setSidebarOpen}
                    userMenuOpen={userMenuOpen}
                    setUserMenuOpen={setUserMenuOpen}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
                    <div className="w-full max-w-[1800px] mx-auto flex flex-col gap-6 lg:gap-7">
                        <StatsGrid stats={data.lotes} />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:min-h-[400px]">
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
