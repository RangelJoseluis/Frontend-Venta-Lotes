// ============================================================================
// COMPONENTE: PAGINACIÓN DE GESTIÓN DE VENTAS
// ============================================================================

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginacionVentas as PaginacionVentasType } from '../../../shared/types';
import './PaginacionVentas.css';

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
    <div className="paginacion-ventas">
      <div className="paginacion-info">
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
      </div>

      <div className="paginacion-controles">
        <button
          className="btn-paginacion"
          onClick={paginaAnterior}
          disabled={paginaActual === 1}
          title="Página anterior"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        <div className="numeros-pagina">
          {generarNumerosPagina().map((numero, index) => (
            numero === -1 ? (
              <span key={`ellipsis-${index}`} className="ellipsis">...</span>
            ) : (
              <button
                key={numero}
                className={`btn-numero ${numero === paginaActual ? 'activo' : ''}`}
                onClick={() => irAPagina(numero)}
              >
                {numero}
              </button>
            )
          ))}
        </div>

        <button
          className="btn-paginacion"
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
