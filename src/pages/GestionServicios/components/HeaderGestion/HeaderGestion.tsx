import React from 'react';
import { Settings } from 'lucide-react';
import type { HeaderGestionProps } from '../../types';

const HeaderGestion: React.FC<HeaderGestionProps> = ({
    totalServicios,
    serviciosFiltrados
}) => {
    return (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
            <Settings size={22} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-800 dark:text-white md:text-2xl">
                    Gestión de Servicios
                </h1>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                    ({serviciosFiltrados} de {totalServicios})
                </span>
            </div>
        </div>
    );
};

export default HeaderGestion;
