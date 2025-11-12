/**
 * PÁGINA: GESTIÓN DE USUARIOS/CLIENTES - Versión Modular con Modal
 * Gestión completa de usuarios (CRUD) con formulario modal inline
 * Sigue el patrón de ModelosCasa para mejor UX
 */

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { CrearUsuarioDto, ActualizarUsuarioDto } from '../../services/usuarios.service';
import {
  HeaderGestion,
  EstadisticasUsuarios,
  FiltrosUsuarios,
  TablaUsuarios,
  FormularioUsuario,
  ModalConfirmacion
} from './components';
import {
  useUsuarios,
  useFormularioUsuario
} from './hooks';
import '../GestionDeUsuariosCliente.css';

const GestionDeUsuariosCliente: React.FC = () => {
  // ============================================================================
  // HOOKS PERSONALIZADOS
  // ============================================================================
  
  // Hook para gestión de usuarios (CRUD)
  const {
    usuarios,
    loading,
    error,
    crearUsuario,
    actualizarUsuario,
    // eliminarUsuario, // No se usa actualmente (solo desactivar/reactivar)
    desactivarUsuario,
    reactivarUsuario,
    limpiarMensajes
  } = useUsuarios();

  // Hook para gestión del formulario
  const {
    formulario,
    vistaActiva,
    usuarioEditando,
    iniciarCreacion,
    iniciarEdicion,
    iniciarVisualizacion, // Nueva función para modo solo lectura
    cancelarFormulario,
    actualizarCampo,
    validarFormulario
    // resetFormulario // No se usa actualmente
  } = useFormularioUsuario();

  // ============================================================================
  // ESTADOS PARA EL MODAL (PATRÓN MODELOSCASA)
  // ============================================================================
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorFormulario, setErrorFormulario] = useState<string | null>(null);
  
  // Estados para filtros (patrón GestionLotes)
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroRol, setFiltroRol] = useState<string>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Estados para el modal de confirmación
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);
  const [tipoAccion, setTipoAccion] = useState<'desactivar' | 'reactivar'>('desactivar');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null);

  // ============================================================================
  // CÁLCULOS Y FILTROS
  // ============================================================================
  
  const usuariosFiltrados = usuarios.filter(usuario => {
    // Filtro por búsqueda
    if (searchTerm) {
      const busqueda = searchTerm.toLowerCase();
      const coincideBusqueda = (
        usuario.nombres?.toLowerCase().includes(busqueda) ||
        usuario.apellidos?.toLowerCase().includes(busqueda) ||
        usuario.email?.toLowerCase().includes(busqueda) ||
        usuario.cedula?.toLowerCase().includes(busqueda)
      );
      if (!coincideBusqueda) return false;
    }

    // Filtro por estado
    if (filtroEstado !== 'todos') {
      const estadoUsuario = usuario.estado === 'activo' ? 'activo' : 'bloqueado';
      if (estadoUsuario !== filtroEstado) return false;
    }

    // Filtro por rol
    if (filtroRol !== 'todos') {
      const tieneRol = usuario.roles?.includes(filtroRol);
      if (!tieneRol) return false;
    }

    return true;
  });

  const totalClientes = usuarios.filter(u => u.roles.includes('cliente')).length;
  const totalAdmins = usuarios.filter(u => u.roles.includes('admin')).length;

  // ============================================================================
  // HANDLERS PARA ACCIONES
  // ============================================================================

  /**
   * Manejar nuevo usuario
   */
  const handleNuevoUsuario = (): void => {
    iniciarCreacion();
    setMostrarFormulario(true);
    setErrorFormulario(null);
  };

  /**
   * Manejar ver usuario (solo lectura)
   */
  const handleVerUsuario = (usuario: any): void => {
    iniciarVisualizacion(usuario); // Carga los datos en modo solo lectura
    setMostrarFormulario(true);
    setErrorFormulario(null);
  };

  /**
   * Manejar editar usuario
   */
  const handleEditarUsuario = (usuario: any): void => {
    iniciarEdicion(usuario);
    setMostrarFormulario(true);
    setErrorFormulario(null);
  };

  /**
   * Manejar envío del formulario (crear/editar)
   */
  const handleSubmitFormulario = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Validar formulario usando el hook
    if (!validarFormulario()) {
      setErrorFormulario('Por favor, corrija los errores en el formulario');
      return;
    }

    try {
      const modoEdicion = vistaActiva === 'edit';
      
      if (modoEdicion && usuarioEditando) {
        // Actualizar usuario existente
        const datosActualizar: ActualizarUsuarioDto = {
          email: formulario.datos.email,
          nombres: formulario.datos.nombres,
          apellidos: formulario.datos.apellidos,
          cedula: formulario.datos.cedula,
          telefono: formulario.datos.telefono,
          direccion: formulario.datos.direccion, // ✅ AGREGADO: campo direccion
        };
        
        // 🔍 DEBUG: Logs detallados para debugging
        console.log('🔍 [DEBUG] Usuario editando:', usuarioEditando);
        console.log('🔍 [DEBUG] Datos del formulario:', formulario.datos);
        console.log('🔍 [DEBUG] DTO que se enviará al backend:', datosActualizar);
        console.log('🔍 [DEBUG] Campo direccion específicamente:', {
          'formulario.datos.direccion': formulario.datos.direccion,
          'datosActualizar.direccion': datosActualizar.direccion,
          'tipo': typeof datosActualizar.direccion,
          'longitud': datosActualizar.direccion?.length || 0
        });
        
        await actualizarUsuario(usuarioEditando.uid, datosActualizar);
      } else {
        // Crear nuevo usuario
        const nuevoUsuario: CrearUsuarioDto = {
          email: formulario.datos.email,
          password: formulario.datos.password,
          nombres: formulario.datos.nombres,
          apellidos: formulario.datos.apellidos,
          cedula: formulario.datos.cedula,
          telefono: formulario.datos.telefono,
          direccion: formulario.datos.direccion, // ✅ AGREGADO: campo direccion
        };
        await crearUsuario(nuevoUsuario);
      }
      
      // Cerrar modal después de éxito y limpiar mensajes
      handleCancelarFormulario();
      
      // Forzar actualización de la lista después de un pequeño delay
      setTimeout(() => {
        limpiarMensajes();
      }, 100);
    } catch (error: any) {
      setErrorFormulario(error.message || 'Error al procesar el formulario');
    }
  };

  /**
   * Manejar cancelación del formulario
   */
  const handleCancelarFormulario = (): void => {
    setMostrarFormulario(false);
    cancelarFormulario();
    setErrorFormulario(null);
    limpiarMensajes();
  };

  /**
   * Manejar desactivación de usuario (eliminación lógica - recomendado)
   */
  const handleDesactivarUsuario = (usuario: any): void => {
    setUsuarioSeleccionado(usuario);
    setTipoAccion('desactivar');
    setMostrarModalConfirmacion(true);
  };

  /**
   * Manejar reactivación de usuario
   */
  const handleReactivarUsuario = (usuario: any): void => {
    setUsuarioSeleccionado(usuario);
    setTipoAccion('reactivar');
    setMostrarModalConfirmacion(true);
  };

  /**
   * Confirmar acción del modal (desactivar o reactivar)
   */
  const handleConfirmarAccion = async (): Promise<void> => {
    if (!usuarioSeleccionado) return;

    try {
      if (tipoAccion === 'desactivar') {
        await desactivarUsuario(usuarioSeleccionado.uid);
      } else {
        await reactivarUsuario(usuarioSeleccionado.uid);
      }
      
      // Cerrar modal tras éxito
      handleCancelarModal();
    } catch (error) {
      console.error(`Error al ${tipoAccion} usuario:`, error);
      // El modal se mantiene abierto para mostrar el error
    }
  };

  /**
   * Cancelar acción del modal
   */
  const handleCancelarModal = (): void => {
    setMostrarModalConfirmacion(false);
    setUsuarioSeleccionado(null);
    setTipoAccion('desactivar');
  };

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <div className="gestion-usuarios-container">
      <div className="usuarios-wrapper">
        {/* Header con navegación y botones */}
        <HeaderGestion
          onNuevoUsuario={handleNuevoUsuario}
          onVolver={() => window.history.back()}
          totalUsuarios={usuarios.length}
        />

        {/* Error general - Solo mostrar cuando el formulario no esté abierto */}
        {error && !mostrarFormulario && (
          <div className="alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Filtros de búsqueda - ARRIBA de las tarjetas (patrón GestionLotes) */}
        <FiltrosUsuarios
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filtroEstado={filtroEstado}
          onFiltroEstadoChange={setFiltroEstado}
          filtroRol={filtroRol}
          onFiltroRolChange={setFiltroRol}
          mostrarFiltros={mostrarFiltros}
          onToggleFiltros={() => setMostrarFiltros(!mostrarFiltros)}
        />

        {/* Estadísticas - DEBAJO del buscador */}
        <EstadisticasUsuarios
          totalUsuarios={usuarios.length}
          totalClientes={totalClientes}
          totalAdmins={totalAdmins}
          loading={loading}
        />

        {/* Tabla de usuarios */}
        <TablaUsuarios
          usuarios={usuariosFiltrados}
          loading={loading}
          onEditar={handleEditarUsuario}
          onEliminar={handleDesactivarUsuario}
          onReactivar={handleReactivarUsuario}
          onVer={handleVerUsuario}
        />
      </div>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <FormularioUsuario
          formulario={formulario}
          modoEdicion={vistaActiva === 'edit'}
          soloLectura={vistaActiva === 'view'} // Nuevo: modo solo lectura para "ver"
          loading={loading}
          onSubmit={handleSubmitFormulario}
          onCancelar={handleCancelarFormulario}
          onCambioFormulario={actualizarCampo}
          errorFormulario={errorFormulario}
          onLimpiarError={() => setErrorFormulario(null)}
        />
      )}

      {/* Modal de confirmación para desactivar/reactivar */}
      <ModalConfirmacion
        isOpen={mostrarModalConfirmacion}
        tipo={tipoAccion}
        usuario={usuarioSeleccionado}
        onConfirmar={handleConfirmarAccion}
        onCancelar={handleCancelarModal}
        loading={loading}
      />
    </div>
  );
};

export default GestionDeUsuariosCliente;
