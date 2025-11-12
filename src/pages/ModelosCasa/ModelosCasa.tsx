/**
 * PÁGINA: MODELOS DE CASA - Versión Modular
 * Gestión completa de modelos de casa (CRUD)
 * Incluye: lista, creación, edición, eliminación
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import HeaderModelosCasa from './components/HeaderModelosCasa/HeaderModelosCasa';
import ListaModelos from './components/ListaModelos/ListaModelos';
import FormularioModelo from './components/FormularioModelo/FormularioModelo';
import { useModelosCasa } from './hooks/useModelosCasa';
import { useFormularioModelo } from './hooks/useFormularioModelo';
import { MENSAJES } from './constants';
import '../ModelosCasa.css';

const ModelosCasa = () => {
  const navigate = useNavigate();
  
  // Hook para gestión de modelos (CRUD)
  const {
    modelos,
    loading,
    error,
    crearModelo,
    actualizarModelo,
    eliminarModelo,
  } = useModelosCasa();

  // Hook para gestión del formulario
  const {
    formulario,
    modoEdicion,
    modeloEditando,
    iniciarCreacion,
    iniciarEdicion,
    cancelarFormulario,
    actualizarCampo,
    actualizarPrecio,
    validarFormulario,
    resetFormulario,
  } = useFormularioModelo();

  // Estados adicionales
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [imagenesConError, setImagenesConError] = useState<Set<string>>(new Set());
  const [errorFormulario, setErrorFormulario] = useState<string | null>(null);

  // ============================================================================
  // HANDLERS DE EVENTOS
  // ============================================================================

  /**
   * Inicia la creación de un nuevo modelo
   */
  const handleNuevoModelo = () => {
    iniciarCreacion();
    setMostrarFormulario(true);
    setErrorFormulario(null);
  };

  /**
   * Inicia la edición de un modelo existente
   */
  const handleEditarModelo = (modelo: any) => {
    iniciarEdicion(modelo);
    setMostrarFormulario(true);
    setErrorFormulario(null);
  };

  /**
   * Cancela el formulario y vuelve a la lista
   */
  const handleCancelarFormulario = () => {
    cancelarFormulario();
    setMostrarFormulario(false);
    setErrorFormulario(null);
  };

  /**
   * Maneja el envío del formulario (crear o actualizar)
   */
  const handleSubmitFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validarFormulario()) {
      return;
    }

    try {
      setErrorFormulario(null);

      if (modoEdicion && modeloEditando) {
        // Actualizar modelo existente
        await actualizarModelo(modeloEditando.uid, formulario.datos);
        console.log('✅ Modelo actualizado exitosamente');
      } else {
        // Crear nuevo modelo
        await crearModelo(formulario.datos);
        console.log('✅ Modelo creado exitosamente');
      }

      // Cerrar formulario y resetear
      handleCancelarFormulario();
    } catch (err: any) {
      console.error('❌ Error en formulario:', err);
      setErrorFormulario(
        err.response?.data?.message || 
        (modoEdicion ? MENSAJES.ERROR_ACTUALIZAR : MENSAJES.ERROR_CREAR)
      );
    }
  };

  /**
   * Elimina un modelo de casa
   */
  const handleEliminarModelo = async (uid: string, nombre: string) => {
    try {
      await eliminarModelo(uid);
      console.log('✅ Modelo eliminado exitosamente');
    } catch (err) {
      console.error('❌ Error al eliminar modelo:', err);
      alert(MENSAJES.ERROR_ELIMINAR);
    }
  };

  /**
   * Marca una imagen como con error
   */
  const handleImagenError = (uid: string) => {
    setImagenesConError(prev => new Set(prev).add(uid));
  };

  /**
   * Navega de vuelta al dashboard
   */
  const handleVolver = () => {
    navigate('/dashboard');
  };

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <div className="modelos-container">
      <div className="modelos-wrapper">
        {/* Header con navegación y botones */}
        <HeaderModelosCasa
          onNuevoModelo={handleNuevoModelo}
          onVolver={handleVolver}
          totalModelos={modelos.length}
        />

        {/* Error general - Solo mostrar cuando el formulario no esté abierto */}
        {error && !mostrarFormulario && (
          <div className="alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Lista de modelos */}
        <ListaModelos
          modelos={modelos}
          loading={loading}
          onEditar={handleEditarModelo}
          onEliminar={handleEliminarModelo}
          imagenesConError={imagenesConError}
          onImagenError={handleImagenError}
        />
      </div>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <FormularioModelo
          formulario={formulario}
          modoEdicion={modoEdicion}
          loading={loading}
          onSubmit={handleSubmitFormulario}
          onCancelar={handleCancelarFormulario}
          onCambioFormulario={actualizarCampo}
          onCambioPrecio={actualizarPrecio}
          errorFormulario={errorFormulario}
          onLimpiarError={() => setErrorFormulario(null)}
        />
      )}
    </div>
  );
};

export default ModelosCasa;
