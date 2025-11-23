// Hook personalizado para gestionar pagos
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import pagosService from '../../../services/pagos.service';
import facturasService from '../../../services/facturas.service';
import { MENSAJES_ERROR, MENSAJES_EXITO, PAGINACION_CONFIG, TIMEOUTS } from '../constants';
import type { Pago, UsePagosReturn, FiltrosPagos } from '../types';

export const usePagos = (): UsePagosReturn => {
    const navigate = useNavigate();
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [paginaActual, setPaginaActual] = useState(PAGINACION_CONFIG.PAGINA_INICIAL);
    const [totalPaginas, setTotalPaginas] = useState(1);

    /**
     * Cargar pagos con filtros opcionales
     */
    const cargarPagos = useCallback(async (filtros?: FiltrosPagos) => {
        try {
            setLoading(true);
            setError(null);

            const response = await pagosService.obtenerPaginados(
                paginaActual,
                PAGINACION_CONFIG.LIMITE_POR_PAGINA,
                filtros
            );

            setPagos(response.pagos);
            setTotalPaginas(response.totalPaginas);
        } catch (err: any) {
            console.error('Error al cargar pagos:', err);

            // Manejar errores de autenticación
            if (err.response?.status === 401) {
                setError(MENSAJES_ERROR.SESION_EXPIRADA);
                setTimeout(() => {
                    navigate('/login');
                }, TIMEOUTS.REDIRECT_LOGIN);
            } else {
                setError(MENSAJES_ERROR.CARGAR_PAGOS);
            }
        } finally {
            setLoading(false);
        }
    }, [paginaActual, navigate]);

    /**
     * Previsualizar ticket de pago
     */
    const previsualizarTicket = useCallback(async (uid: string) => {
        try {
            await facturasService.previsualizarTicketPago(uid);
            setSuccess(MENSAJES_EXITO.TICKET_PREVISUALIZADO);

            // Auto-ocultar mensaje de éxito
            setTimeout(() => {
                setSuccess(null);
            }, TIMEOUTS.MENSAJE_AUTO_HIDE);
        } catch (err) {
            console.error('Error al previsualizar ticket:', err);
            setError(MENSAJES_ERROR.PREVISUALIZAR_TICKET);
        }
    }, []);

    /**
     * Descargar ticket de pago
     */
    const descargarTicket = useCallback(async (uid: string) => {
        try {
            await facturasService.descargarTicketPago(uid);
            setSuccess(MENSAJES_EXITO.TICKET_DESCARGADO);

            // Auto-ocultar mensaje de éxito
            setTimeout(() => {
                setSuccess(null);
            }, TIMEOUTS.MENSAJE_AUTO_HIDE);
        } catch (err) {
            console.error('Error al descargar ticket:', err);
            setError(MENSAJES_ERROR.DESCARGAR_TICKET);
        }
    }, []);

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
    };
};

export default usePagos;
