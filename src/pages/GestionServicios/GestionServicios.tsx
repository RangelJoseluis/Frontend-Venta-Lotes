import React, { useEffect, useState } from 'react';
import {
    HeaderGestion,
    AlertasEstado,
    EstadisticasServicios,
    FiltrosServicios,
    TablaServicios,
    FormularioServicio,
    ModalConfirmacion,
    ModalDetalleServicio,
    Paginacion
} from './components';
import { useServicios, useFiltrosServicios } from './hooks';
import type { Servicio } from './types';

const GestionServicios: React.FC = () => {
    const {
        servicios,
        loading,
        error,
        success,
        paginaActual,
        totalPaginas,
        cargarServicios,
        eliminarServicio,
        cambiarPagina,
        limpiarMensajes
    } = useServicios();

    const {
        filtros,
        actualizarFiltro
    } = useFiltrosServicios();

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [servicioEditar, setServicioEditar] = useState<string | undefined>(undefined);
    const [modalEliminar, setModalEliminar] = useState<{
        isOpen: boolean;
        servicioUid: string | null;
        servicioNombre: string;
    }>({
        isOpen: false,
        servicioUid: null,
        servicioNombre: ''
    });
    const [modalDetalle, setModalDetalle] = useState<{
        isOpen: boolean;
        servicio: Servicio | null;
    }>({
        isOpen: false,
        servicio: null
    });

    // Cargar servicios al montar y cuando cambien los filtros
    useEffect(() => {
        cargarServicios(filtros);
    }, [filtros, paginaActual]);

    // Calcular estadísticas
    const calcularEstadisticas = () => {
        const totalServicios = servicios.length;
        const serviciosActivos = servicios.filter(s => s.estado === 'activo').length;
        const serviciosInactivos = servicios.filter(s => s.estado === 'inactivo').length;
        const serviciosEsenciales = servicios.filter(s => s.esencial).length;
        const costoPromedioMensual = servicios.length > 0
            ? servicios.reduce((sum, s) => sum + (s.costoMensualBase || 0), 0) / servicios.length
            : 0;

        return {
            totalServicios,
            serviciosActivos,
            serviciosInactivos,
            serviciosEsenciales,
            costoPromedioMensual
        };
    };

    const estadisticas = calcularEstadisticas();

    // Handlers
    const handleNuevoServicio = () => {
        setServicioEditar(undefined);
        setMostrarFormulario(true);
    };

    const handleEditarServicio = (uid: string) => {
        setServicioEditar(uid);
        setMostrarFormulario(true);
    };

    const handleVerDetalle = (uid: string) => {
        const servicio = servicios.find(s => s.uid === uid);
        if (servicio) {
            setModalDetalle({
                isOpen: true,
                servicio
            });
        }
    };

    const handleCerrarDetalle = () => {
        setModalDetalle({
            isOpen: false,
            servicio: null
        });
    };

    const handleEliminarServicio = (uid: string) => {
        const servicio = servicios.find(s => s.uid === uid);
        if (servicio) {
            setModalEliminar({
                isOpen: true,
                servicioUid: uid,
                servicioNombre: servicio.nombre
            });
        }
    };

    const confirmarEliminar = async () => {
        if (modalEliminar.servicioUid) {
            await eliminarServicio(modalEliminar.servicioUid);
            setModalEliminar({ isOpen: false, servicioUid: null, servicioNombre: '' });
        }
    };

    const cancelarEliminar = () => {
        setModalEliminar({ isOpen: false, servicioUid: null, servicioNombre: '' });
    };

    const handleCerrarFormulario = () => {
        setMostrarFormulario(false);
        setServicioEditar(undefined);
        cargarServicios(filtros);
    };

    // Si se está mostrando el formulario, renderizar solo el formulario
    if (mostrarFormulario) {
        return (
            <div className="gestion-servicios">
                <FormularioServicio
                    servicioUid={servicioEditar}
                    onGuardar={handleCerrarFormulario}
                    onCancelar={handleCerrarFormulario}
                />
            </div>
        );
    }

    return (
        <div className="gestion-servicios">
            {/* Header */}
            <HeaderGestion
                totalServicios={estadisticas.totalServicios}
                serviciosFiltrados={servicios.length}
            />

            {/* Alertas de estado */}
            <AlertasEstado
                error={error}
                success={success}
                onLimpiarError={limpiarMensajes}
                onLimpiarSuccess={limpiarMensajes}
            />

            {/* Filtros con botón Nuevo Servicio integrado */}
            <FiltrosServicios
                filtros={filtros}
                onBusquedaChange={(busqueda) => actualizarFiltro('busqueda', busqueda)}
                onCategoriaChange={(categoria) => actualizarFiltro('categoria', categoria)}
                onTipoChange={(tipo) => actualizarFiltro('tipo', tipo)}
                onEstadoChange={(estado) => actualizarFiltro('estado', estado)}
                onNuevoServicio={handleNuevoServicio}
            />

            {/* Estadísticas */}
            <EstadisticasServicios
                totalServicios={estadisticas.totalServicios}
                serviciosActivos={estadisticas.serviciosActivos}
                serviciosInactivos={estadisticas.serviciosInactivos}
                serviciosEsenciales={estadisticas.serviciosEsenciales}
                costoPromedioMensual={estadisticas.costoPromedioMensual}
            />

            {/* Tabla de servicios */}
            <TablaServicios
                servicios={servicios}
                loading={loading}
                onEditar={handleEditarServicio}
                onEliminar={handleEliminarServicio}
                onVerDetalle={handleVerDetalle}
            />

            {/* Paginación */}
            {totalPaginas > 1 && (
                <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onCambioPagina={cambiarPagina}
                />
            )}

            {/* Modal de confirmación de eliminación */}
            <ModalConfirmacion
                isOpen={modalEliminar.isOpen}
                titulo="Eliminar Servicio"
                mensaje={`¿Estás seguro de que deseas eliminar el servicio "${modalEliminar.servicioNombre}"? Esta acción no se puede deshacer.`}
                onConfirmar={confirmarEliminar}
                onCancelar={cancelarEliminar}
            />

            {/* Modal de detalles del servicio */}
            <ModalDetalleServicio
                isOpen={modalDetalle.isOpen}
                servicio={modalDetalle.servicio}
                onCerrar={handleCerrarDetalle}
            />
        </div>
    );
};

export default GestionServicios;
