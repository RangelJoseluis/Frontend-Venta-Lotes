import React from 'react';
import type { PaginacionProps } from '../../types';
import './Paginacion.css';

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
        <div className="paginacion-pagos">
            <button
                onClick={onPaginaAnterior}
                disabled={paginaActual === 1}
            >
                Anterior
            </button>
            <span>Página {paginaActual} de {totalPaginas}</span>
            <button
                onClick={onPaginaSiguiente}
                disabled={paginaActual === totalPaginas}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Paginacion;
