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
import './ReportesMora.css';

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
        <div className="mora-container">
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
                <div className="loading-container">
                    <Loader className="spinner-large" size={56} />
                    <p>Cargando reporte...</p>
                </div>
            )}

            {!isLoading && !error && (
                <div className="reporte-content">
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
