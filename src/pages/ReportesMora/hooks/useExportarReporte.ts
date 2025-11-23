// Hook personalizado para exportar reportes
import { useCallback } from 'react';
import { reportesService } from '../../../services/reportes.service';
import { MENSAJES_ERROR } from '../constants';
import type {
    TipoReporte,
    UseExportarReporteReturn
} from '../types';
import type {
    ReporteMoraPorCliente,
    ReporteMoraPorPeriodo,
    ReporteMoraDetallado
} from '../../../services/reportes.service';

export const useExportarReporte = (
    tipoReporte: TipoReporte,
    reporteClientes: ReporteMoraPorCliente[],
    reportePeriodo: ReporteMoraPorPeriodo[],
    reporteDetallado: ReporteMoraDetallado[]
): UseExportarReporteReturn => {

    const exportar = useCallback(() => {
        let datos: any[] = [];
        let nombre = '';

        switch (tipoReporte) {
            case 'cliente':
                datos = reporteClientes;
                nombre = 'reporte-mora-por-cliente';
                break;
            case 'periodo':
                datos = reportePeriodo;
                nombre = 'reporte-mora-por-periodo';
                break;
            case 'detallado':
                datos = reporteDetallado;
                nombre = 'reporte-mora-detallado';
                break;
            case 'top':
                datos = reporteClientes;
                nombre = 'top-10-clientes-mora';
                break;
        }

        if (datos.length > 0) {
            reportesService.exportarACSV(datos, nombre);
        } else {
            console.warn(MENSAJES_ERROR.NO_DATOS);
        }
    }, [tipoReporte, reporteClientes, reportePeriodo, reporteDetallado]);

    return {
        exportar
    };
};

export default useExportarReporte;
