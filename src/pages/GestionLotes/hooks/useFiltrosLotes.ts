// Hook personalizado para gestionar filtros de lotes
import { useState, useCallback, useMemo } from 'react';
import type { Lote, FiltrosLotes, UseFiltrosLotesReturn } from '../types';

const FILTROS_INICIALES: FiltrosLotes = {
    busqueda: '',
    estado: 'todos'
};

export const useFiltrosLotes = (lotes: Lote[]): UseFiltrosLotesReturn => {
    const [filtros, setFiltros] = useState<FiltrosLotes>(FILTROS_INICIALES);

    /**
     * Actualizar un filtro específico
     */
    const actualizarFiltro = useCallback(<K extends keyof FiltrosLotes>(
        campo: K,
        valor: FiltrosLotes[K]
    ) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor
        }));
    }, []);

    /**
     * Limpiar todos los filtros
     */
    const limpiarFiltros = useCallback(() => {
        setFiltros(FILTROS_INICIALES);
    }, []);

    /**
     * Aplicar filtros a la lista de lotes
     */
    const lotesFiltrados = useMemo(() => {
        let resultado = [...lotes];

        // Filtro por búsqueda
        if (filtros.busqueda) {
            const busquedaLower = filtros.busqueda.toLowerCase();
            resultado = resultado.filter(lote =>
                lote.codigo.toLowerCase().includes(busquedaLower) ||
                lote.direccion.toLowerCase().includes(busquedaLower) ||
                lote.manzana.toLowerCase().includes(busquedaLower) ||
                lote.numeroLote.toLowerCase().includes(busquedaLower)
            );
        }

        // Filtro por estado
        if (filtros.estado !== 'todos') {
            resultado = resultado.filter(lote => lote.estado === filtros.estado);
        }

        return resultado;
    }, [lotes, filtros]);

    return {
        filtros,
        lotesFiltrados,
        actualizarFiltro,
        limpiarFiltros
    };
};

export default useFiltrosLotes;
