import { useState, useCallback } from 'react';
import type { Usuario, FormularioUsuarioData, EstadoFormulario, VistaActiva, UseFormularioUsuarioReturn } from '../types';
import { FORMULARIO_INICIAL } from '../constants';
import { validarFormulario as validarFormularioUtil, tieneErrores } from '../utils/validaciones';

/**
 * Hook personalizado para gestionar el formulario de usuarios
 * Maneja el estado del formulario, validaciones y navegación entre vistas
 */
export const useFormularioUsuario = (): UseFormularioUsuarioReturn => {
  // Estado del formulario
  const [formulario, setFormulario] = useState<EstadoFormulario>({
    datos: { ...FORMULARIO_INICIAL },
    errores: {},
    tocado: {}
  });

  // Estado de la vista activa
  const [vistaActiva, setVistaActiva] = useState<VistaActiva>('list');
  
  // Usuario que se está editando
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  /**
   * Iniciar la creación de un nuevo usuario
   */
  const iniciarCreacion = useCallback((): void => {
    setFormulario({
      datos: { ...FORMULARIO_INICIAL },
      errores: {},
      tocado: {}
    });
    setUsuarioEditando(null);
    setVistaActiva('create');
  }, []);

  /**
   * Iniciar la edición de un usuario existente
   */
  const iniciarEdicion = useCallback((usuario: Usuario): void => {
    setFormulario({
      datos: {
        email: usuario.email,
        password: '', // La contraseña no se carga por seguridad
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        cedula: usuario.cedula,
        telefono: usuario.telefono,
        direccion: usuario.direccion || '' // ✅ CORREGIDO: Cargar dirección del usuario
      },
      errores: {},
      tocado: {}
    });
    setUsuarioEditando(usuario);
    setVistaActiva('edit');
  }, []);

  /**
   * Iniciar la visualización de un usuario (solo lectura)
   */
  const iniciarVisualizacion = useCallback((usuario: Usuario): void => {
    setFormulario({
      datos: {
        email: usuario.email,
        password: '', // La contraseña no se carga por seguridad
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        cedula: usuario.cedula,
        telefono: usuario.telefono,
        direccion: usuario.direccion || '' // ✅ CORREGIDO: Cargar dirección del usuario
      },
      errores: {},
      tocado: {}
    });
    setUsuarioEditando(usuario);
    setVistaActiva('view'); // Modo solo lectura
  }, []);

  /**
   * Cancelar el formulario y volver a la lista
   */
  const cancelarFormulario = useCallback((): void => {
    setFormulario({
      datos: { ...FORMULARIO_INICIAL },
      errores: {},
      tocado: {}
    });
    setUsuarioEditando(null);
    setVistaActiva('list');
  }, []);

  /**
   * Actualizar un campo del formulario
   */
  const actualizarCampo = useCallback((campo: keyof FormularioUsuarioData, valor: string): void => {
    setFormulario(prev => {
      const nuevosDatos = {
        ...prev.datos,
        [campo]: valor
      };

      // Marcar el campo como tocado
      const nuevoTocado = {
        ...prev.tocado,
        [campo]: true
      };

      // Validar solo el campo que cambió
      const erroresCompletos = validarFormularioUtil(nuevosDatos, vistaActiva === 'edit');
      const nuevosErrores = {
        ...prev.errores,
        [campo]: erroresCompletos[campo] || ''
      };

      return {
        datos: nuevosDatos,
        errores: nuevosErrores,
        tocado: nuevoTocado
      };
    });
  }, [vistaActiva]);

  /**
   * Validar todo el formulario
   */
  const validarFormulario = useCallback((): boolean => {
    const errores = validarFormularioUtil(formulario.datos, vistaActiva === 'edit');
    
    // Marcar todos los campos como tocados
    const todosTocados = Object.keys(formulario.datos).reduce((acc, campo) => {
      acc[campo as keyof FormularioUsuarioData] = true;
      return acc;
    }, {} as Record<keyof FormularioUsuarioData, boolean>);

    setFormulario(prev => ({
      ...prev,
      errores,
      tocado: todosTocados
    }));

    return !tieneErrores(errores);
  }, [formulario.datos, vistaActiva]);

  /**
   * Resetear el formulario a su estado inicial
   */
  const resetFormulario = useCallback((): void => {
    setFormulario({
      datos: { ...FORMULARIO_INICIAL },
      errores: {},
      tocado: {}
    });
  }, []);

  return {
    formulario,
    vistaActiva,
    usuarioEditando,
    iniciarCreacion,
    iniciarEdicion,
    iniciarVisualizacion, // Nueva función para modo solo lectura
    cancelarFormulario,
    actualizarCampo,
    validarFormulario,
    resetFormulario
  };
};
