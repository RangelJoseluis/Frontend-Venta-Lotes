import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginacionProps } from '../../types';

const Paginacion: React.FC<PaginacionProps> = ({
    paginaActual,
    totalPaginas,
    onPaginaAnterior,
    onPaginaSiguiente
}) => {
    if (totalPaginas <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-end gap-3 mt-4">
            <button
                onClick={onPaginaAnterior}
                disabled={paginaActual === 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Página anterior"
            >
                <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Página <span className="text-slate-900 dark:text-white">{paginaActual}</span> de <span className="text-slate-900 dark:text-white">{totalPaginas}</span>
            </span>

            <button
                onClick={onPaginaSiguiente}
                disabled={paginaActual === totalPaginas}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Página siguiente"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Paginacion;
