/**
 * PÁGINA: GESTIÓN DE PAGOS - Versión Modular
 * Gestión completa de pagos con componentes modulares reutilizables
 * Sigue el patrón de GestionDeUsuariosCliente para mejor mantenibilidad
 */

import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HeaderGestion,
    EstadisticasPagos,
    FiltrosPagos,
    TablaPagos,
    Paginacion,
    AlertasEstado
} from './components';
import {
    usePagos,
    useFiltrosPagos
} from './hooks';
import './GestionPagos.css';

const GestionPagos: React.FC = () => {
    const navigate = useNavigate();

    // Hook de gestión de pagos
    const {
        pagos,
        loading,
        error,
        success,
        paginaActual,
        totalPaginas,
        cargarPagos,
        previsualizarTicket,
        descargarTicket,
        cambiarPagina,
        limpiarMensajes
    } = usePagos();

    // Hook de filtros
    const {
        busqueda,
        setBusqueda,
        filtroMetodo,
        setFiltroMetodo,
        pagosFiltrados
    } = useFiltrosPagos(pagos);

    // Cargar pagos al montar y cuando cambie la página o filtro de método
    useEffect(() => {
        const filtros = filtroMetodo ? { metodoPago: filtroMetodo } : undefined;
        cargarPagos(filtros);
    }, [paginaActual, filtroMetodo, cargarPagos]);

    // Calcular estadísticas
    const estadisticas = useMemo(() => {
        const totalEfectivo = pagos
            .filter(p => p.metodoPago === 'efectivo')
            .reduce((sum, p) => sum + p.monto, 0);

        const totalTransferencia = pagos
            .filter(p => p.metodoPago === 'transferencia')
            .reduce((sum, p) => sum + p.monto, 0);

        const totalCheque = pagos
            .filter(p => p.metodoPago === 'cheque')
            .reduce((sum, p) => sum + p.monto, 0);

        const totalTarjeta = pagos
            .filter(p => p.metodoPago === 'tarjeta')
            .reduce((sum, p) => sum + p.monto, 0);

        return {
            totalEfectivo,
            totalTransferencia,
            totalCheque,
            totalTarjeta
        };
    }, [pagos]);

    // Handlers
    const handleVolver = () => {
        navigate('/dashboard');
    };

    const handleNuevoPago = () => {
        navigate('/registrar-pago');
    };

    const handleVerDetalle = (uid: string) => {
        navigate(`/pagos/${uid}`);
    };

    const handlePaginaAnterior = () => {
        if (paginaActual > 1) {
            cambiarPagina(paginaActual - 1);
        }
    };

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            cambiarPagina(paginaActual + 1);
        }
    };

    return (
        <div className="gestion-pagos">
            {/* Header */}
            <HeaderGestion
                onVolver={handleVolver}
                onNuevoPago={handleNuevoPago}
                totalPagos={pagos.length}
            />

            {/* Alertas de éxito/error */}
            <AlertasEstado
                error={error}
                success={success}
                onLimpiarError={limpiarMensajes}
                onLimpiarSuccess={limpiarMensajes}
            />

            {/* Filtros - ARRIBA de las estadísticas */}
            <FiltrosPagos
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                filtroMetodo={filtroMetodo}
                onFiltroMetodoChange={setFiltroMetodo}
            />

            {/* Estadísticas - DEBAJO de los filtros */}
            <EstadisticasPagos
                totalPagos={pagos.length}
                totalEfectivo={estadisticas.totalEfectivo}
                totalTransferencia={estadisticas.totalTransferencia}
                totalCheque={estadisticas.totalCheque}
                totalTarjeta={estadisticas.totalTarjeta}
                loading={loading}
            />

            {/* Tabla de Pagos */}
            <TablaPagos
                pagos={pagosFiltrados}
                loading={loading}
                onVerDetalle={handleVerDetalle}
                onPrevisualizarTicket={previsualizarTicket}
                onDescargarTicket={descargarTicket}
            />

            {/* Paginación */}
            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onPaginaAnterior={handlePaginaAnterior}
                onPaginaSiguiente={handlePaginaSiguiente}
            />

            {/* Resumen */}
            <div className="resumen">
                <p>Total de pagos: <strong>{pagosFiltrados.length}</strong></p>
            </div>
        </div>
    );
};

export default GestionPagos;
