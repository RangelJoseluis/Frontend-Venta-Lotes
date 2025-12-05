// Hook personalizado para gestionar filtros de pagos
import { useState, useMemo, useCallback } from 'react';
import type { Pago, UseFiltrosPagosReturn } from '../types';

export const useFiltrosPagos = (pagos: Pago[]): UseFiltrosPagosReturn => {
    const [busqueda, setBusqueda] = useState('');
    const [filtroMetodo, setFiltroMetodo] = useState('');

    /**
     * Filtrar pagos según búsqueda y filtros
     */
    const pagosFiltrados = useMemo(() => {
        return pagos.filter(pago => {
            const busquedaLower = busqueda.toLowerCase();

            // Filtro de búsqueda
            const cumpleBusqueda =
                pago.cuota?.numeroCuota?.toString().includes(busquedaLower) ||
                pago.cuota?.venta?.codigo?.toLowerCase().includes(busquedaLower) ||
                pago.referencia?.toLowerCase().includes(busquedaLower);

            return cumpleBusqueda;
        });
    }, [pagos, busqueda]);

    /**
     * Resetear todos los filtros
     */
    const resetFiltros = useCallback(() => {
        setBusqueda('');
        setFiltroMetodo('');
    }, []);

    return {
        busqueda,
        setBusqueda,
        filtroMetodo,
        setFiltroMetodo,
        pagosFiltrados,
        resetFiltros
    };
};

export default useFiltrosPagos;
