// Hook personalizado para gestionar formulario de servicio
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import serviciosService from '../../../services/servicios.service';
import { MENSAJES_ERROR, MENSAJES_EXITO } from '../constants';
import type { CrearServicioDto, Servicio } from '../../../types';
import type { UseFormularioServicioReturn } from '../types';

const FORM_DATA_INICIAL: CrearServicioDto = {
    nombre: '',
    descripcion: '',
    categoria: 'utilities',
    tipo: 'publico',
    costoMensualBase: 0,
    esencial: false,
    proveedor: ''
};

export const useFormularioServicio = (
    onSuccess?: () => void
): UseFormularioServicioReturn => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CrearServicioDto>(FORM_DATA_INICIAL);
    const [loading, setLoading] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [servicioUid, setServicioUid] = useState<string | null>(null);

    /**
     * Actualizar un campo del formulario
     */
    const actualizarCampo = useCallback((campo: string, valor: any) => {
        setFormData((prev: CrearServicioDto) => ({
            ...prev,
            [campo]: valor
        }));
    }, []);

    /**
     * Cargar servicio para edición
     */
    const cargarServicio = useCallback(async (uid: string) => {
        try {
            setLoading(true);
            setError(null);
            setServicioUid(uid);

            const servicio: Servicio = await serviciosService.obtenerPorUid(uid);

            setFormData({
                nombre: servicio.nombre,
                descripcion: servicio.descripcion,
                categoria: servicio.categoria,
                tipo: servicio.tipo,
                costoMensualBase: servicio.costoMensual || 0,
                esencial: servicio.esEsencial || false,
                proveedor: servicio.proveedor || ''
            });
        } catch (err: any) {
            console.error('Error al cargar servicio:', err);
            setError(MENSAJES_ERROR.CARGAR_SERVICIOS);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Guardar servicio (crear o actualizar)
     */
    const guardarServicio = useCallback(async () => {
        try {
            // Validaciones básicas
            if (!formData.nombre.trim()) {
                setError('El nombre es requerido');
                return;
            }

            if (!formData.descripcion || formData.descripcion.trim().length < 10) {
                setError('La descripción es requerida y debe tener al menos 10 caracteres');
                return;
            }

            if (formData.costoMensualBase && formData.costoMensualBase < 0) {
                setError('El costo mensual no puede ser negativo');
                return;
            }

            setGuardando(true);
            setError(null);

            if (servicioUid) {
                // Actualizar servicio existente
                await serviciosService.actualizar(servicioUid, formData);
            } else {
                // Crear nuevo servicio
                await serviciosService.crear(formData);
            }

            // Llamar callback de éxito si existe
            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            console.error('Error al guardar servicio:', err);
            setError(
                err.response?.data?.message ||
                (servicioUid ? MENSAJES_ERROR.ACTUALIZAR_SERVICIO : MENSAJES_ERROR.CREAR_SERVICIO)
            );
        } finally {
            setGuardando(false);
        }
    }, [formData, servicioUid, onSuccess]);

    /**
     * Resetear formulario
     */
    const resetearFormulario = useCallback(() => {
        setFormData(FORM_DATA_INICIAL);
        setServicioUid(null);
        setError(null);
    }, []);

    return {
        formData,
        loading,
        guardando,
        error,
        actualizarCampo,
        cargarServicio,
        guardarServicio,
        resetearFormulario
    };
};

export default useFormularioServicio;
