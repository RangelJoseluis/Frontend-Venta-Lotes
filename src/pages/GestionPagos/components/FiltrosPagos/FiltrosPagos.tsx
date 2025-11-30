import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { FiltrosPagosProps } from '../../types';

interface FiltrosPagosExtendedProps extends FiltrosPagosProps {
    onNuevoPago?: () => void;
}

const FiltrosPagos: React.FC<FiltrosPagosExtendedProps> = ({
    busqueda,
    onBusquedaChange,
    filtroMetodo,
    onFiltroMetodoChange,
    onNuevoPago
}) => {
    return (
        <div className="flex flex-col gap-3 mb-6 md:flex-row md:justify-between md:gap-4">
            {/* Buscador */}
            <div className="flex-1 min-w-0 relative flex items-center md:min-w-[300px]">
                <Search size={20} className="absolute left-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Buscar por venta, cuota o referencia..."
                    value={busqueda}
                    onChange={(e) => onBusquedaChange(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 border border-slate-200 dark:border-slate-700 rounded-lg text-sm transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
                />
            </div>

            {/* Filtro método y botón Registrar */}
            <div className="flex gap-3 flex-wrap flex-col md:flex-row">
                <select
                    value={filtroMetodo}
                    onChange={(e) => onFiltroMetodoChange(e.target.value)}
                    className="w-full md:w-auto px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer transition-all min-w-[150px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
                >
                    <option value="">Todos los métodos</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cheque">Cheque</option>
                    <option value="tarjeta">Tarjeta</option>
                </select>

                {onNuevoPago && (
                    <button
                        onClick={onNuevoPago}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Registrar Pago
                    </button>
                )}
            </div>
        </div>
    );
};

export default FiltrosPagos;
