import React from 'react';
import { Filter } from 'lucide-react';
import type { FiltrosMoraProps } from '../../types';

const FiltrosMora: React.FC<FiltrosMoraProps> = ({
    filtroCliente,
    filtroLote,
    onClienteChange,
    onLoteChange
}) => {
    return (
        <div className="bg-white dark:bg-slate-800 px-6 py-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
                <Filter size={20} className="text-blue-500 dark:text-blue-400" />
                <h3 className="font-semibold text-base">Filtros de Búsqueda</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Cliente
                    </label>
                    <input
                        type="text"
                        placeholder="Buscar por cliente..."
                        value={filtroCliente}
                        onChange={(e) => onClienteChange(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Lote
                    </label>
                    <input
                        type="text"
                        placeholder="Buscar por lote..."
                        value={filtroLote}
                        onChange={(e) => onLoteChange(e.target.value)}
                        className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default FiltrosMora;
