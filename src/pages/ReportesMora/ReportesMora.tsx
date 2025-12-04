/**
 * PÁGINA: REPORTES DE MORA (MODULAR)
 * Componente principal que orquesta todos los sub-componentes
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useReportesMora, useFiltrosFecha, useExportarReporte } from './hooks';
import {
    HeaderReportes,
    SelectorTipoReporte,
    FiltrosFecha,
    AlertasEstado,
    EstadisticasMora,
    TablaReporteClientes,
    TablaReportePeriodo,
    TablaReporteDetallado
} from './components';

const ReportesMora: React.FC = () => {
    const navigate = useNavigate();
    const [mostrarGraficas, setMostrarGraficas] = useState(false);

    // Hooks personalizados
    const {
        fechaInicio,
        fechaFin,
        setFechaInicio,
        setFechaFin
    } = useFiltrosFecha();

    const {
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
    } = useReportesMora(fechaInicio, fechaFin);

    const { exportar } = useExportarReporte(
        tipoReporte,
        reporteClientes,
        reportePeriodo,
        reporteDetallado
    );

    // Cargar reporte al cambiar tipo
    useEffect(() => {
        cargarReporte();
    }, [tipoReporte, cargarReporte]);

    // Handlers
    const handleVolver = () => navigate('/dashboard');
    const handleAplicarFiltros = () => cargarReporte();

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-6 bg-fondo-pagina dark:bg-slate-950 min-h-screen">
            <HeaderReportes
                onVolver={handleVolver}
                onActualizar={cargarReporte}
                onExportar={exportar}
                isLoading={isLoading}
            />

            <SelectorTipoReporte
                tipoActual={tipoReporte}
                onCambioTipo={setTipoReporte}
            />

            {tipoReporte === 'periodo' && (
                <FiltrosFecha
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                    onFechaInicioChange={setFechaInicio}
                    onFechaFinChange={setFechaFin}
                    onAplicar={handleAplicarFiltros}
                />
            )}

            <AlertasEstado
                error={error}
                success={null}
                onLimpiarError={limpiarError}
                onLimpiarSuccess={() => { }}
            />

            {isLoading && (
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                    <Loader className="text-orange-500 dark:text-orange-400 animate-spin mb-5" size={56} />
                    <p className="text-base font-medium text-slate-600 dark:text-slate-400">
                        Cargando reporte...
                    </p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="flex flex-col gap-6">
                    {tipoReporte === 'cliente' && (
                        <TablaReporteClientes
                            datos={reporteClientes}
                            mostrarGraficas={mostrarGraficas}
                            onToggleGraficas={() => setMostrarGraficas(!mostrarGraficas)}
                        />
                    )}

                    {tipoReporte === 'periodo' && (
                        <TablaReportePeriodo
                            datos={reportePeriodo}
                            mostrarGraficas={mostrarGraficas}
                            onToggleGraficas={() => setMostrarGraficas(!mostrarGraficas)}
                        />
                    )}

                    {tipoReporte === 'detallado' && (
                        <TablaReporteDetallado datos={reporteDetallado} />
                    )}

                    {tipoReporte === 'top' && (
                        <>
                            {efectividad && <EstadisticasMora efectividad={efectividad} />}
                            <TablaReporteClientes
                                datos={reporteClientes}
                                mostrarGraficas={false}
                                onToggleGraficas={() => { }}
                                esTop10
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportesMora;
