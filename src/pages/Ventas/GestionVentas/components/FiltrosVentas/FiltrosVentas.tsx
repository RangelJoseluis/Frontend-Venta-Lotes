import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import type { FiltrosVentasProps } from '../../types';

interface FiltrosVentasExtendedProps extends FiltrosVentasProps {
  onNuevaVenta?: () => void;
}

const FiltrosVentas: React.FC<FiltrosVentasExtendedProps> = ({
  searchTerm,
  onSearchChange,
  filtroEstado,
  onFiltroEstadoChange,
  filtroModalidad,
  onFiltroModalidadChange,
  mostrarFiltros,
  onToggleFiltros,
  onNuevaVenta
}) => {
  return (
    <div className="flex flex-col gap-3 mb-6 md:flex-row md:justify-between md:gap-4">
      {/* Buscador y botón filtros */}
      <div className="flex gap-3 flex-1 min-w-0 flex-col md:flex-row">
        <div className="flex-1 min-w-0 relative flex items-center md:min-w-[300px]">
          <Search size={20} className="absolute left-4 text-slate-500 dark:text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por lote, cliente, código..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-3 pl-12 pr-4 border border-slate-200 dark:border-slate-700 rounded-lg text-sm transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
          />
        </div>
        <button
          onClick={onToggleFiltros}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium cursor-pointer transition-all text-sm whitespace-nowrap ${mostrarFiltros
              ? 'bg-blue-600 text-white border border-blue-600'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
        >
          <Filter size={18} />
          Filtros
        </button>
      </div>

      {/* Filtros por estado/modalidad y botón Nueva Venta */}
      <div className="flex gap-3 flex-wrap flex-col md:flex-row">
        <select
          value={filtroEstado}
          onChange={(e) => onFiltroEstadoChange(e.target.value)}
          className="w-full md:w-auto px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer transition-all min-w-[150px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
        >
          <option value="todos">Todos los estados</option>
          <option value="activa">Activas</option>
          <option value="pendiente">Pendientes</option>
          <option value="cancelada">Canceladas</option>
        </select>

        <select
          value={filtroModalidad}
          onChange={(e) => onFiltroModalidadChange(e.target.value)}
          className="w-full md:w-auto px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer transition-all min-w-[150px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 dark:hover:border-slate-600"
        >
          <option value="todos">Todas las modalidades</option>
          <option value="contado">Contado</option>
          <option value="cuotas">Cuotas</option>
        </select>

        {onNuevaVenta && (
          <button
            onClick={onNuevaVenta}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <Plus size={18} />
            Nueva Venta
          </button>
        )}
      </div>
    </div>
  );
};

export default FiltrosVentas;
