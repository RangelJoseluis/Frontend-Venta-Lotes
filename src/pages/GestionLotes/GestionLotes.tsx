/**
 * PÁGINA: GESTIÓN DE LOTES (MODULAR)
 * Componente principal que orquesta todos los sub-componentes
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLotes, useFiltrosLotes } from './hooks';
import {
    HeaderGestion,
    AlertasEstado,
    EstadisticasLotes,
    FiltrosLotes,
    TablaLotes,
    ModalConfirmacion
} from './components';
import type { Lote } from './types';


const GestionLotes: React.FC = () => {
    const navigate = useNavigate();

    // Hooks personalizados
    const {
        lotes,
        loading,
        error,
        cargarLotes,
        eliminarLote,
        limpiarError
    } = useLotes();

    const {
        filtros,
        lotesFiltrados,
        actualizarFiltro
    } = useFiltrosLotes(lotes);

    // Estado local para modal de eliminación
    const [modalEliminar, setModalEliminar] = useState<{
        isOpen: boolean;
        lote: Lote | null;
    }>({
        isOpen: false,
        lote: null
    });
    const [eliminando, setEliminando] = useState(false);

    // Cargar lotes al montar el componente
    useEffect(() => {
        cargarLotes();
    }, [cargarLotes]);

    // Calcular estadísticas
    const estadisticas = {
        totalLotes: lotes.length,
        lotesDisponibles: lotes.filter(l => l.estado === 'disponible').length,
        lotesEnCuotas: lotes.filter(l => l.estado === 'en_cuotas').length,
        lotesVendidos: lotes.filter(l => l.estado === 'vendido').length
    };

    // Handlers
    const handleNuevoLote = () => {
        navigate('/lotes/nuevo');
    };

    const handleVer = (uid: string) => {
        navigate(`/lotes/${uid}`);
    };

    const handleEditar = (uid: string) => {
        navigate(`/lotes/${uid}/editar`);
    };

    const handleEliminar = (lote: Lote) => {
        setModalEliminar({ isOpen: true, lote });
    };

    const confirmarEliminar = async () => {
        if (!modalEliminar.lote) return;

        try {
            setEliminando(true);
            await eliminarLote(modalEliminar.lote.uid);
            setModalEliminar({ isOpen: false, lote: null });
        } catch (err) {
            // El error ya se maneja en el hook
            console.error('Error al eliminar:', err);
        } finally {
            setEliminando(false);
        }
    };

    const cancelarEliminar = () => {
        setModalEliminar({ isOpen: false, lote: null });
    };

    return (
        <div className="gestion-lotes">
            {/* Header */}
            <HeaderGestion
                totalLotes={lotes.length}
                lotesFiltrados={lotesFiltrados.length}
            />

            {/* Alertas de estado */}
            <AlertasEstado
                error={error}
                success={null}
                onLimpiarError={limpiarError}
                onLimpiarSuccess={() => { }}
            />

            {/* Filtros con botón Nuevo Lote integrado */}
            <FiltrosLotes
                filtros={filtros}
                onBusquedaChange={(busqueda) => actualizarFiltro('busqueda', busqueda)}
                onEstadoChange={(estado) => actualizarFiltro('estado', estado)}
                onNuevoLote={handleNuevoLote}
            />

            {/* Estadísticas */}
            <EstadisticasLotes
                totalLotes={estadisticas.totalLotes}
                lotesDisponibles={estadisticas.lotesDisponibles}
                lotesEnCuotas={estadisticas.lotesEnCuotas}
                lotesVendidos={estadisticas.lotesVendidos}
            />

            {/* Tabla de lotes */}
            <TablaLotes
                lotes={lotesFiltrados}
                loading={loading}
                onVer={handleVer}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />

            {/* Modal de confirmación */}
            <ModalConfirmacion
                isOpen={modalEliminar.isOpen}
                lote={modalEliminar.lote}
                onConfirmar={confirmarEliminar}
                onCancelar={cancelarEliminar}
                loading={eliminando}
            />
        </div>
    );
};

export default GestionLotes;
