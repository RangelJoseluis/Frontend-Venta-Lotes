// Hook personalizado para gestionar filtros de servicios
import { useState, useCallback } from 'react';
import type { FiltrosServicios, UseFiltrosServiciosReturn } from '../types';

const FILTROS_INICIALES: FiltrosServicios = {
    busqueda: '',
    categoria: undefined,
    tipo: undefined,
    estado: undefined
};

export const useFiltrosServicios = (): UseFiltrosServiciosReturn => {
    const [filtros, setFiltros] = useState<FiltrosServicios>(FILTROS_INICIALES);

    /**
     * Actualizar un filtro específico
     */
    const actualizarFiltro = useCallback(<K extends keyof FiltrosServicios>(
        campo: K,
        valor: FiltrosServicios[K]
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

    return {
        filtros,
        actualizarFiltro,
        limpiarFiltros
    };
};

export default useFiltrosServicios;
