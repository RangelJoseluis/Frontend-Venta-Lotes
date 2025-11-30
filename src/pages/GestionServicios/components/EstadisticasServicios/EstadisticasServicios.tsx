import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, Zap } from 'lucide-react';
import type { EstadisticasServiciosProps } from '../../types';

const EstadisticasServicios: React.FC<EstadisticasServiciosProps> = ({
    totalServicios,
    serviciosActivos,
    serviciosInactivos,
    serviciosEsenciales,
    costoPromedioMensual
}) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
            {/* Total Servicios */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-blue-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-500">
                    <Activity size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Servicios</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{totalServicios}</h3>
                </div>
            </div>

            {/* Activos */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-emerald-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500">
                    <TrendingUp size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Activos</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{serviciosActivos}</h3>
                </div>
            </div>

            {/* Inactivos */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-red-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-red-100 dark:bg-red-900/30 text-red-500">
                    <TrendingDown size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Inactivos</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{serviciosInactivos}</h3>
                </div>
            </div>

            {/* Esenciales */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-purple-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-purple-100 dark:bg-purple-900/30 text-purple-500">
                    <Zap size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Esenciales</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{serviciosEsenciales}</h3>
                </div>
            </div>

            {/* Costo Promedio */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-amber-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-500">
                    <DollarSign size={24} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Costo Promedio</p>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                        ${costoPromedioMensual.toLocaleString('es-CO')}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasServicios;
