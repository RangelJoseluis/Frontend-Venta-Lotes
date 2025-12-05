/**
 * PÁGINA: DASHBOARD (MODULAR)
 * Componente principal que orquesta todos los sub-componentes
 */

import { useDashboardData } from './hooks';
import {
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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <>
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
        </>
    );
};

export default Dashboard;
