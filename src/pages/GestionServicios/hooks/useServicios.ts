// Hook personalizado para gestionar servicios
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import serviciosService from '../../../services/servicios.service';
import { MENSAJES_ERROR, MENSAJES_EXITO, PAGINACION_CONFIG, TIMEOUTS } from '../constants';
import type { Servicio, UseServiciosReturn, FiltrosServicios } from '../types';

export const useServicios = (): UseServiciosReturn => {
    const navigate = useNavigate();
    const [servicios, setServicios] = useState<Servicio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [paginaActual, setPaginaActual] = useState(PAGINACION_CONFIG.PAGINA_INICIAL);
    const [totalPaginas, setTotalPaginas] = useState(1);

    /**
     * Cargar servicios con filtros opcionales
     */
    const cargarServicios = useCallback(async (filtros?: FiltrosServicios) => {
        try {
            setLoading(true);
            setError(null);

            // Obtener todos los servicios
            const todosServicios: Servicio[] = await serviciosService.obtenerTodos();

            // Aplicar filtros si existen
            let serviciosFiltrados = todosServicios;

            if (filtros) {
                serviciosFiltrados = todosServicios.filter(servicio => {
                    // Filtro de búsqueda
                    if (filtros.busqueda) {
                        const busquedaLower = filtros.busqueda.toLowerCase();
                        const coincideNombre = servicio.nombre.toLowerCase().includes(busquedaLower);
                        const coincideDescripcion = servicio.descripcion.toLowerCase().includes(busquedaLower);
                        if (!coincideNombre && !coincideDescripcion) return false;
                    }

                    // Filtro de categoría
                    if (filtros.categoria && servicio.categoria !== filtros.categoria) {
                        return false;
                    }

                    // Filtro de tipo
                    if (filtros.tipo && servicio.tipo !== filtros.tipo) {
                        return false;
                    }

                    // Filtro de estado
                    if (filtros.estado && servicio.estado !== filtros.estado) {
                        return false;
                    }

                    return true;
                });
            }

            // Aplicar paginación
            const inicio = (paginaActual - 1) * PAGINACION_CONFIG.LIMITE_POR_PAGINA;
            const fin = inicio + PAGINACION_CONFIG.LIMITE_POR_PAGINA;
            const serviciosPaginados = serviciosFiltrados.slice(inicio, fin);

            setServicios(serviciosPaginados);
            setTotalPaginas(Math.ceil(serviciosFiltrados.length / PAGINACION_CONFIG.LIMITE_POR_PAGINA));
        } catch (err: any) {
            console.error('Error al cargar servicios:', err);

            // Manejar errores de autenticación
            if (err.response?.status === 401) {
                setError(MENSAJES_ERROR.SESION_EXPIRADA);
                setTimeout(() => {
                    navigate('/login');
                }, TIMEOUTS.REDIRECT_LOGIN);
            } else {
                setError(MENSAJES_ERROR.CARGAR_SERVICIOS);
            }
        } finally {
            setLoading(false);
        }
    }, [paginaActual, navigate]);

    /**
     * Eliminar servicio
     */
    const eliminarServicio = useCallback(async (uid: string) => {
        try {
            await serviciosService.eliminar(uid);
            setSuccess(MENSAJES_EXITO.SERVICIO_ELIMINADO);

            // Auto-ocultar mensaje de éxito
            setTimeout(() => {
                setSuccess(null);
            }, TIMEOUTS.MENSAJE_AUTO_HIDE);

            // Recargar servicios
            await cargarServicios();
        } catch (err) {
            console.error('Error al eliminar servicio:', err);
            setError(MENSAJES_ERROR.ELIMINAR_SERVICIO);
        }
    }, [cargarServicios]);

    /**
     * Cambiar página actual
     */
    const cambiarPagina = useCallback((pagina: number) => {
        setPaginaActual(pagina);
    }, []);

    /**
     * Limpiar mensajes de error y éxito
     */
    const limpiarMensajes = useCallback(() => {
        setError(null);
        setSuccess(null);
    }, []);

    return {
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
    };
};

export default useServicios;
