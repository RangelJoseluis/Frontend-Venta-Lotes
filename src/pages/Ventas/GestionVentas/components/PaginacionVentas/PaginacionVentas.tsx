// ============================================================================
// COMPONENTE: PAGINACIÓN DE GESTIÓN DE VENTAS
// ============================================================================

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginacionVentas as PaginacionVentasType } from '../../../shared/types';

interface PaginacionVentasProps {
  paginacion: PaginacionVentasType;
  onPaginaChange: (pagina: number) => void;
}

const PaginacionVentas: React.FC<PaginacionVentasProps> = ({
  paginacion,
  onPaginaChange
}) => {
  const { paginaActual, totalPaginas } = paginacion;

  if (totalPaginas <= 1) {
    return null;
  }

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      onPaginaChange(paginaActual - 1);
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      onPaginaChange(paginaActual + 1);
    }
  };

  const irAPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      onPaginaChange(pagina);
    }
  };

  // Generar números de página para mostrar
  const generarNumerosPagina = () => {
    const numeros: number[] = [];
    const maxVisible = 5;

    if (totalPaginas <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPaginas; i++) {
        numeros.push(i);
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      if (paginaActual <= 3) {
        numeros.push(1, 2, 3, 4, -1, totalPaginas);
      } else if (paginaActual >= totalPaginas - 2) {
        numeros.push(1, -1, totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas);
      } else {
        numeros.push(1, -1, paginaActual - 1, paginaActual, paginaActual + 1, -1, totalPaginas);
      }
    }

    return numeros;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
      {/* Info */}
      <div className="text-slate-600 dark:text-slate-400 text-sm font-medium">
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
      </div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-700 w-full md:w-auto text-sm"
          onClick={paginaAnterior}
          disabled={paginaActual === 1}
          title="Página anterior"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        {/* Números de página */}
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {generarNumerosPagina().map((numero, index) => (
            numero === -1 ? (
              <span
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-9 h-9 text-slate-400 dark:text-slate-500 font-bold"
              >
                ...
              </span>
            ) : (
              <button
                key={numero}
                className={`
                  flex items-center justify-center w-9 h-9 rounded-lg font-medium transition-all text-sm
                  ${numero === paginaActual
                    ? 'bg-blue-500 dark:bg-blue-600 text-white border border-blue-500 dark:border-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                  }
                `}
                onClick={() => irAPagina(numero)}
              >
                {numero}
              </button>
            )
          ))}
        </div>

        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-700 w-full md:w-auto text-sm"
          onClick={paginaSiguiente}
          disabled={paginaActual === totalPaginas}
          title="Página siguiente"
        >
          Siguiente
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginacionVentas;
