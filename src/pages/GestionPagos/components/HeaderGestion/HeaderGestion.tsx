import React from 'react';
import { Receipt } from 'lucide-react';
import type { HeaderGestionProps } from '../../types';

const HeaderGestion: React.FC<HeaderGestionProps> = ({
    totalPagos
}) => {
    return (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
            <Receipt size={22} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="flex items-baseline gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-800 dark:text-white md:text-2xl">
                    Gestión de Pagos
                </h1>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                    ({totalPagos} pagos)
                </span>
            </div>
        </div>
    );
};

export default HeaderGestion;
