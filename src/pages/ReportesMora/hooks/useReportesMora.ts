// Hook personalizado para gestionar reportes de mora
import { useState, useCallback } from 'react';
import { getErrorMessage } from '../../../services/http.service';
import { reportesService } from '../../../services/reportes.service';
import { MENSAJES_ERROR } from '../constants';
import type {
    TipoReporte,
    UseReportesMoraReturn
} from '../types';
import type {
    ReporteMoraPorCliente,
    ReporteMoraPorPeriodo,
    ReporteMoraDetallado,
    EstadisticasEfectividad
} from '../../../services/reportes.service';

export const useReportesMora = (
    fechaInicio?: string,
    fechaFin?: string
): UseReportesMoraReturn => {
    const [tipoReporte, setTipoReporte] = useState<TipoReporte>('cliente');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [reporteClientes, setReporteClientes] = useState<ReporteMoraPorCliente[]>([]);
    const [reportePeriodo, setReportePeriodo] = useState<ReporteMoraPorPeriodo[]>([]);
    const [reporteDetallado, setReporteDetallado] = useState<ReporteMoraDetallado[]>([]);
    const [efectividad, setEfectividad] = useState<EstadisticasEfectividad | null>(null);

    /**
     * Cargar reporte según el tipo seleccionado
     */
    const cargarReporte = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            switch (tipoReporte) {
                case 'cliente':
                    const clientes = await reportesService.obtenerPorCliente();
                    setReporteClientes(clientes);
                    break;

                case 'periodo':
                    if (!fechaInicio || !fechaFin) {
                        throw new Error('Fechas requeridas para reporte por período');
                    }
                    const periodo = await reportesService.obtenerPorPeriodo(fechaInicio, fechaFin);
                    setReportePeriodo(periodo);
                    break;

                case 'detallado':
                    const detallado = await reportesService.obtenerDetallado();
                    setReporteDetallado(detallado);
                    break;

                case 'top':
                    const top = await reportesService.obtenerTopClientes(10);
                    setReporteClientes(top);
                    const efectividadData = await reportesService.obtenerEfectividadCobro();
                    setEfectividad(efectividadData);
                    break;
            }
        } catch (err) {
            console.error('Error al cargar reporte:', err);
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, [tipoReporte, fechaInicio, fechaFin]);

    /**
     * Limpiar mensaje de error
     */
    const limpiarError = useCallback(() => {
        setError(null);
    }, []);

    return {
        tipoReporte,
        setTipoReporte,
        isLoading,
        error,
        reporteClientes,
        reportePeriodo,
        reporteDetallado,
        efectividad,
        cargarReporte,
        limpiarError
    };
};

export default useReportesMora;
