import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usuariosService from '../../../services/usuarios.service';
import type { Usuario, CrearUsuarioDto, ActualizarUsuarioDto } from '../../../services/usuarios.service';
import type { UseUsuariosReturn } from '../types';
import { MENSAJES_EXITO, MENSAJES_ERROR, TIMEOUTS } from '../constants';

/**
 * Hook personalizado para gestionar usuarios
 * Maneja la carga, creación, actualización y eliminación de usuarios
 */
export const useUsuarios = (): UseUsuariosReturn => {
  const navigate = useNavigate();
  
  // Estado
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Auto-limpiar mensajes después de un tiempo
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, TIMEOUTS.MENSAJE_AUTO_HIDE);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  /**
   * Cargar todos los usuarios desde el backend
   */
  const cargarUsuarios = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar si hay token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError(MENSAJES_ERROR.NO_AUTENTICADO);
        setTimeout(() => {
          navigate('/login');
        }, TIMEOUTS.REDIRECT_LOGIN);
        return;
      }
      
      const data = await usuariosService.obtenerTodos();
      setUsuarios(data);
      console.log('✅ Usuarios cargados:', data.length);
    } catch (err: any) {
      console.error('❌ Error al cargar usuarios:', err);
      
      // Manejo específico de errores de autenticación
      if (err.response?.status === 401) {
        setError(MENSAJES_ERROR.SESION_EXPIRADA);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, TIMEOUTS.REDIRECT_LOGIN);
      } else {
        setError(err.response?.data?.message || MENSAJES_ERROR.CARGAR_USUARIOS);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crear un nuevo usuario
   */
  const crearUsuario = async (datos: CrearUsuarioDto): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await usuariosService.crear(datos);
      
      setSuccess(MENSAJES_EXITO.USUARIO_CREADO);
      await cargarUsuarios(); // Recargar la lista
    } catch (err: any) {
      console.error('❌ Error al crear usuario:', err);
      
      // Manejo específico para conflictos (409)
      if (err.response?.status === 409) {
        const mensajeConflicto = 'Ya existe un usuario con este email o cédula. Por favor, verifique los datos e intente nuevamente.';
        setError(mensajeConflicto);
        throw new Error(mensajeConflicto);
      }
      
      setError(err.response?.data?.message || MENSAJES_ERROR.CREAR_USUARIO);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar un usuario existente
   */
  const actualizarUsuario = async (uid: string, datos: ActualizarUsuarioDto): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await usuariosService.actualizar(uid, datos);
      
      setSuccess(MENSAJES_EXITO.USUARIO_ACTUALIZADO);
      await cargarUsuarios(); // Recargar la lista
    } catch (err: any) {
      console.error('❌ Error al actualizar usuario:', err);
      setError(err.response?.data?.message || MENSAJES_ERROR.ACTUALIZAR_USUARIO);
      throw err; // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  };

  /**
   * Eliminar un usuario (eliminación física - usar con precaución)
   */
  const eliminarUsuario = async (uid: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await usuariosService.eliminar(uid);
      
      setSuccess(MENSAJES_EXITO.USUARIO_ELIMINADO);
      await cargarUsuarios(); // Recargar la lista
    } catch (err: any) {
      console.error('❌ Error al eliminar usuario:', err);
      setError(err.response?.data?.message || MENSAJES_ERROR.ELIMINAR_USUARIO);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Desactivar un usuario (eliminación lógica - recomendado)
   */
  const desactivarUsuario = async (uid: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await usuariosService.desactivar(uid);
      
      setSuccess('Usuario desactivado exitosamente');
      await cargarUsuarios(); // Recargar la lista
    } catch (err: any) {
      console.error('❌ Error al desactivar usuario:', err);
      setError(err.response?.data?.message || 'Error al desactivar usuario');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reactivar un usuario
   */
  const reactivarUsuario = async (uid: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      await usuariosService.reactivar(uid);
      
      setSuccess('Usuario reactivado exitosamente');
      await cargarUsuarios(); // Recargar la lista
    } catch (err: any) {
      console.error('❌ Error al reactivar usuario:', err);
      setError(err.response?.data?.message || 'Error al reactivar usuario');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar mensajes de éxito y error
   */
  const limpiarMensajes = (): void => {
    setSuccess(null);
    setError(null);
  };

  return {
    usuarios,
    loading,
    error,
    success,
    cargarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    desactivarUsuario,
    reactivarUsuario,
    limpiarMensajes
  };
};
