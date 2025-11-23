// Hook personalizado para gestionar filtros de mora
import { useState, useMemo } from 'react';
import type { CuotaConMora } from '../../services/mora.service';
import type { UseFiltrosMoraReturn } from '../types';

export const useFiltrosMora = (cuotas: CuotaConMora[]): UseFiltrosMoraReturn => {
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroLote, setFiltroLote] = useState('');

    const cuotasFiltradas = useMemo(() => {
        return cuotas.filter(cuota => {
            const matchCliente = filtroCliente === '' ||
                cuota.venta.cliente.toLowerCase().includes(filtroCliente.toLowerCase());
            const matchLote = filtroLote === '' ||
                cuota.venta.lote.toLowerCase().includes(filtroLote.toLowerCase());
            return matchCliente && matchLote;
        });
    }, [cuotas, filtroCliente, filtroLote]);

    return {
        filtroCliente,
        filtroLote,
        cuotasFiltradas,
        setFiltroCliente,
        setFiltroLote
    };
};

export default useFiltrosMora;
