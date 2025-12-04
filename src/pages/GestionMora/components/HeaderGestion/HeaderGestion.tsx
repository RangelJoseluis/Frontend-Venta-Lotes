import React from 'react';
import { AlertTriangle, Calculator } from 'lucide-react';
import type { HeaderGestionProps } from '../../types';

const HeaderGestion: React.FC<HeaderGestionProps> = ({
    onVolver,
    onCalcularMora,
    isLoading
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-5 mb-6 bg-white dark:bg-slate-800 px-6 py-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            {/* Contenido del Header */}
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-xl text-white shadow-lg shadow-orange-500/30 dark:shadow-orange-600/40">
                    <AlertTriangle size={32} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                        Gestión de Mora
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Administración de cuotas vencidas y mora acumulada
                    </p>
                </div>
            </div>

            {/* Acción del Header */}
            <button
                onClick={onCalcularMora}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white rounded-lg text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 dark:hover:shadow-orange-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none w-full lg:w-auto"
                disabled={isLoading}
            >
                <Calculator size={20} />
                Calcular Mora Masiva
            </button>
        </div>
    );
};

export default HeaderGestion;
