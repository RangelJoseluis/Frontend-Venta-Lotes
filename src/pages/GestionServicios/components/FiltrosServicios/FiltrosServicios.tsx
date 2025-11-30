import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import type { FiltrosServiciosProps } from '../../types';
import { CATEGORIAS_SERVICIO, TIPOS_SERVICIO, ESTADOS_SERVICIO } from '../../constants';

interface FiltrosServiciosExtendedProps extends FiltrosServiciosProps {
    onNuevoServicio?: () => void;
}

const FiltrosServicios: React.FC<FiltrosServiciosExtendedProps> = ({
    filtros,
    onBusquedaChange,
    onCategoriaChange,
    onTipoChange,
    onEstadoChange,
    onNuevoServicio
}) => {
    return (
        <div className="flex flex-col gap-3 mb-6 md:flex-row md:justify-between md:gap-4">
            <div className="flex gap-3 flex-1 min-w-0 flex-col md:flex-row">
                <div className="flex-1 min-w-0 relative flex items-center md:min-w-[300px]">
                    <Search size={20} className="absolute left-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={filtros.busqueda}
                        onChange={(e) => onBusquedaChange(e.target.value)}
                        className="w-full py-3 pl-12 pr-4 border border-slate-200 dark:border-slate-700 rounded-lg text-sm transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium cursor-pointer transition-all text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap">
                    <Filter size={18} />
                    Filtros
                </button>
            </div>

            <div className="flex gap-3 flex-wrap flex-col md:flex-row">
                <select
                    value={filtros.categoria || ''}
                    onChange={(e) => onCategoriaChange(e.target.value as any || undefined)}
                    className="w-full md:w-auto px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer transition-all min-w-[150px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
                >
                    <option value="">Todas las categorías</option>
                    {Object.entries(CATEGORIAS_SERVICIO).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                <select
                    value={filtros.tipo || ''}
                    onChange={(e) => onTipoChange(e.target.value as any || undefined)}
                    className="w-full md:w-auto px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer transition-all min-w-[150px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
                >
                    <option value="">Todos los tipos</option>
                    {Object.entries(TIPOS_SERVICIO).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                <select
                    value={filtros.estado || ''}
                    onChange={(e) => onEstadoChange(e.target.value as any || undefined)}
                    className="w-full md:w-auto px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer transition-all min-w-[150px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
                >
                    <option value="">Todos los estados</option>
                    {Object.entries(ESTADOS_SERVICIO).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                {onNuevoServicio && (
                    <button
                        onClick={onNuevoServicio}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Nuevo Servicio
                    </button>
                )}
            </div>
        </div>
    );
};

export default FiltrosServicios;
