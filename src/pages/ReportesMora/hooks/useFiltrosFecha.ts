// Hook personalizado para gestionar filtros de fecha
import { useState } from 'react';
import { obtenerFechaHaceMeses, obtenerFechaActual } from '../utils';
import { FECHA_CONFIG } from '../constants';
import type { UseFiltrosFechaReturn } from '../types';

export const useFiltrosFecha = (): UseFiltrosFechaReturn => {
    const [fechaInicio, setFechaInicio] = useState(() =>
        obtenerFechaHaceMeses(FECHA_CONFIG.MESES_ATRAS_DEFAULT)
    );

    const [fechaFin, setFechaFin] = useState(() =>
        obtenerFechaActual()
    );

    return {
        fechaInicio,
        fechaFin,
        setFechaInicio,
        setFechaFin
    };
};

export default useFiltrosFecha;
