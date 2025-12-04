import React from 'react';
import type { PaginacionProps } from '../../types';

const Paginacion: React.FC<PaginacionProps> = ({
    paginaActual,
    totalPaginas,
    onCambioPagina
}) => {
    if (totalPaginas <= 1) {
        return null;
    }

    const handleAnterior = () => {
        if (paginaActual > 1) {
            onCambioPagina(paginaActual - 1);
        }
    };

    const handleSiguiente = () => {
        if (paginaActual < totalPaginas) {
            onCambioPagina(paginaActual + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-6 p-4">
            <button
                onClick={handleAnterior}
                disabled={paginaActual === 1}
                className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800"
            >
                Anterior
            </button>
            <span className="font-medium text-slate-600 dark:text-slate-400">
                Página {paginaActual} de {totalPaginas}
            </span>
            <button
                onClick={handleSiguiente}
                disabled={paginaActual === totalPaginas}
                className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800"
            >
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;
