// Hook personalizado para gestionar lotes
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { lotesService } from '../../../services/lotes.service';
import { getErrorMessage } from '../../../services/http.service';
import { MENSAJES_ERROR } from '../constants';
import type { Lote, UseLotesReturn } from '../types';

export const useLotes = (): UseLotesReturn => {
    const navigate = useNavigate();
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Cargar todos los lotes
     */
    const cargarLotes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await lotesService.obtenerTodos();
            setLotes(data);
            console.log('✅ Lotes cargados:', data.length);
        } catch (err: any) {
            const mensaje = getErrorMessage(err);
            setError(mensaje);
            console.error('❌ Error al cargar lotes:', err);

            // Redirigir si la sesión expiró
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    /**
     * Eliminar un lote
     */
    const eliminarLote = useCallback(async (uid: string) => {
        try {
            await lotesService.eliminar(uid);
            console.log('✅ Lote eliminado:', uid);

            // Actualizar lista local
            setLotes(prevLotes => prevLotes.filter(l => l.uid !== uid));
        } catch (err: any) {
            const mensaje = getErrorMessage(err);
            setError(mensaje);
            console.error('❌ Error al eliminar lote:', err);
            throw err; // Re-lanzar para que el componente pueda manejarlo
        }
    }, []);

    /**
     * Limpiar mensaje de error
     */
    const limpiarError = useCallback(() => {
        setError(null);
    }, []);

    return {
        lotes,
        loading,
        error,
        cargarLotes,
        eliminarLote,
        limpiarError
    };
};

export default useLotes;
