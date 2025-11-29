/**
 * PÁGINA: DASHBOARD (MODULAR)
 * Componente principal que orquesta todos los sub-componentes
 */

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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative transition-colors duration-200">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className={`
                flex-1 flex flex-col min-w-0 w-full
                transition-[margin-left] duration-300 ease-in-out
                ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
            `}>
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-x-hidden">
                    <div className="max-w-[1600px] mx-auto space-y-6">

                        {/* Stats Grid */}
                        <StatsGrid stats={data.lotes} />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            {/* Main Chart Area - 2 columns */}
                            <div className="lg:col-span-2 h-full">
                                <ValueDistribution stats={data.lotes} />
                            </div>

                            {/* Side Widgets - 1 column */}
                            <div className="h-full">
                                <ImportantAlerts
                                    cuotasVencidas={data.cuotas?.cuotasVencidas || 0}
                                    cuotasProximasVencer={data.cuotas?.cuotasProximasAVencer || 0}
                                    lotesDisponibles={data.lotes?.disponibles || 0}
                                    ventasActivas={data.ventas?.ventasActivas || 0}
                                />
                            </div>
                        </div>

                        <QuickActions />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <RecentActivity />
                            <MoraWidget />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
